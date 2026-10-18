"use client";

import React from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/config";
import { motion } from "framer-motion";
import { MapPin, MessageSquare, Shield, Terminal, ArrowUpRight } from "lucide-react";

export const Founder: React.FC = () => {
  const { founder, location } = SITE_CONFIG;

  return (
    <section id="fundador" className="py-24 sm:py-32 relative overflow-hidden bg-[#01040F]">
      {/* Top laser beam border separating from BrandShowcase */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1154FF] to-transparent shadow-[0_0_20px_#1154FF]" />

      {/* Background radial blue glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-[#1154FF]/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          tag="LIDERAZGO &bull; CEO"
          title="Ingeniería multimedia y arquitectura directa."
          description="En LOGIKA LAB hablas directamente con su fundador. Sin intermediarios comerciales ni llamadas perdidas."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-5 sm:p-10 lg:p-14 rounded-2xl sm:rounded-3xl border border-[#1154FF]/40 bg-gradient-to-br from-[#061442]/90 via-[#030A24]/95 to-[#01040F] max-w-5xl mx-auto shadow-[0_0_60px_-10px_rgba(17,84,255,0.4)] relative overflow-hidden"
        >
          {/* Subtle corner light beam */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#1154FF]/30 to-transparent pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10 lg:gap-14">
            {/* Real Founder Photo with electric blue aura */}
            <div className="relative shrink-0 group">
              {/* Pulsing blue aura behind the portrait */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#1154FF] to-[#3B75FF] rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow" />

              <div className="relative w-44 h-60 xs:w-56 xs:h-72 sm:w-64 sm:h-80 rounded-2xl overflow-hidden border-2 border-[#1154FF] bg-[#020719] shadow-2xl">
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  fill
                  priority
                  className="object-cover object-top filter brightness-105 contrast-110 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 250px, 320px"
                />
                {/* Gradient overlay at bottom of photo for seamless look */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020719] via-transparent to-transparent opacity-50" />
                
                {/* Verified badge pill over photo */}
                <div className="absolute bottom-3 left-3 right-3 py-1 px-2.5 rounded-lg bg-[#01040F]/90 backdrop-blur-md border border-[#1154FF]/50 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#1154FF] font-bold">VERIFIED</span>
                  <span className="text-white font-medium">CEO</span>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 flex items-center justify-center gap-1.5 text-xs text-[#D9D9D9]/80 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#1154FF]" />
                <span>{location.city}, {location.country}</span>
              </div>
            </div>

            {/* Profile Content: punchy, minimal, high-impact */}
            <div className="flex-1 text-center md:text-left">
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-2.5 mb-3">
                <span className="text-[11px] sm:text-xs font-mono px-3 py-1 rounded-full bg-[#1154FF] text-white font-bold tracking-wider shadow-[0_0_15px_rgba(17,84,255,0.7)]">
                  CEO &amp; FUNDADOR
                </span>
                <span className="text-[11px] sm:text-xs font-mono px-3 py-1 rounded-full bg-[#1154FF]/20 text-[#6095FF] border border-[#1154FF]/40 font-semibold tracking-wider">
                  {founder.profession.toUpperCase()}
                </span>
              </div>

              {/* Founder Name */}
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
                {founder.name}
              </h3>

              {/* Quote / Punchy Statement */}
              <blockquote className="my-4 sm:my-5 border-l-2 border-[#1154FF] pl-4 py-1 text-sm sm:text-base md:text-lg text-white font-medium leading-snug bg-[#1154FF]/10 rounded-r-xl text-left">
                &ldquo;{founder.quote}&rdquo;
              </blockquote>

              <p className="text-xs sm:text-base text-[#D9D9D9]/85 leading-relaxed font-normal mb-6 sm:mb-8 max-w-xl">
                Lidero el diseño técnico y la ejecución de cada ecosistema en LOGIKA LAB.
                Combinamos arquitectura de software moderna con experiencia interactiva para
                que tu empresa opere en piloto automático y multiplique su rentabilidad.
              </p>

              {/* Direct WhatsApp Call to Action */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 justify-center md:justify-start w-full">
                <Button
                  href={getWhatsAppUrl()}
                  isExternal
                  variant="primary"
                  size="md"
                  icon={<MessageSquare className="w-4 h-4" />}
                  iconPosition="left"
                  className="w-full sm:w-auto min-h-[48px] justify-center text-sm"
                >
                  Hablar con Juan David por WhatsApp
                </Button>

                <div className="flex items-center gap-2 text-xs font-mono text-[#D9D9D9]/70">
                  <Terminal className="w-4 h-4 text-[#1154FF]" />
                  <span>Respuesta técnica directa</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3 Executive Authority Pillars for the CEO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mt-6 sm:mt-8"
        >
          <div className="p-5 sm:p-6 rounded-2xl border border-[#1154FF]/30 bg-[#040C2B]/80 hover:border-[#1154FF] hover:shadow-[0_0_30px_rgba(17,84,255,0.3)] transition-all">
            <div className="text-xs font-mono text-[#1154FF] font-bold uppercase tracking-wider mb-2">
              // ATENCIÓN EJECUTIVA 1 A 1
            </div>
            <div className="text-base font-bold text-white mb-1">Sin Intermediarios</div>
            <p className="text-xs text-[#D9D9D9]/80 leading-relaxed">
              Diagnóstico, arquitectura y decisiones técnicas conversadas directamente con el fundador.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#040C2B]/80 hover:border-[#1154FF] hover:shadow-[0_0_30px_rgba(17,84,255,0.3)] transition-all">
            <div className="text-xs font-mono text-[#1154FF] font-bold uppercase tracking-wider mb-2">
              // PERFIL DE INGENIERÍA
            </div>
            <div className="text-base font-bold text-white mb-1">Ingeniería Multimedia</div>
            <p className="text-xs text-[#D9D9D9]/80 leading-relaxed">
              Fusión de bases de datos relacionales robustas, rendimiento cloud y UX/UI interactivo de alta gama.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#040C2B]/80 hover:border-[#1154FF] hover:shadow-[0_0_30px_rgba(17,84,255,0.3)] transition-all">
            <div className="text-xs font-mono text-[#1154FF] font-bold uppercase tracking-wider mb-2">
              // ALCANCE &amp; UBICACIÓN
            </div>
            <div className="text-base font-bold text-white mb-1">Cúcuta &bull; Cobertura Global</div>
            <p className="text-xs text-[#D9D9D9]/80 leading-relaxed">
              Ingeniería de software desde Norte de Santander para empresas líderes en Colombia y el exterior.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
