"use client";

import React from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Check, X, ShieldCheck, Zap, Database, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export const Solution: React.FC = () => {
  return (
    <section id="solucion" className="py-24 sm:py-32 relative bg-[#000000] overflow-hidden">
      {/* Background radial blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#075FFF]/25 blur-[170px] rounded-full pointer-events-none" />

      {/* Blue neon divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#075FFF]/60 to-transparent shadow-[0_0_15px_#075FFF]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          tag="LA SOLUCIÓN"
          title="El software se adapta a tu negocio. No al revés."
          description="Ecosistemas digitales diseñados a la medida de tu operación real. Centralización de datos en la nube y máxima velocidad."
        />

        {/* Central Architecture Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 relative rounded-3xl overflow-hidden border-2 border-[#075FFF]/50 bg-[#000000] shadow-[0_0_60px_-10px_rgba(7, 95, 255,0.45)]"
        >
          <div className="relative aspect-[16/9] w-full max-h-[500px]">
            <Image
              src="/images/solution-architecture.jpg"
              alt="Arquitectura del ecosistema digital diseñado por LOGIK LAB"
              fill
              loading="lazy"
              className="object-cover object-center filter saturate-150 contrast-115"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-75" />
          </div>

          {/* Quick Architecture Bar */}
          <div className="p-4 sm:p-8 bg-gradient-to-r from-[#000000] via-[#000000] to-[#000000] border-t border-[#075FFF]/40 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-[#075FFF] shrink-0" />
              <div>
                <div className="text-[10px] sm:text-[11px] font-mono text-[#075FFF] uppercase font-bold">BASE DE DATOS</div>
                <div className="text-xs sm:text-sm font-bold text-white">PostgreSQL &bull; Supabase</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-[#075FFF] shrink-0" />
              <div>
                <div className="text-[10px] sm:text-[11px] font-mono text-[#075FFF] uppercase font-bold">RENDIMIENTO</div>
                <div className="text-xs sm:text-sm font-bold text-white">&lt; 100ms Respuesta</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#075FFF] shrink-0" />
              <div>
                <div className="text-[10px] sm:text-[11px] font-mono text-[#075FFF] uppercase font-bold">SEGURIDAD</div>
                <div className="text-xs sm:text-sm font-bold text-white">Cifrado &amp; Respaldo</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-[#075FFF] shrink-0" />
              <div>
                <div className="text-[10px] sm:text-[11px] font-mono text-[#075FFF] uppercase font-bold">DESPLIEGUE</div>
                <div className="text-xs sm:text-sm font-bold text-white">Vercel Edge Cloud</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Before vs After Minimal Contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Box 1: Caos Operativo */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-5 sm:p-8 md:p-10 rounded-2xl border border-red-500/30 bg-[#0C050B]/80 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10">
              <span className="font-mono text-xs text-red-400 font-bold tracking-widest uppercase">
                // ANTES &bull; CAOS OPERATIVO
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/15 text-red-400 font-mono font-semibold">
                DESORDEN
              </span>
            </div>

            <ul className="space-y-3.5 sm:space-y-4">
              {[
                "Procesos atados a hojas de cálculo frágiles.",
                "WhatsApp como canal improvisado de pedidos.",
                "Pérdida de trazabilidad y descuadres.",
                "El dueño vive apagando incendios diarios.",
                "Temor constante a perder información crítica.",
              ].map((text, idx) => (
                <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#B4B4B4]/80 font-medium">
                  <div className="p-1 rounded-full bg-red-500/15 text-red-400 shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Box 2: Ecosistema a Medida */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-5 sm:p-8 md:p-10 rounded-2xl border-2 border-[#075FFF] bg-gradient-to-br from-[#000000]/90 via-[#000000]/95 to-[#000000] relative overflow-hidden shadow-[0_0_50px_rgba(7, 95, 255,0.4)]"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#075FFF] shadow-[0_0_15px_#075FFF]" />

            <div className="flex items-center justify-between mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-[#075FFF]/30">
              <span className="font-mono text-xs text-[#075FFF] font-bold tracking-widest uppercase">
                // DESPUÉS &bull; LOGIK LAB
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#075FFF] text-white font-mono font-bold shadow-[0_0_10px_#075FFF]">
                100% A LA MEDIDA
              </span>
            </div>

            <ul className="space-y-4">
              {[
                "Software adaptado a tu flujo exacto de trabajo.",
                "Base de datos relacional centralizada y segura.",
                "Automatización inmediata de tareas repetitivas.",
                "Acceso por roles desde cualquier dispositivo.",
                "Operación predecible y libertad para escalar.",
              ].map((text, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-white font-semibold">
                  <div className="p-1 rounded-full bg-[#075FFF] text-white shrink-0 shadow-[0_0_8px_#075FFF]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
