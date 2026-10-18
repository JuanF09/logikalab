export interface SurveyQuestion {
  id: number;
  section: string;
  sectionNumber: string;
  question: string;
  type: "single" | "text" | "role" | "age" | "legal";
  options?: string[];
  allowOther?: boolean;
}

export const SURVEY_SECTIONS = [
  { id: 1, title: "El Reto de tu Proyecto o Negocio", range: "Preguntas 1 - 3" },
  { id: 2, title: "Preferencias Tecnológicas y de Ejecución", range: "Preguntas 4 - 10" },
  { id: 3, title: "Intereses y Contenido de Valor", range: "Preguntas 11 - 12" },
  { id: 4, title: "Datos del Perfil (Cierre y Legal)", range: "Preguntas 13 - 17" },
];

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  // SECCIÓN I
  {
    id: 1,
    sectionNumber: "I",
    section: "EL RETO DE TU PROYECTO O NEGOCIO",
    question: "1. Si pudieras resolver un problema en tu negocio o proyecto hoy mismo, ¿cuál sería?",
    type: "single",
    allowOther: true,
    options: [
      "El desorden en los inventarios, entregas o logística.",
      "La gestión manual de citas, clientes y ventas.",
      "La coordinación de un equipo de trabajo o tareas diarias.",
      "El manejo de la facturación y la información financiera.",
      "Darle estructura y vida a una idea de negocio que tengo en mente.",
    ],
  },
  {
    id: 2,
    sectionNumber: "I",
    section: "EL RETO DE TU PROYECTO O NEGOCIO",
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
    section: "EL RETO DE TU PROYECTO O NEGOCIO",
    question: "3. Pensando a 2 años, ¿cómo proyectas tu iniciativa?",
    type: "single",
    options: [
      "Lanzando mi proyecto oficialmente al mercado con bases sólidas.",
      "Manteniendo el mismo tamaño, pero operando de forma 100% organizada y sin estrés.",
      "Escalando y abriendo nuevas áreas (necesitaré conectar datos en tiempo real).",
      "Ofreciendo nuevos servicios (necesitaré que el software se adapte constantemente).",
    ],
  },

  // SECCIÓN II
  {
    id: 4,
    sectionNumber: "II",
    section: "PREFERENCIAS TECNOLÓGICAS Y DE EJECUCIÓN",
    question: "4. Al buscar un sistema o plataforma digital, ¿qué prefieres?",
    type: "single",
    options: [
      "Algo rápido y genérico (aunque tenga que adaptar mi forma de trabajar al sistema).",
      "Algo 100% a la medida (que el sistema se adapte exactamente a mi idea, aunque tome tiempo).",
    ],
  },
  {
    id: 5,
    sectionNumber: "II",
    section: "PREFERENCIAS TECNOLÓGICAS Y DE EJECUCIÓN",
    question: "5. Si tuvieras que elegir la prioridad número uno para un software, ¿cuál sería?",
    type: "single",
    options: [
      "Que sea extremadamente fácil e intuitivo de usar para cualquier persona.",
      "Que la información (datos, pagos, clientes) sea 100% exacta, rápida y segura.",
      "Que el diseño visual sea espectacular y eleve el estatus de mi marca.",
    ],
  },
  {
    id: 6,
    sectionNumber: "II",
    section: "PREFERENCIAS TECNOLÓGICAS Y DE EJECUCIÓN",
    question: "6. Para construir un software robusto y a la medida, ¿cuánto tiempo estás dispuesto a esperar?",
    type: "single",
    options: [
      "Menos de 1 mes (Busco un Producto Mínimo Viable para probar rápido).",
      "Entre 1 y 3 meses (Entiendo que la ingeniería de calidad toma tiempo).",
      "Lo que sea necesario si el resultado resuelve mi problema por completo.",
    ],
  },
  {
    id: 7,
    sectionNumber: "II",
    section: "PREFERENCIAS TECNOLÓGICAS Y DE EJECUCIÓN",
    question: "7. Durante el desarrollo del proyecto, ¿cómo te gusta recibir los avances?",
    type: "single",
    options: [
      "Reuniones semanales de 15 minutos en videollamada.",
      "Videos cortos por WhatsApp mostrando la pantalla y el progreso real.",
      "No me muestren el proceso, solo avísenme cuando esté listo para probarlo.",
    ],
  },
  {
    id: 8,
    sectionNumber: "II",
    section: "PREFERENCIAS TECNOLÓGICAS Y DE EJECUCIÓN",
    question: "8. Después de que te entreguemos el sistema funcionando, ¿qué tipo de acompañamiento prefieres?",
    type: "single",
    options: [
      "Una capacitación inicial y yo me encargo del resto.",
      "Soporte técnico mensual para resolver dudas, asegurar que nada falle y hacer ajustes.",
      "Un equipo que me acompañe todo el año para ir agregando nuevas funciones al crecer.",
    ],
  },
  {
    id: 9,
    sectionNumber: "II",
    section: "PREFERENCIAS TECNOLÓGICAS Y DE EJECUCIÓN",
    question: "9. Si este software te ahorra tiempo y optimiza tu trabajo, ¿cómo prefieres pagarlo?",
    type: "single",
    options: [
      "Un pago único por la creación + un costo mínimo mensual por mantenerlo en la nube.",
      "Una suscripción mensual fija (SaaS) sin tener que pagar un gran costo inicial de desarrollo.",
    ],
  },
  {
    id: 10,
    sectionNumber: "II",
    section: "PREFERENCIAS TECNOLÓGICAS Y DE EJECUCIÓN",
    question: "10. Siendo muy honesto, ¿qué te detendría de invertir en desarrollo tecnológico hoy mismo?",
    type: "single",
    options: [
      "El presupuesto (siento que debe ser una inversión muy alta de golpe).",
      "El tiempo (necesito empezar a vender mañana mismo).",
      "El miedo a que el proceso sea muy complejo y no logre entenderlo.",
    ],
  },

  // SECCIÓN III
  {
    id: 11,
    sectionNumber: "III",
    section: "INTERESES Y CONTENIDO DE VALOR",
    question: "11. ¿Qué tipo de contenido te resultaría más útil ver en redes sociales para potenciar tu idea?",
    type: "single",
    options: [
      "Casos de éxito (Cómo un software le ahorró horas o dinero a un negocio real).",
      "Tips rápidos sobre automatización y organización comercial.",
      "Detrás de cámaras del código y cómo estructuramos un sistema desde cero.",
      "No suelo consumir este tipo de contenido.",
    ],
  },
  {
    id: 12,
    sectionNumber: "III",
    section: "INTERESES Y CONTENIDO DE VALOR",
    question: "12. Si documentamos el paso a paso de cómo estructuramos un proyecto, ¿te gustaría verlo?",
    type: "single",
    options: [
      "Sí, me interesa ver cómo se hace.",
      "No por ahora, gracias.",
    ],
  },

  // SECCIÓN IV
  {
    id: 13,
    sectionNumber: "IV",
    section: "DATOS DEL PERFIL (CIERRE Y LEGAL)",
    question: "13. Nombre completo:",
    type: "text",
  },
  {
    id: 14,
    sectionNumber: "IV",
    section: "DATOS DEL PERFIL (CIERRE Y LEGAL)",
    question: "14. Rango de Edad:",
    type: "age",
    options: ["18-25", "26-35", "36-45", "+45"],
  },
  {
    id: 15,
    sectionNumber: "IV",
    section: "DATOS DEL PERFIL (CIERRE Y LEGAL)",
    question: "15. Nombre de tu empresa, negocio o proyecto en mente (si aplica):",
    type: "text",
  },
  {
    id: 16,
    sectionNumber: "IV",
    section: "DATOS DEL PERFIL (CIERRE Y LEGAL)",
    question: "16. ¿Cuál es tu rol principal actualmente?",
    type: "role",
    options: [
      "Dueño / Fundador de un negocio activo.",
      "Emprendedor estructurando una nueva idea.",
      "Gerente / Director Operativo.",
      "Independiente / Freelancer / Empleado.",
    ],
  },
  {
    id: 17,
    sectionNumber: "IV",
    section: "DATOS DEL PERFIL (CIERRE Y LEGAL)",
    question: "17. Autorización de Tratamiento de Datos Personales (Obligatorio)",
    type: "legal",
    options: [
      "Sí, autorizo el tratamiento de mis datos personales.",
      "No autorizo.",
    ],
  },
];

