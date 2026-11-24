const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const client = createClient(
  'https://aewjzirthheepsiyaibh.supabase.co',
  'sb_publishable_7R77vYaFzxAfEyS2dGpm4A_IR6STn4U'
);

async function run() {
  const { data, error } = await client
    .from('survey_responses')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching data:', error);
    return;
  }

  console.log(`Total de registros brutos en Supabase: ${data.length}`);

  // Guardar archivo completo raw
  const outputPath = path.join(__dirname, 'survey-data-raw.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Datos guardados en ${outputPath}`);

  // Mostrar resumen de cada respuesta
  data.forEach((r, idx) => {
    console.log(`[${idx + 1}] ID: ${r.id} | Fecha: ${r.created_at} | Nombre: ${r.respondent_name} | Empresa: ${r.company_name} | Rol: ${r.role} | Sector: ${r.answers?.['15']} | Edad: ${r.age_range}`);
  });
}

run();
