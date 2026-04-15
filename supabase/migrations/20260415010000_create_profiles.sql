-- Create profiles table for RBAC
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'approver',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow everyone authenticated to read profiles
DROP POLICY IF EXISTS "public_read_profiles" ON public.profiles;
CREATE POLICY "public_read_profiles" ON public.profiles FOR SELECT USING (true);

-- Allow master to manage all profiles
DROP POLICY IF EXISTS "master_all_profiles" ON public.profiles;
CREATE POLICY "master_all_profiles" ON public.profiles FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'master')
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'master')
);

-- Auto-create profile on auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)), 'approver')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed master user and ensure it has correct password ('1234') and profile role
DO $$
DECLARE
  master_id uuid;
BEGIN
  SELECT id INTO master_id FROM auth.users WHERE email = 'thiagomnaves@yahoo.com.br';
  
  IF master_id IS NULL THEN
    master_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      master_id,
      '00000000-0000-0000-0000-000000000000',
      'thiagomnaves@yahoo.com.br',
      crypt('1234', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Admin Master"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  ELSE
    -- Force update password if user already existed from previous seeding
    UPDATE auth.users SET encrypted_password = crypt('1234', gen_salt('bf')) WHERE id = master_id;
  END IF;

  -- Ensure profile exists and has master role
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (master_id, 'thiagomnaves@yahoo.com.br', 'Admin Master', 'master')
  ON CONFLICT (id) DO UPDATE SET role = 'master';
END $$;
