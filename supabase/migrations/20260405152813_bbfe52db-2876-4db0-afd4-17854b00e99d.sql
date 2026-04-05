ALTER POLICY "Anyone can submit a lead capture" ON public.lead_captures
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.personas p
      WHERE p.id = persona_id
        AND p.user_id = owner_user_id
        AND p.is_active = true
    )
  );