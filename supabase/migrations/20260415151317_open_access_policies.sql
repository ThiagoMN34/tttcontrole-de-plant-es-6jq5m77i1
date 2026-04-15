DO $$
BEGIN
  -- Approvers
  DROP POLICY IF EXISTS "public_all_approvers" ON public.approvers;
  CREATE POLICY "public_all_approvers" ON public.approvers FOR ALL TO public USING (true) WITH CHECK (true);

  -- Employees
  DROP POLICY IF EXISTS "public_all_employees" ON public.employees;
  CREATE POLICY "public_all_employees" ON public.employees FOR ALL TO public USING (true) WITH CHECK (true);

  -- Guests
  DROP POLICY IF EXISTS "public_all_guests" ON public.guests;
  CREATE POLICY "public_all_guests" ON public.guests FOR ALL TO public USING (true) WITH CHECK (true);

  -- Reasons
  DROP POLICY IF EXISTS "public_all_reasons" ON public.reasons;
  CREATE POLICY "public_all_reasons" ON public.reasons FOR ALL TO public USING (true) WITH CHECK (true);

  -- Shifts
  DROP POLICY IF EXISTS "public_all_shifts" ON public.shifts;
  CREATE POLICY "public_all_shifts" ON public.shifts FOR ALL TO public USING (true) WITH CHECK (true);

  -- Values
  DROP POLICY IF EXISTS "public_all_values" ON public.values;
  CREATE POLICY "public_all_values" ON public.values FOR ALL TO public USING (true) WITH CHECK (true);
END $$;
