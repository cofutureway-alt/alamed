-- Fix handle_new_user trigger to properly set admin role when role='admin' or intended_role='admin' is passed in user_metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  m jsonb := COALESCE(NEW.raw_user_meta_data, '{}'::jsonb);
  v_role public.app_role := 'student'::public.app_role;
BEGIN
  IF NULLIF(m->>'intended_role','') = 'parent' OR NULLIF(m->>'role','') = 'parent' THEN
    v_role := 'parent'::public.app_role;
  ELSIF NULLIF(m->>'intended_role','') = 'admin' OR NULLIF(m->>'role','') = 'admin' THEN
    v_role := 'admin'::public.app_role;
  END IF;

  INSERT INTO public.profiles (
    id, full_name, role, phone_number, guardian_phone, email, auth_email,
    governorate, registration_type, gender, stage_id, custom_fields
  ) VALUES (
    NEW.id,
    COALESCE(m->>'full_name', m->>'name', ''),
    v_role,
    NULLIF(m->>'phone_number',''),
    NULLIF(m->>'guardian_phone',''),
    NULLIF(m->>'real_email',''),
    NEW.email,
    NULLIF(m->>'governorate',''),
    NULLIF(m->>'registration_type',''),
    NULLIF(m->>'gender',''),
    CASE WHEN NULLIF(m->>'stage_id','') IS NOT NULL THEN (m->>'stage_id')::uuid ELSE NULL END,
    COALESCE(m->'custom_fields', '{}'::jsonb)
  )
  ON CONFLICT (id) DO UPDATE SET
    role = EXCLUDED.role,
    full_name = CASE WHEN EXCLUDED.full_name <> '' THEN EXCLUDED.full_name ELSE public.profiles.full_name END;

  RETURN NEW;
END;
$function$;

-- Update any existing admin user whose profile role was wrongly set to student
UPDATE public.profiles p
SET role = 'admin'::public.app_role
FROM auth.users u
WHERE p.id = u.id
  AND (
    u.raw_user_meta_data->>'role' = 'admin'
    OR u.raw_user_meta_data->>'intended_role' = 'admin'
    OR u.raw_app_meta_data->>'role' = 'admin'
  )
  AND p.role <> 'admin'::public.app_role;
