import { createClient } from "@supabase/supabase-js";
import { SurveySubmission } from "@/components/survey/surveyData";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://aewjzirthheepsiyaibh.supabase.co";

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_7R77vYaFzxAfEyS2dGpm4A_IR6STn4U";

/**
 * Cliente oficial de Supabase para LOGIKA LAB
 */
export const supabase = createClient(supabaseUrl, supabaseKey);

export interface SurveyResponseRow {
  id?: string;
  created_at?: string;
  respondent_name: string;
  company_name: string;
  role: string;
  age_range: string;
  priority_problem: string;
  tech_preference: string;
  answers: Record<number, string>;
  other_text?: string;
  habeas_data_authorized: boolean;
}

const TEST_EXCLUDED_IDS = new Set([
  "c51f9ac1-f70f-4ea9-85af-c9a21c266eb4",
  "666b513d-60fd-44da-b12a-22e87d7f408e",
  "318a891d-c568-4d79-9ff3-3580f54861f4",
]);

/**
 * Guarda una respuesta de encuesta en Supabase PostgreSQL
 */
export async function saveSurveyToSupabase(
  submission: SurveySubmission
): Promise<{ success: boolean; error?: string }> {
  try {
    const row: SurveyResponseRow = {
      respondent_name: submission.answers[13] || "Anónimo",
      company_name: submission.answers[14] || "",
      role: submission.answers[16] || "",
      age_range: submission.answers[17] || "",
      priority_problem: submission.answers[1] || "",
      tech_preference: submission.answers[5] || "",
      answers: submission.answers,
      other_text: submission.otherText || "",
      habeas_data_authorized: submission.answers[18]?.startsWith("Sí") ?? true,
    };

    const { error } = await supabase.from("survey_responses").insert([row]);

    if (error) {
      console.warn("Error guardando en Supabase:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    console.warn("Excepción al conectar con Supabase:", message);
    return { success: false, error: message };
  }
}

/**
 * Obtiene todas las respuestas reales de la encuesta desde Supabase
 */
export async function fetchSurveyFromSupabase(): Promise<SurveySubmission[]> {
  try {
    const { data, error } = await supabase
      .from("survey_responses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    // Filtrar registros de prueba previos para asegurar base en 0 antes del despliegue real
    const cleanData = data.filter((row: SurveyResponseRow & { id?: string }) => {
      if (row.id && TEST_EXCLUDED_IDS.has(row.id)) return false;
      const name = (row.respondent_name || "").toLowerCase();
      if (name.includes("test verification") || name.includes("test")) return false;
      return true;
    });

    return cleanData.map((row: SurveyResponseRow & { created_at?: string }) => ({
      timestamp: row.created_at || new Date().toISOString(),
      answers: row.answers || {},
      otherText: row.other_text || "",
    }));
  } catch {
    return [];
  }
}
