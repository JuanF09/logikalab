export interface SurveyQuestion {
  id: number;
  section: string;
  sectionNumber: string;
  question: string;
  type: "single" | "text" | "role" | "age" | "legal" | "industry";
  options?: string[];
  allowOther?: boolean;
}

export const SURVEY_SECTIONS = [
  { id: 1, title: "Diagnóstico del Dolor Operativo", range: "Preguntas 1 - 4" },
  { id: 2, title: "Preferencias Tecnológicas y de Ejecución", range: "Preguntas 5 - 9" },
  { id: 3, title: "Modelo de Negocio y Presupuesto", range: "Preguntas 10 - 12" },
  { id: 4, title: "Perfil de la Empresa y Legal", range: "Preguntas 13 - 18" },
];

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  // SECCIÓN I: DIAGNÓSTICO DEL DOLOR OPERATIVO
  {
    id: 1,
    sectionNumber: "I",
    section: "DIAGNÓSTICO DEL DOLOR OPERATIVO",
    question: "1. Si pudieras resolver un problema crítico en tu negocio o proyecto hoy mismo, ¿cuál sería?",
    type: "single",
    allowOther: true,
    options: [
      "El desorden en los inventarios, entregas o logística.",
      "La gestión manual de citas, clientes y ventas.",
      "El manejo de la facturación y la información financiera.",
      "La coordinación de un equipo de trabajo o tareas diarias.",
      "Darle estructura técnica y vida a una idea de negocio en mente.",
    ],
  },
  {
    id: 2,
    sectionNumber: "I",
    section: "DIAGNÓSTICO DEL DOLOR OPERATIVO",
    question: "2. ¿Cuál ha sido tu mayor frustración con la tecnología hasta ahora?",
    type: "single",
    options: [
      "Pagué por algo prefabricado que nunca funcionó como me prometieron.",
      "Era tan complicado de usar que terminé volviendo al papel, Excel o WhatsApp.",
      "El sistema se quedó pequeño muy rápido y me limitó el crecimiento.",
      "Nunca he invertido en desarrollo de software, apenas estoy empezando.",
    ],
  },
  {
    id: 3,
    sectionNumber: "I",
    section: "DIAGNÓSTICO DEL DOLOR OPERATIVO",
    question: "3. ¿En qué herramientas apoyas principalmente la operación diaria de tu negocio actualmente?",
    type: "single",
    options: [
      "Hojas de cálculo aisladas (Excel / Google Sheets).",
      "Chats de WhatsApp y notas personales.",
      "Software comercial genérico / ERP prefabricado.",
      "Registro manual físico (Cuadernos, papel, carpetas).",
      "Sistema propio desarrollado a la medida.",
    ],
  },
  {
    id: 4,
    sectionNumber: "I",
    section: "DIAGNÓSTICO DEL DOLOR OPERATIVO",
    question: "4. ¿Cuántas horas a la semana calcula tu equipo que pierde en tareas operativas manuales y repetitivas?",
    type: "single",
    options: [
      "Menos de 5 horas a la semana.",
      "Entre 5 y 15 horas a la semana.",
      "Entre 15 y 30 horas a la semana.",
      "Más de 30 horas a la semana.",
    ],
  },

  // SECCIÓN II: PREFERENCIAS TECNOLÓGICAS Y DE EJECUCIÓN
  {
    id: 5,
    sectionNumber: "II",
    section: "PREFERENCIAS TECNOLÓGICAS Y DE EJECUCIÓN",
    question: "5. Al buscar un sistema o plataforma digital, ¿qué prefieres?",
    type: "single",
    options: [
      "Algo 100% a la medida (que el sistema se adapte exactamente a mi operación real).",
      "Algo rápido y genérico (aunque tenga que adaptar mi forma de trabajar al sistema).",
    ],
  },
  {
    id: 6,
    sectionNumber: "II",
    section: "PREFERENCIAS TECNOLÓGICAS Y DE EJECUCIÓN",
    question: "6. Si tuvieras que elegir la prioridad número uno para un software, ¿cuál sería?",
    type: "single",
    options: [
      "Que sea extremadamente fácil e intuitivo de usar para cualquier persona (UX).",
      "Que la información (datos, pagos, clientes) sea 100% exacta, rápida y segura.",
      "Que el diseño visual sea espectacular y eleve el estatus de mi marca.",
    ],
  },
  {
    id: 7,
    sectionNumber: "II",
    section: "PREFERENCIAS TECNOLÓGICAS Y DE EJECUCIÓN",
    question: "7. Para construir un software robusto y a la medida, ¿cuánto tiempo estás dispuesto a esperar?",
    type: "single",
    options: [
      "Menos de 1 mes (Busco un Producto Mínimo Viable para probar rápido).",
      "Entre 1 y 3 meses (Entiendo que la ingeniería de calidad toma tiempo).",
      "Lo que sea necesario si el resultado resuelve mi problema por completo.",
    ],
  },
  {
    id: 8,
    sectionNumber: "II",
    section: "PREFERENCIAS TECNOLÓGICAS Y DE EJECUCIÓN",
    question: "8. Durante el desarrollo del proyecto, ¿cómo te gusta recibir los avances?",
    type: "single",
    options: [
      "Videos cortos por WhatsApp mostrando la pantalla y el progreso real.",
      "Reuniones semanales de 15 minutos en videollamada.",
      "No me muestren el proceso técnico, solo avísenme cuando esté listo para probar.",
    ],
  },
  {
    id: 9,
    sectionNumber: "II",
    section: "PREFERENCIAS TECNOLÓGICAS Y DE EJECUCIÓN",
    question: "9. Después de que te entreguemos el sistema funcionando, ¿qué tipo de acompañamiento prefieres?",
    type: "single",
    options: [
      "Soporte técnico mensual para resolver dudas, asegurar que nada falle y hacer ajustes.",
      "Un equipo permanente que me acompañe todo el año agregando nuevas funciones al crecer.",
      "Una capacitación inicial y mi equipo se encarga del resto.",
    ],
  },

  // SECCIÓN III: MODELO DE NEGOCIO Y PRESUPUESTO
  {
    id: 10,
    sectionNumber: "III",
    section: "MODELO DE NEGOCIO Y PRESUPUESTO",
    question: "10. Si este software te ahorra tiempo y optimiza tu trabajo, ¿cómo prefieres pagarlo?",
    type: "single",
    options: [
      "Un pago único por el desarrollo + un costo mínimo mensual por infraestructura en la nube.",
      "Una suscripción mensual fija (SaaS recurrente) sin costo inicial de desarrollo.",
    ],
  },
  {
    id: 11,
    sectionNumber: "III",
    section: "MODELO DE NEGOCIO Y PRESUPUESTO",
    question: "11. Si una solución de software a la medida resuelve tus cuellos de botella y automatiza tu operación, ¿qué rango de inversión consideras razonable para tu negocio?",
    type: "single",
    options: [
      "Menos de $2’000.000 COP (~$500 USD) - Automatización puntual o inicio.",
      "Entre $2’000.000 y $5’000.000 COP (~$500 - $1.300 USD) - Módulo clave (CRM / Cotizador).",
      "Entre $5’000.000 y $12’000.000 COP (~$1.300 - $3.000 USD) - Ecosistema integral (ERP a medida).",
      "Más de $12’000.000 COP (> $3.000 USD) - Plataforma empresarial multiárea.",
    ],
  },
  {
    id: 12,
    sectionNumber: "III",
    section: "MODELO DE NEGOCIO Y PRESUPUESTO",
    question: "12. Siendo muy honesto, ¿qué te detendría de invertir en desarrollo tecnológico hoy mismo?",
    type: "single",
    options: [
      "El presupuesto (siento que debe ser una inversión muy alta de golpe).",
      "El tiempo (necesito empezar a vender mañana mismo).",
      "El miedo a que el proceso sea muy complejo y no logre entenderlo.",
    ],
  },

  // SECCIÓN IV: PERFIL DE LA EMPRESA Y LEGAL
  {
    id: 13,
    sectionNumber: "IV",
    section: "PERFIL DE LA EMPRESA Y LEGAL",
    question: "13. Nombre completo:",
    type: "text",
  },
  {
    id: 14,
    sectionNumber: "IV",
    section: "PERFIL DE LA EMPRESA Y LEGAL",
    question: "14. Nombre de tu empresa, negocio o proyecto en mente:",
    type: "text",
  },
  {
    id: 15,
    sectionNumber: "IV",
    section: "PERFIL DE LA EMPRESA Y LEGAL",
    question: "15. ¿A qué sector o industria pertenece tu negocio o proyecto?",
    type: "industry",
    options: [
      "Comercio y Ventas (Retail / E-commerce)",
      "Servicios Profesionales y Consultoría",
      "Logística, Transporte y Distribución",
      "Manufactura y Producción",
      "Salud, Estética y Bienestar",
      "Gastronomía y Alimentos",
      "Tecnología, Creativo y Startups",
      "Otro Sector",
    ],
  },
  {
    id: 16,
    sectionNumber: "IV",
    section: "PERFIL DE LA EMPRESA Y LEGAL",
    question: "16. ¿Cuál es tu rol principal actualmente?",
    type: "role",
    options: [
      "Dueño / Fundador de un negocio activo.",
      "Gerente / Director Operativo.",
      "Emprendedor estructurando una nueva idea.",
      "Independiente / Freelancer / Empleado.",
    ],
  },
  {
    id: 17,
    sectionNumber: "IV",
    section: "PERFIL DE LA EMPRESA Y LEGAL",
    question: "17. Rango de Edad:",
    type: "age",
    options: ["18-25", "26-35", "36-45", "+45"],
  },
  {
    id: 18,
    sectionNumber: "IV",
    section: "PERFIL DE LA EMPRESA Y LEGAL",
    question: "18. Autorización de Tratamiento de Datos Personales (Obligatorio)",
    type: "legal",
    options: [
      "Sí, autorizo el tratamiento de mis datos personales según la política de privacidad.",
      "No autorizo.",
    ],
  },
];

