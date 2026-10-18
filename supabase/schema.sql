-- ==============================================================================
-- LOGIKA LAB — Software Engineering
-- SCHEMA OFICIAL DE BASE DE DATOS SUPABASE (POSTGRESQL)
-- ==============================================================================

-- 1. TABLA: survey_responses
-- Almacena cada respuesta de la Encuesta de Validación Operativa
CREATE TABLE IF NOT EXISTS public.survey_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    respondent_name TEXT,
    company_name TEXT,
    role TEXT,
    age_range TEXT,
    priority_problem TEXT,
    tech_preference TEXT,
    answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    other_text TEXT,
    habeas_data_authorized BOOLEAN DEFAULT true
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- 3. Políticas de Seguridad (RLS)
-- Permitir que cualquier visitante registre su encuesta sin necesidad de login previo
DROP POLICY IF EXISTS "Permitir insercion publica de encuestas" ON public.survey_responses;
CREATE POLICY "Permitir insercion publica de encuestas"
ON public.survey_responses
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Permitir lectura anónima para calcular estadísticas en vivo en la web
DROP POLICY IF EXISTS "Permitir lectura publica de estadisticas" ON public.survey_responses;
CREATE POLICY "Permitir lectura publica de estadisticas"
ON public.survey_responses
FOR SELECT
TO anon, authenticated
USING (true);

-- 4. TABLA: contact_leads (Opcional para captación de clientes potenciales)
CREATE TABLE IF NOT EXISTS public.contact_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT,
    company TEXT,
    email TEXT,
    phone TEXT,
    message TEXT
);

ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir insercion publica de leads" ON public.contact_leads;
CREATE POLICY "Permitir insercion publica de leads"
ON public.contact_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
