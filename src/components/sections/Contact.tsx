"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import {
  SITE_CONFIG,
  getWhatsAppUrl,
  getMailtoUrl,
} from "@/lib/config";
import {
  MessageSquare,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

export const Contact: React.FC = () => {
  const { contact, location, socials, founder } = SITE_CONFIG;

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    emailOrPhone: "",
    bottleneck: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      const customMsg = `Hola Juan David, soy ${formData.name} de ${formData.company}. Contacto: ${formData.emailOrPhone}. Nuestro proceso más crítico es: ${formData.bottleneck}`;
      const url = getWhatsAppUrl(customMsg);
      window.open(url, "_blank");
    }, 500);
  };

  return (
    <section id="contacto" className="py-24 sm:py-32 relative bg-[#01040F] overflow-hidden">
      {/* Background Texture with blue lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-30 select-none z-0">
        <Image
          src="/images/contact-backdrop.jpg"
          alt="Textura de red de LOGIKA LAB"
          fill
          className="object-cover object-bottom filter saturate-200"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#01040F] via-[#01040F]/80 to-[#01040F]" />
      </div>

      {/* Blue Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#1154FF]/25 blur-[160px] rounded-full pointer-events-none z-0" />

      {/* Blue neon divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1154FF]/60 to-transparent shadow-[0_0_15px_#1154FF]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          tag="DIAGNÓSTICO TÉCNICO"
          title="Hablemos de tu operación."
          description="Sin discursos de venta ni intermediarios. Diagnóstico directo con Juan David Figueroa para evaluar tu arquitectura."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct WhatsApp Card & Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Primary Action: Direct WhatsApp */}
            <div className="p-8 rounded-3xl border-2 border-[#1154FF] bg-gradient-to-br from-[#07184D] via-[#040D2B] to-[#01040F] shadow-[0_0_50px_rgba(17,84,255,0.4)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1154FF] shadow-[0_0_20px_#1154FF]" />

              <span className="font-mono text-xs text-[#1154FF] font-bold tracking-widest uppercase mb-3 block">
                // CANAL DIRECTO INMEDIATO
              </span>

              <h3 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                WhatsApp Directo
              </h3>

              <div className="text-sm font-mono text-[#6095FF] mb-4">
                {contact.whatsappDisplay} &bull; Juan David Figueroa
              </div>

              <p className="text-sm text-[#D9D9D9]/85 leading-relaxed font-normal mb-6">
                Chatea directamente con nuestro CEO. Cuéntanos qué proceso operativo te quita
                tiempo y recibe una respuesta técnica en minutos.
              </p>

              <Button
                href={getWhatsAppUrl()}
                isExternal
                variant="primary"
                size="lg"
                icon={<MessageSquare className="w-5 h-5" />}
                iconPosition="left"
                className="w-full justify-center text-base py-4 shadow-[0_0_30px_#1154FF]"
              >
                Abrir WhatsApp Oficial
              </Button>
            </div>

            {/* Email & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={getMailtoUrl()}
                className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#040C2B]/80 hover:border-[#1154FF] hover:shadow-[0_0_30px_-5px_rgba(17,84,255,0.4)] transition-all group"
              >
                <div className="p-3 rounded-xl bg-[#1154FF]/20 text-[#1154FF] w-fit mb-3 group-hover:bg-[#1154FF] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-mono text-[#6095FF] uppercase font-bold">CORREO OFICIAL</div>
                <div className="text-sm font-bold text-white mt-1 break-all group-hover:text-[#1154FF] transition-colors">
                  {contact.email}
                </div>
              </a>

              <div className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#040C2B]/80">
                <div className="p-3 rounded-xl bg-[#1154FF]/20 text-[#1154FF] w-fit mb-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-[11px] font-mono text-[#6095FF] uppercase font-bold">SEDE PRINCIPAL</div>
                <div className="text-sm font-bold text-white mt-1">
                  {location.formatted}
                </div>
              </div>
            </div>

            {/* Socials / Channels */}
            <div className="p-5 rounded-2xl border border-[#1154FF]/30 bg-[#040C2B]/80 flex items-center justify-between">
              <span className="font-mono text-xs text-[#D9D9D9]/80 font-bold tracking-wider">
                CANALES // SOCIAL
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp directo con Juan David Figueroa"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#1154FF]/20 hover:bg-[#1154FF] text-white transition-all shadow-[0_0_10px_rgba(17,84,255,0.4)] active:scale-95"
                >
                  <MessageSquare className="w-5 h-5" />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn de LOGIKA LAB"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 hover:bg-[#1154FF]/30 text-[#D9D9D9] hover:text-white transition-colors active:scale-95"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub de LOGIKA LAB"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 hover:bg-[#1154FF]/30 text-[#D9D9D9] hover:text-white transition-colors active:scale-95"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Diagnostic Request Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <CardSpotlight className="p-8 sm:p-10 rounded-3xl border border-[#1154FF]/40 bg-gradient-to-b from-[#061442]/90 via-[#030A24]/95 to-[#01040F] shadow-[0_0_50px_-5px_rgba(17,84,255,0.3)]">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1154FF]/25">
                <div>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    Solicitud de Diagnóstico
                  </h3>
                  <p className="text-xs text-[#6095FF] font-mono mt-1 font-semibold">
                    // Comunicación directa con Juan David Figueroa Jiménez
                  </p>
                </div>
                <span className="hidden sm:inline-flex text-[11px] font-mono text-[#1154FF] px-3 py-1 rounded-full bg-[#1154FF]/15 border border-[#1154FF]/30 font-bold">
                  CONFIDENCIAL
                </span>
              </div>

              {isSuccess ? (
                <div className="p-8 rounded-2xl bg-[#1154FF]/15 border-2 border-[#1154FF] text-center animate-in fade-in duration-300">
                  <CheckCircle2 className="w-14 h-14 text-[#1154FF] mx-auto mb-4 animate-bounce" />
                  <h4 className="text-2xl font-black text-white mb-2">
                    Solicitud Enviada con Éxito
                  </h4>
                  <p className="text-base text-[#D9D9D9] max-w-md mx-auto mb-6">
                    Se ha abierto la conexión directa a WhatsApp con Juan David Figueroa para
                    revisar tu caso de inmediato.
                  </p>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    variant="outline"
                    size="sm"
                    className="border-[#1154FF] text-white"
                  >
                    Enviar otra consulta
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-mono text-xs text-[#D9D9D9] uppercase tracking-wider mb-2 font-bold"
                      >
                        Tu Nombre Completo *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Ej: Carlos Mendoza"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#020719] border border-[#1154FF]/30 text-white placeholder-white/20 text-sm focus:border-[#1154FF] focus:ring-2 focus:ring-[#1154FF]/50 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block font-mono text-xs text-[#D9D9D9] uppercase tracking-wider mb-2 font-bold"
                      >
                        Empresa / Sector *
                      </label>
                      <input
                        id="company"
                        type="text"
                        required
                        autoComplete="organization"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        placeholder="Ej: Logística Andina"
                        className="w-full px-4 py-3.5 rounded-xl bg-[#020719] border border-[#1154FF]/30 text-white placeholder-white/20 text-sm focus:border-[#1154FF] focus:ring-2 focus:ring-[#1154FF]/50 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contactInfo"
                      className="block font-mono text-xs text-[#D9D9D9] uppercase tracking-wider mb-2 font-bold"
                    >
                      Celular de Contacto / WhatsApp *
                    </label>
                    <input
                      id="contactInfo"
                      type="text"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      value={formData.emailOrPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, emailOrPhone: e.target.value })
                      }
                      placeholder="Ej: 310 000 0000 o correo"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#020719] border border-[#1154FF]/30 text-white placeholder-white/20 text-sm focus:border-[#1154FF] focus:ring-2 focus:ring-[#1154FF]/50 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="bottleneck"
                      className="block font-mono text-xs text-[#D9D9D9] uppercase tracking-wider mb-2 font-bold"
                    >
                      ¿Qué proceso operativo te genera más pérdidas de tiempo? *
                    </label>
                    <textarea
                      id="bottleneck"
                      required
                      rows={3}
                      autoComplete="off"
                      value={formData.bottleneck}
                      onChange={(e) =>
                        setFormData({ ...formData, bottleneck: e.target.value })
                      }
                      placeholder="Ej: Control de despachos en varias hojas de Excel y confirmaciones por WhatsApp que causan retrasos."
                      className="w-full px-4 py-3.5 rounded-xl bg-[#020719] border border-[#1154FF]/30 text-white placeholder-white/20 text-sm focus:border-[#1154FF] focus:ring-2 focus:ring-[#1154FF]/50 outline-none transition-all resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    icon={<Send className="w-4 h-4" />}
                    className="w-full justify-center text-base py-4 shadow-[0_0_35px_#1154FF]"
                  >
                    {isSubmitting ? "Conectando..." : "Enviar y Chatear con Juan David"}
                  </Button>
                </form>
              )}
            </CardSpotlight>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
