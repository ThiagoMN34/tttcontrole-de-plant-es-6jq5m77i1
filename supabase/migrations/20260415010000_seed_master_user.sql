DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Garantir que o usuário master exista
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
      crypt('1234', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Thiago"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '',
      NULL,
      '', '', ''
    );

    INSERT INTO public.profiles (id, email, name, role)
    VALUES (new_user_id, 'thiagomnaves@yahoo.com.br', 'Thiago', 'master')
    ON CONFLICT (id) DO UPDATE SET role = 'master';
  ELSE
    -- Atualizar senha e role caso o usuário já exista mas esteja com dados inconsistentes
    UPDATE auth.users
    SET encrypted_password = crypt('1234', gen_salt('bf'))
    WHERE email = 'thiagomnaves@yahoo.com.br';

    UPDATE public.profiles
    SET role = 'master'
    WHERE email = 'thiagomnaves@yahoo.com.br';
  END IF;
END $$;

-- Garantir que os usuários possam ler seus próprios perfis, evitando falha no fetchProfile
DROP POLICY IF EXISTS "auth_read_own_profile" ON public.profiles;
CREATE POLICY "auth_read_own_profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);