export interface SurveySubmission {
  timestamp: string;
  answers: Record<number, string>;
  otherText?: string;
}

export interface MetricItem {
  label: string;
  count: number;
  percentage: number;
}

export interface StatsBreakdown {
  totalResponses: number;
  customVsGeneric: { custom: number; generic: number; customCount: number; genericCount: number };
  topBottlenecks: MetricItem[];
  currentTools: MetricItem[];
  timeLostWeekly: MetricItem[];
  willingnessToPay: MetricItem[];
  paymentPreference: MetricItem[];
  investmentBarriers: MetricItem[];
  industryDistribution: MetricItem[];
  roleDistribution: MetricItem[];
}

export const ZERO_STATS: StatsBreakdown = {
  totalResponses: 0,
  customVsGeneric: { custom: 0, generic: 0, customCount: 0, genericCount: 0 },
  topBottlenecks: [
    { label: "El desorden en los inventarios, entregas o logística.", count: 0, percentage: 0 },
    { label: "La gestión manual de citas, clientes y ventas.", count: 0, percentage: 0 },
    { label: "El manejo de la facturación y la información financiera.", count: 0, percentage: 0 },
    { label: "La coordinación de un equipo de trabajo o tareas diarias.", count: 0, percentage: 0 },
    { label: "Darle estructura técnica y vida a una idea de negocio en mente.", count: 0, percentage: 0 },
  ],
  currentTools: [
    { label: "Hojas de cálculo aisladas (Excel / Google Sheets).", count: 0, percentage: 0 },
    { label: "Chats de WhatsApp y notas personales.", count: 0, percentage: 0 },
    { label: "Software comercial genérico / ERP prefabricado.", count: 0, percentage: 0 },
    { label: "Registro manual físico (Cuadernos, papel, carpetas).", count: 0, percentage: 0 },
    { label: "Sistema propio desarrollado a la medida.", count: 0, percentage: 0 },
  ],
  timeLostWeekly: [
    { label: "Menos de 5 horas a la semana.", count: 0, percentage: 0 },
    { label: "Entre 5 y 15 horas a la semana.", count: 0, percentage: 0 },
    { label: "Entre 15 y 30 horas a la semana.", count: 0, percentage: 0 },
    { label: "Más de 30 horas a la semana.", count: 0, percentage: 0 },
  ],
  willingnessToPay: [
    { label: "Menos de $2’000.000 COP (~$500 USD) - Automatización puntual o inicio.", count: 0, percentage: 0 },
    { label: "Entre $2’000.000 y $5’000.000 COP (~$500 - $1.300 USD) - Módulo clave (CRM / Cotizador).", count: 0, percentage: 0 },
    { label: "Entre $5’000.000 y $12’000.000 COP (~$1.300 - $3.000 USD) - Ecosistema integral (ERP a medida).", count: 0, percentage: 0 },
    { label: "Más de $12’000.000 COP (> $3.000 USD) - Plataforma empresarial multiárea.", count: 0, percentage: 0 },
  ],
  paymentPreference: [
    { label: "Un pago único por el desarrollo + un costo mínimo mensual por infraestructura en la nube.", count: 0, percentage: 0 },
    { label: "Una suscripción mensual fija (SaaS recurrente) sin costo inicial de desarrollo.", count: 0, percentage: 0 },
  ],
  investmentBarriers: [
    { label: "El presupuesto (siento que debe ser una inversión muy alta de golpe).", count: 0, percentage: 0 },
    { label: "El tiempo (necesito empezar a vender mañana mismo).", count: 0, percentage: 0 },
    { label: "El miedo a que el proceso sea muy complejo y no logre entenderlo.", count: 0, percentage: 0 },
  ],
  industryDistribution: [
    { label: "Comercio y Ventas (Retail / E-commerce)", count: 0, percentage: 0 },
    { label: "Servicios Profesionales y Consultoría", count: 0, percentage: 0 },
    { label: "Logística, Transporte y Distribución", count: 0, percentage: 0 },
    { label: "Manufactura y Producción", count: 0, percentage: 0 },
    { label: "Salud, Estética y Bienestar", count: 0, percentage: 0 },
    { label: "Gastronomía y Alimentos", count: 0, percentage: 0 },
    { label: "Tecnología, Creativo y Startups", count: 0, percentage: 0 },
    { label: "Otro Sector", count: 0, percentage: 0 },
  ],
  roleDistribution: [
    { label: "Dueño / Fundador de un negocio activo.", count: 0, percentage: 0 },
    { label: "Gerente / Director Operativo.", count: 0, percentage: 0 },
    { label: "Emprendedor estructurando una nueva idea.", count: 0, percentage: 0 },
    { label: "Independiente / Freelancer / Empleado.", count: 0, percentage: 0 },
  ],
};

