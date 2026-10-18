/**
 * ==============================================================================
 * LOGIKA LAB — Software Engineering
 * ARCHIVO CENTRAL DE CONFIGURACIÓN Y PUNTOS DE CONTACTO
 * ==============================================================================
 */

export const SITE_CONFIG = {
  // Datos Generales de la Firma
  brandName: "LOGIKA LAB",
  tagline: "Software Engineering",
  fullTitle: "LOGIKA LAB — Software Engineering",
  description:
    "Firma de ingeniería de software y estudio de producto digital. Construimos ecosistemas tecnológicos escalables, seguros y 100% a la medida para empresas consolidadas.",
  url: "https://logikalab.com",

  // Fundador y CEO Oficial
  founder: {
    name: "Juan David Figueroa Jiménez",
    role: "CEO & Fundador",
    profession: "Ingeniero Multimedia",
    photo: "/brand/juan-david-figueroa.jpg",
    location: "Cúcuta, Norte de Santander, Colombia",
    quote:
      "El software de una empresa no debe ser una plantilla que te limite, sino un ecosistema preciso y escalable que multiplique tu rentabilidad.",
  },

  // Ubicación Corporativa
  location: {
    city: "Cúcuta",
    region: "Norte de Santander",
    country: "Colombia",
    formatted: "Cúcuta, Norte de Santander, Colombia",
  },

  // Puntos de Contacto Oficiales
  contact: {
    whatsappNumber: "573144899142",
    whatsappDisplay: "+57 314 489 9142",
    whatsappMessage:
      "Hola Juan David, me comunico desde la web de LOGIKA LAB para agendar un diagnóstico técnico sobre la operación de mi empresa.",
    email: "logikalab@gmail.com",
    meetingUrl: "https://wa.me/573144899142?text=Hola%20Juan%20David,%20quisiera%20agendar%20un%20diagn%C3%B3stico%20t%C3%A9cnico",
  },

  // Redes Sociales y Presencia
  socials: {
    whatsapp: "https://wa.me/573144899142",
    linkedin: "https://www.linkedin.com/in/juan-david-figueroa-jimenez",
    github: "https://github.com/logikalab",
    instagram: "https://instagram.com/logikalab",
  },

  // Año de Copyright
  year: 2026,
} as const;

/**
 * Generador seguro de enlace de WhatsApp
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const number = SITE_CONFIG.contact.whatsappNumber.replace(/[^0-9]/g, "");
  const message = encodeURIComponent(
    customMessage || SITE_CONFIG.contact.whatsappMessage
  );
  return `https://wa.me/${number}?text=${message}`;
}

/**
 * Enlace directo de correo
 */
export function getMailtoUrl(subject?: string): string {
  const email = SITE_CONFIG.contact.email;
  const encodedSubject = encodeURIComponent(
    subject || "Solicitud de Diagnóstico Operativo — LOGIKA LAB"
  );
  return `mailto:${email}?subject=${encodedSubject}`;
}
