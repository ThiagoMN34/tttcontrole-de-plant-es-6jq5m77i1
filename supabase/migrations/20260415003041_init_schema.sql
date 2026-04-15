-- Create tables
CREATE TABLE IF NOT EXISTS public.employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  contact TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  room TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.reasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.approvers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.values (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.shifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES public.guests(id) ON DELETE CASCADE,
  reason_id UUID REFERENCES public.reasons(id) ON DELETE CASCADE,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  value NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approvers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shifts ENABLE ROW LEVEL SECURITY;

-- Policies
-- Employees: read for all, full access for auth
DROP POLICY IF EXISTS "public_read_employees" ON public.employees;
CREATE POLICY "public_read_employees" ON public.employees FOR SELECT USING (true);
DROP POLICY IF EXISTS "auth_all_employees" ON public.employees;
CREATE POLICY "auth_all_employees" ON public.employees FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Guests: read for all, full access for auth
DROP POLICY IF EXISTS "public_read_guests" ON public.guests;
CREATE POLICY "public_read_guests" ON public.guests FOR SELECT USING (true);
DROP POLICY IF EXISTS "auth_all_guests" ON public.guests;
CREATE POLICY "auth_all_guests" ON public.guests FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Reasons: read for all, full access for auth
DROP POLICY IF EXISTS "public_read_reasons" ON public.reasons;
CREATE POLICY "public_read_reasons" ON public.reasons FOR SELECT USING (true);
DROP POLICY IF EXISTS "auth_all_reasons" ON public.reasons;
CREATE POLICY "auth_all_reasons" ON public.reasons FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Approvers: full access for auth only
DROP POLICY IF EXISTS "auth_all_approvers" ON public.approvers;
CREATE POLICY "auth_all_approvers" ON public.approvers FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Values: full access for auth only
DROP POLICY IF EXISTS "auth_all_values" ON public.values;
CREATE POLICY "auth_all_values" ON public.values FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Shifts: insert for all (public form), full access for auth
DROP POLICY IF EXISTS "public_insert_shifts" ON public.shifts;
CREATE POLICY "public_insert_shifts" ON public.shifts FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "auth_all_shifts" ON public.shifts;
CREATE POLICY "auth_all_shifts" ON public.shifts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Seed Initial User
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'thiagomnaves@yahoo.com.br') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'thiagomnaves@yahoo.com.br',
      crypt('Skip@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Admin"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  END IF;
END $$;
