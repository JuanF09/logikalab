const fs = require('fs');
const path = require('path');

const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, 'survey-data-raw.json'), 'utf-8'));

// Filtrar usuarios de prueba evidentes
const TEST_IDS = new Set([
  '318a891d-c568-4d79-9ff3-3580f54861f4', // Test Verification User
  'c51f9ac1-f70f-4ea9-85af-c9a21c266eb4',
  '666b513d-60fd-44da-b12a-22e87d7f408e'
]);

const cleanData = rawData.filter(r => {
  if (TEST_IDS.has(r.id)) return false;
  const name = (r.respondent_name || '').toLowerCase();
  if (name.includes('test verification') || name === 'test') return false;
  return true;
});

console.log(`================================================================`);
console.log(`ANÁLISIS ESTADÍSTICO DETALLADO DE LA ENCUESTA LOGIKA LAB`);
console.log(`Total registros limpios analizados (Muestra N): ${cleanData.length}`);
console.log(`================================================================\n`);

const N = cleanData.length;

function getDistribution(qNum) {
  const counts = {};
  cleanData.forEach(r => {
    const val = r.answers?.[qNum] || r.answers?.[String(qNum)] || 'Sin respuesta';
    counts[val] = (counts[val] || 0) + 1;
  });
  
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted.map(([label, count]) => ({
    label,
    count,
    percentage: ((count / N) * 100).toFixed(1)
  }));
}

// Analizar todas las preguntas cuantitativas
const questions = [
  { id: 1, title: 'Q1: Dolor Operativo Crítico' },
  { id: 2, title: 'Q2: Mayor Frustración Tecnológica' },
  { id: 3, title: 'Q3: Herramientas Operativas Actuales' },
  { id: 4, title: 'Q4: Horas Semanales Perdidas' },
  { id: 5, title: 'Q5: Software a Medida vs Genérico' },
  { id: 6, title: 'Q6: Prioridad #1 en Software' },
  { id: 7, title: 'Q7: Tiempo de Espera Dispuesto' },
  { id: 8, title: 'Q8: Modalidad de Reportes/Avances' },
  { id: 9, title: 'Q9: Tipo de Acompañamiento Post-Entrega' },
  { id: 10, title: 'Q10: Modelo de Pago Preferido' },
  { id: 11, title: 'Q11: Rango de Inversión Considerado Razonable' },
  { id: 12, title: 'Q12: Principal Freno/Objeción para Invertir' },
  { id: 15, title: 'Q15: Sector o Industria' },
  { id: 16, title: 'Q16: Rol del Encuestado' },
  { id: 17, title: 'Q17: Rango de Edad' },
  { id: 18, title: 'Q18: Autorización Habeas Data' }
];

const results = {};

questions.forEach(q => {
  results[q.id] = {
    title: q.title,
    distribution: getDistribution(q.id)
  };
  console.log(`--- ${q.title} ---`);
  results[q.id].distribution.forEach(d => {
    console.log(`  * ${d.count} (${d.percentage}%) -> ${d.label}`);
  });
  console.log('');
});

// Cruces de variables (Cross-tabulations de alto impacto para jurados)
console.log(`================================================================`);
console.log(`CRUCES Y CORRELACIONES ESTRATÉGICAS (PARA SUSTENTACIÓN)`);
console.log(`================================================================\n`);

// Cruce 1: Herramientas Actuales vs Horas Perdidas
console.log(`--- CRUCE 1: Herramienta Actual vs Horas Perdidas Semanalmente ---`);
const toolVsHours = {};
cleanData.forEach(r => {
  const tool = r.answers?.[3] || 'Desconocido';
  const hours = r.answers?.[4] || 'Desconocido';
  if (!toolVsHours[tool]) toolVsHours[tool] = {};
  toolVsHours[tool][hours] = (toolVsHours[tool][hours] || 0) + 1;
});
console.log(JSON.stringify(toolVsHours, null, 2));

// Cruce 2: Rol vs Rango de Inversión (Willingness to pay)
console.log(`\n--- CRUCE 2: Rol del Encuestado vs Presupuesto Dispuesto (Q11) ---`);
const roleVsBudget = {};
cleanData.forEach(r => {
  const role = r.answers?.[16] || 'Desconocido';
  const budget = r.answers?.[11] || 'Desconocido';
  if (!roleVsBudget[role]) roleVsBudget[role] = {};
  roleVsBudget[role][budget] = (roleVsBudget[role][budget] || 0) + 1;
});
console.log(JSON.stringify(roleVsBudget, null, 2));

// Cruce 3: Dolor Principal vs Sector
console.log(`\n--- CRUCE 3: Sector de la Empresa vs Dolor Principal (Q1) ---`);
const sectorVsPain = {};
cleanData.forEach(r => {
  const sector = r.answers?.[15] || 'Desconocido';
  const pain = r.answers?.[1] || 'Desconocido';
  if (!sectorVsPain[sector]) sectorVsPain[sector] = {};
  sectorVsPain[sector][pain] = (sectorVsPain[sector][pain] || 0) + 1;
});
console.log(JSON.stringify(sectorVsPain, null, 2));

// Cruce 4: Objeción de Inversión (Q12) vs Modelo de Pago (Q10)
console.log(`\n--- CRUCE 4: Objeción (Q12) vs Preferencia de Pago (Q10) ---`);
const barrierVsPay = {};
cleanData.forEach(r => {
  const barrier = r.answers?.[12] || 'Desconocido';
  const pay = r.answers?.[10] || 'Desconocido';
  if (!barrierVsPay[barrier]) barrierVsPay[barrier] = {};
  barrierVsPay[barrier][pay] = (barrierVsPay[barrier][pay] || 0) + 1;
});
console.log(JSON.stringify(barrierVsPay, null, 2));

// Listado de empresas encuestadas
console.log(`\n--- LISTADO DE RESPONDENTES Y EMPRESAS ---`);
cleanData.forEach((r, i) => {
  console.log(`${i+1}. ${r.respondent_name} | Empresa: "${r.company_name}" | Rol: ${r.role} | Sector: ${r.answers?.[15]}`);
});

fs.writeFileSync(path.join(__dirname, 'survey-analysis-output.json'), JSON.stringify({ N, results, toolVsHours, roleVsBudget, sectorVsPain, barrierVsPay, respondents: cleanData }, null, 2), 'utf-8');
