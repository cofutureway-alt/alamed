-- Fix resolve_login_email to correctly map both phone numbers and real email addresses to auth_email
CREATE OR REPLACE FUNCTION public.resolve_login_email(_identifier text)
RETURNS text
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_id text := trim(COALESCE(_identifier, ''));
  v_auth_email text;
  v_phone text;
BEGIN
  IF v_id = '' THEN
    RETURN '';
  END IF;

  -- 1. If identifier looks like a phone number
  IF v_id ~ '^[+\d\s\-()]+$' THEN
    v_phone := regexp_replace(v_id, '\D', '', 'g');
    IF v_phone LIKE '0%' THEN
      v_phone := '2' || v_phone;
    ELSIF v_phone ~ '^1[0125]\d{8}$' THEN
      v_phone := '20' || v_phone;
    END IF;

    SELECT auth_email INTO v_auth_email
    FROM public.profiles
    WHERE phone_number = v_phone OR phone_number = v_id
    LIMIT 1;

    IF v_auth_email IS NOT NULL AND v_auth_email <> '' THEN
      RETURN v_auth_email;
    END IF;

    RETURN v_phone || '@phone.noemail.invalid';
  END IF;

  -- 2. If identifier is an email address (e.g. real_email or auth_email)
  SELECT auth_email INTO v_auth_email
  FROM public.profiles
  WHERE lower(email) = lower(v_id) OR lower(auth_email) = lower(v_id)
  LIMIT 1;

  IF v_auth_email IS NOT NULL AND v_auth_email <> '' THEN
    RETURN v_auth_email;
  END IF;

  RETURN lower(v_id);
END;
$$;

GRANT EXECUTE ON FUNCTION public.resolve_login_email(text) TO anon, authenticated;