export interface SurveySubmission {
  timestamp: string;
  answers: Record<number, string>;
  otherText?: string;
}

export interface StatsBreakdown {
  totalResponses: number;
  customVsGeneric: { custom: number; generic: number; customCount: number; genericCount: number };
  topBottlenecks: Array<{ label: string; count: number; percentage: number }>;
  timeWillingToWait: Array<{ label: string; count: number; percentage: number }>;
  paymentPreference: Array<{ label: string; count: number; percentage: number }>;
  roleDistribution: Array<{ label: string; count: number; percentage: number }>;
}

export const ZERO_STATS: StatsBreakdown = {
  totalResponses: 0,
  customVsGeneric: { custom: 0, generic: 0, customCount: 0, genericCount: 0 },
  topBottlenecks: [
    { label: "El desorden en los inventarios, entregas o logística.", count: 0, percentage: 0 },
    { label: "La gestión manual de citas, clientes y ventas.", count: 0, percentage: 0 },
    { label: "El manejo de la facturación y la información financiera.", count: 0, percentage: 0 },
    { label: "La coordinación de un equipo de trabajo o tareas diarias.", count: 0, percentage: 0 },
    { label: "Darle estructura y vida a una idea de negocio que tengo en mente.", count: 0, percentage: 0 },
  ],
  timeWillingToWait: [
    { label: "Lo que sea necesario si el resultado resuelve mi problema por completo.", count: 0, percentage: 0 },
    { label: "Entre 1 y 3 meses (Entiendo que la ingeniería de calidad toma tiempo).", count: 0, percentage: 0 },
    { label: "Menos de 1 mes (Busco un Producto Mínimo Viable para probar rápido).", count: 0, percentage: 0 },
  ],
  paymentPreference: [
    { label: "Un pago único por la creación + un costo mínimo mensual por mantenerlo en la nube.", count: 0, percentage: 0 },
    { label: "Una suscripción mensual fija (SaaS) sin tener que pagar un gran costo inicial de desarrollo.", count: 0, percentage: 0 },
  ],
  roleDistribution: [
    { label: "Dueño / Fundador de un negocio activo.", count: 0, percentage: 0 },
    { label: "Gerente / Director Operativo.", count: 0, percentage: 0 },
    { label: "Emprendedor estructurando una nueva idea.", count: 0, percentage: 0 },
    { label: "Independiente / Freelancer / Empleado.", count: 0, percentage: 0 },
  ],
};

