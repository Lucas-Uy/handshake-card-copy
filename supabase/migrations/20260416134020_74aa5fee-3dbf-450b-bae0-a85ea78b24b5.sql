ALTER TABLE public.personas 
ADD COLUMN page_mode text NOT NULL DEFAULT 'personal' 
CHECK (page_mode IN ('personal', 'builder'));