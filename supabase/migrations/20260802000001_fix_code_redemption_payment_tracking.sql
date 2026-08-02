-- Migration: Fix purchase code redemptions to appear in payment requests and analytics
-- When a user redeems a purchase code, a payment_transactions record is now created
-- so it appears in admin "طلبات الدفع" and "إجمالي الإيرادات" analytics.

-- 1. Add 'code_redemption' to the purpose check constraint on payment_transactions
ALTER TABLE public.payment_transactions DROP CONSTRAINT IF EXISTS payment_transactions_purpose_check;
ALTER TABLE public.payment_transactions
  ADD CONSTRAINT payment_transactions_purpose_check
  CHECK (purpose IN ('course_purchase', 'wallet_topup', 'code_redemption'));

-- 2. Ensure a 'purchase_code' gateway exists for tracking code redemptions
INSERT INTO public.payment_gateways (gateway_key, display_name, is_enabled, type)
VALUES ('purchase_code', 'كود الشراء', true, 'automatic')
ON CONFLICT (gateway_key) DO UPDATE SET display_name = 'كود الشراء', is_enabled = true;

-- 3. Update redeem_purchase_code to also record a payment_transactions entry
CREATE OR REPLACE FUNCTION public.redeem_purchase_code(p_code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_clean_code text := trim(p_code);
  v_code RECORD;
  v_already_redeemed boolean;
  v_already_owned boolean;
  v_target_title text;
  v_courses_count integer := 0;
  v_gw_id uuid;
  v_ref text;
BEGIN
  -- Caller must be authenticated
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'يجب تسجيل الدخول أولاً لاستخدام الكود.');
  END IF;

  IF v_clean_code IS NULL OR v_clean_code = '' THEN
    RETURN jsonb_build_object('success', false, 'error', 'يرجى إدخال كود الشراء.');
  END IF;

  -- 1. Look up code (case insensitive comparison)
  SELECT * INTO v_code
  FROM public.purchase_codes
  WHERE UPPER(code) = UPPER(v_clean_code);

  IF v_code IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'الكود غير صحيح.');
  END IF;

  -- 2. Check max uses
  IF v_code.use_count >= v_code.max_uses THEN
    RETURN jsonb_build_object('success', false, 'error', 'تم استخدام هذا الكود بالكامل.');
  END IF;

  -- 3. Check expiry date
  IF v_code.expires_at IS NOT NULL AND v_code.expires_at < now() THEN
    RETURN jsonb_build_object('success', false, 'error', 'انتهت صلاحية هذا الكود.');
  END IF;

  -- 4. Check if user has already redeemed this exact code
  SELECT EXISTS (
    SELECT 1 FROM public.purchase_code_redemptions
    WHERE purchase_code_id = v_code.id AND user_id = v_user_id
  ) INTO v_already_redeemed;

  IF v_already_redeemed THEN
    RETURN jsonb_build_object('success', false, 'error', 'لقد استخدمت هذا الكود من قبل.');
  END IF;

  -- 5. Check if user already owns the target
  IF v_code.target_type = 'course' THEN
    SELECT EXISTS (
      SELECT 1 FROM public.enrollments
      WHERE user_id = v_user_id AND course_id = v_code.target_id
    ) INTO v_already_owned;

    SELECT title INTO v_target_title FROM public.courses WHERE id = v_code.target_id;
  ELSIF v_code.target_type = 'bundle' THEN
    SELECT EXISTS (
      SELECT 1 FROM public.bundle_purchases
      WHERE user_id = v_user_id AND bundle_id = v_code.target_id
    ) INTO v_already_owned;

    SELECT title INTO v_target_title FROM public.bundles WHERE id = v_code.target_id;
  END IF;

  IF v_already_owned THEN
    RETURN jsonb_build_object('success', false, 'error', 'أنت مسجل بالفعل في هذا الكورس/الباقة');
  END IF;

  -- 6. Grant access
  IF v_code.target_type = 'course' THEN
    INSERT INTO public.enrollments (user_id, course_id)
    VALUES (v_user_id, v_code.target_id)
    ON CONFLICT DO NOTHING;
  ELSIF v_code.target_type = 'bundle' THEN
    v_courses_count := public._enroll_user_in_bundle(v_user_id, v_code.target_id);
    INSERT INTO public.bundle_purchases
      (user_id, bundle_id, amount_piastres, courses_included, original_price_piastres, discount_amount_piastres)
      VALUES (v_user_id, v_code.target_id, 0, v_courses_count, 0, 0)
      ON CONFLICT DO NOTHING;
  END IF;

  -- 7. Record redemption and increment use_count
  INSERT INTO public.purchase_code_redemptions (purchase_code_id, user_id)
  VALUES (v_code.id, v_user_id);

  UPDATE public.purchase_codes
  SET
    use_count = use_count + 1,
    updated_at = now()
  WHERE id = v_code.id;

  -- 8. Record a payment_transactions entry so it appears in admin analytics & payment requests
  SELECT id INTO v_gw_id FROM public.payment_gateways WHERE gateway_key = 'purchase_code' LIMIT 1;

  IF v_gw_id IS NOT NULL THEN
    v_ref := public._gen_payment_reference();
    INSERT INTO public.payment_transactions (
      reference_number,
      user_id,
      course_id,
      gateway_id,
      amount_piastres,
      status,
      purpose,
      requires_manual_review
    ) VALUES (
      v_ref,
      v_user_id,
      CASE WHEN v_code.target_type = 'course' THEN v_code.target_id ELSE NULL END,
      v_gw_id,
      0,
      'success',
      'code_redemption',
      false
    );
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'target_type', v_code.target_type,
    'target_id', v_code.target_id,
    'target_title', COALESCE(v_target_title, 'الدورة/الباقة'),
    'message', 'تم تفعيل الكود بنجاح!'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.redeem_purchase_code(text) TO authenticated;