export function computeRealStats(submissions: SurveySubmission[]): StatsBreakdown {
  const total = submissions.length;
  if (total === 0) {
    return ZERO_STATS;
  }

  // 1. Custom vs Generic (Pregunta 4)
  let customCount = 0;
  let genericCount = 0;

  // 2. Bottlenecks (Pregunta 1)
  const bottleneckCounts: Record<string, number> = {
    "El desorden en los inventarios, entregas o logística.": 0,
    "La gestión manual de citas, clientes y ventas.": 0,
    "El manejo de la facturación y la información financiera.": 0,
    "La coordinación de un equipo de trabajo o tareas diarias.": 0,
    "Darle estructura y vida a una idea de negocio que tengo en mente.": 0,
  };

  // 3. Time Willing to wait (Pregunta 6)
  const timeCounts: Record<string, number> = {
    "Lo que sea necesario si el resultado resuelve mi problema por completo.": 0,
    "Entre 1 y 3 meses (Entiendo que la ingeniería de calidad toma tiempo).": 0,
    "Menos de 1 mes (Busco un Producto Mínimo Viable para probar rápido).": 0,
  };

  // 4. Payment preference (Pregunta 9)
  const paymentCounts: Record<string, number> = {
    "Un pago único por la creación + un costo mínimo mensual por mantenerlo en la nube.": 0,
    "Una suscripción mensual fija (SaaS) sin tener que pagar un gran costo inicial de desarrollo.": 0,
  };

  // 5. Role distribution (Pregunta 16)
  const roleCounts: Record<string, number> = {
    "Dueño / Fundador de un negocio activo.": 0,
    "Gerente / Director Operativo.": 0,
    "Emprendedor estructurando una nueva idea.": 0,
    "Independiente / Freelancer / Empleado.": 0,
  };

  for (const sub of submissions) {
    // Q4
    const q4 = sub.answers[4];
    if (q4?.includes("100% a la medida")) customCount++;
    else if (q4?.includes("rápido y genérico")) genericCount++;

    // Q1
    const q1 = sub.answers[1];
    if (q1 && bottleneckCounts[q1] !== undefined) {
      bottleneckCounts[q1]++;
    }

    // Q6
    const q6 = sub.answers[6];
    if (q6 && timeCounts[q6] !== undefined) {
      timeCounts[q6]++;
    }

    // Q9
    const q9 = sub.answers[9];
    if (q9 && paymentCounts[q9] !== undefined) {
      paymentCounts[q9]++;
    }

    // Q16
    const q16 = sub.answers[16];
    if (q16 && roleCounts[q16] !== undefined) {
      roleCounts[q16]++;
    }
  }

  const customPerc = total > 0 ? Math.round((customCount / total) * 100) : 0;
  const genericPerc = total > 0 ? Math.round((genericCount / total) * 100) : 0;

  const topBottlenecks = Object.entries(bottleneckCounts).map(([label, count]) => ({
    label,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }));

  const timeWillingToWait = Object.entries(timeCounts).map(([label, count]) => ({
    label,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }));

  const paymentPreference = Object.entries(paymentCounts).map(([label, count]) => ({
    label,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }));

  const roleDistribution = Object.entries(roleCounts).map(([label, count]) => ({
    label,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }));

  return {
    totalResponses: total,
    customVsGeneric: {
      custom: customPerc,
      generic: genericPerc,
      customCount,
      genericCount,
    },
    topBottlenecks,
    timeWillingToWait,
    paymentPreference,
    roleDistribution,
  };
}