function formatPercentage(count: number, total: number): number {
  if (total <= 0) return 0;
  const raw = (count / total) * 100;
  return Math.round(raw * 10) / 10;
}

export function computeRealStats(submissions: SurveySubmission[]): StatsBreakdown {
  const total = submissions.length;
  if (total === 0) {
    return ZERO_STATS;
  }

  // 1. Custom vs Generic (Pregunta 5)
  let customCount = 0;
  let genericCount = 0;

  // 2. Bottlenecks (Pregunta 1)
  const bottleneckCounts: Record<string, number> = {
    "El desorden en los inventarios, entregas o logística.": 0,
    "La gestión manual de citas, clientes y ventas.": 0,
    "El manejo de la facturación y la información financiera.": 0,
    "La coordinación de un equipo de trabajo o tareas diarias.": 0,
    "Darle estructura técnica y vida a una idea de negocio en mente.": 0,
  };

  // 3. Current Tools (Pregunta 3)
  const toolsCounts: Record<string, number> = {
    "Hojas de cálculo aisladas (Excel / Google Sheets).": 0,
    "Chats de WhatsApp y notas personales.": 0,
    "Software comercial genérico / ERP prefabricado.": 0,
    "Registro manual físico (Cuadernos, papel, carpetas).": 0,
    "Sistema propio desarrollado a la medida.": 0,
  };

  // 4. Hours Lost (Pregunta 4)
  const hoursCounts: Record<string, number> = {
    "Menos de 5 horas a la semana.": 0,
    "Entre 5 y 15 horas a la semana.": 0,
    "Entre 15 y 30 horas a la semana.": 0,
    "Más de 30 horas a la semana.": 0,
  };

  // 5. Willingness to Pay (Pregunta 11)
  const wtpCounts: Record<string, number> = {
    "Menos de $2’000.000 COP (~$500 USD) - Automatización puntual o inicio.": 0,
    "Entre $2’000.000 y $5’000.000 COP (~$500 - $1.300 USD) - Módulo clave (CRM / Cotizador).": 0,
    "Entre $5’000.000 y $12’000.000 COP (~$1.300 - $3.000 USD) - Ecosistema integral (ERP a medida).": 0,
    "Más de $12’000.000 COP (> $3.000 USD) - Plataforma empresarial multiárea.": 0,
  };

  // 6. Payment Preference (Pregunta 10)
  const paymentCounts: Record<string, number> = {
    "Un pago único por el desarrollo + un costo mínimo mensual por infraestructura en la nube.": 0,
    "Una suscripción mensual fija (SaaS recurrente) sin costo inicial de desarrollo.": 0,
  };

  // 7. Barriers (Pregunta 12)
  const barrierCounts: Record<string, number> = {
    "El presupuesto (siento que debe ser una inversión muy alta de golpe).": 0,
    "El tiempo (necesito empezar a vender mañana mismo).": 0,
    "El miedo a que el proceso sea muy complejo y no logre entenderlo.": 0,
  };

  // 8. Industry (Pregunta 15)
  const industryCounts: Record<string, number> = {
    "Comercio y Ventas (Retail / E-commerce)": 0,
    "Servicios Profesionales y Consultoría": 0,
    "Logística, Transporte y Distribución": 0,
    "Manufactura y Producción": 0,
    "Salud, Estética y Bienestar": 0,
    "Gastronomía y Alimentos": 0,
    "Tecnología, Creativo y Startups": 0,
    "Otro Sector": 0,
  };

  // 9. Role (Pregunta 16)
  const roleCounts: Record<string, number> = {
    "Dueño / Fundador de un negocio activo.": 0,
    "Gerente / Director Operativo.": 0,
    "Emprendedor estructurando una nueva idea.": 0,
    "Independiente / Freelancer / Empleado.": 0,
  };

  for (const sub of submissions) {
    // Q5 (Custom vs Generic)
    const q5 = sub.answers[5];
    if (q5?.includes("100% a la medida")) customCount++;
    else if (q5?.includes("rápido y genérico")) genericCount++;

    // Q1 (Bottlenecks)
    const q1 = sub.answers[1];
    if (q1 && bottleneckCounts[q1] !== undefined) {
      bottleneckCounts[q1]++;
    }

    // Q3 (Current Tools)
    const q3 = sub.answers[3];
    if (q3 && toolsCounts[q3] !== undefined) {
      toolsCounts[q3]++;
    }

    // Q4 (Hours Lost)
    const q4 = sub.answers[4];
    if (q4 && hoursCounts[q4] !== undefined) {
      hoursCounts[q4]++;
    }

    // Q11 (Willingness to pay)
    const q11 = sub.answers[11];
    if (q11 && wtpCounts[q11] !== undefined) {
      wtpCounts[q11]++;
    }

    // Q10 (Payment preference)
    const q10 = sub.answers[10];
    if (q10 && paymentCounts[q10] !== undefined) {
      paymentCounts[q10]++;
    }

    // Q12 (Barriers)
    const q12 = sub.answers[12];
    if (q12 && barrierCounts[q12] !== undefined) {
      barrierCounts[q12]++;
    }

    // Q15 (Industry)
    const q15 = sub.answers[15];
    if (q15 && industryCounts[q15] !== undefined) {
      industryCounts[q15]++;
    }

    // Q16 (Role)
    const q16 = sub.answers[16];
    if (q16 && roleCounts[q16] !== undefined) {
      roleCounts[q16]++;
    }
  }

  const customPerc = formatPercentage(customCount, total);
  const genericPerc = formatPercentage(genericCount, total);

  return {
    totalResponses: total,
    customVsGeneric: {
      custom: customPerc,
      generic: genericPerc,
      customCount,
      genericCount,
    },
    topBottlenecks: Object.entries(bottleneckCounts).map(([label, count]) => ({
      label,
      count,
      percentage: formatPercentage(count, total),
    })),
    currentTools: Object.entries(toolsCounts).map(([label, count]) => ({
      label,
      count,
      percentage: formatPercentage(count, total),
    })),
    timeLostWeekly: Object.entries(hoursCounts).map(([label, count]) => ({
      label,
      count,
      percentage: formatPercentage(count, total),
    })),
    willingnessToPay: Object.entries(wtpCounts).map(([label, count]) => ({
      label,
      count,
      percentage: formatPercentage(count, total),
    })),
    paymentPreference: Object.entries(paymentCounts).map(([label, count]) => ({
      label,
      count,
      percentage: formatPercentage(count, total),
    })),
    investmentBarriers: Object.entries(barrierCounts).map(([label, count]) => ({
      label,
      count,
      percentage: formatPercentage(count, total),
    })),
    industryDistribution: Object.entries(industryCounts).map(([label, count]) => ({
      label,
      count,
      percentage: formatPercentage(count, total),
    })),
    roleDistribution: Object.entries(roleCounts).map(([label, count]) => ({
      label,
      count,
      percentage: formatPercentage(count, total),
    })),
  };
}
