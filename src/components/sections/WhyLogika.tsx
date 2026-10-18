"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import { Compass, TrendingUp, ShieldCheck, HardDrive, Network } from "lucide-react";
import { motion } from "framer-motion";

export const WhyLogika: React.FC = () => {
  return (
    <section id="por-que-logika" className="py-24 sm:py-32 relative bg-[#01040F] overflow-hidden">
      {/* Background radial blue glow */}
      <div className="absolute top-1/2 right-10 w-[700px] h-[500px] bg-[#1154FF]/20 blur-[160px] rounded-full pointer-events-none" />

      {/* Blue neon divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1154FF]/60 to-transparent shadow-[0_0_15px_#1154FF]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          tag="POR QUÉ LOGIKA LAB"
          title="Tu ventaja técnica, no una plantilla de suscripción."
          description="Las empresas líderes no operan con herramientas genéricas que cualquier competidor alquila por $29 al mes."
        />

        {/* 2 Main Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <CardSpotlight className="p-8 sm:p-10 h-full border-[#1154FF]/40 bg-gradient-to-b from-[#061442]/80 via-[#030A24]/90 to-[#01040F] hover:border-[#1154FF] shadow-[0_0_40px_-5px_rgba(17,84,255,0.3)]">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-xl bg-[#1154FF] text-white shadow-[0_0_20px_#1154FF]">
                  <Compass className="w-7 h-7" />
                </div>
                <span className="font-mono text-xs text-[#1154FF] font-bold tracking-widest uppercase">
                  // PILAR 01
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
                Adaptabilidad Absoluta
              </h3>

              <p className="text-base text-[#D9D9D9]/85 leading-relaxed font-normal mb-6">
                Agnósticos a la industria. Modelamos la matemática y los flujos exactos de tu
                empresa sin obligarte a cambiar lo que ya funciona.
              </p>

              <div className="pt-4 border-t border-[#1154FF]/20 flex items-center gap-2 text-xs font-mono text-[#6095FF]">
                <Network className="w-4 h-4 text-[#1154FF]" />
                <span>Flujos propios &bull; Lógica a tu medida</span>
              </div>
            </CardSpotlight>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <CardSpotlight className="p-8 sm:p-10 h-full border-[#1154FF]/40 bg-gradient-to-b from-[#061442]/80 via-[#030A24]/90 to-[#01040F] hover:border-[#1154FF] shadow-[0_0_40px_-5px_rgba(17,84,255,0.3)]">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-xl bg-[#1154FF] text-white shadow-[0_0_20px_#1154FF]">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <span className="font-mono text-xs text-[#1154FF] font-bold tracking-widest uppercase">
                  // PILAR 02
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
                Escalabilidad Nativa
              </h3>

              <p className="text-base text-[#D9D9D9]/85 leading-relaxed font-normal mb-6">
                Bases relacionales normalizadas para soportar 10x transacciones sin
                degradar velocidad ni requerir reescrituras técnicas costosas.
              </p>

              <div className="pt-4 border-t border-[#1154FF]/20 flex items-center gap-2 text-xs font-mono text-[#6095FF]">
                <HardDrive className="w-4 h-4 text-[#1154FF]" />
                <span>PostgreSQL &bull; Concurrencia elástica</span>
              </div>
            </CardSpotlight>
          </motion.div>
        </div>

        {/* 3 Metric Proofs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 sm:p-10 rounded-2xl border-2 border-[#1154FF]/40 bg-gradient-to-r from-[#061442] via-[#040C2B] to-[#061442] shadow-[0_0_50px_-5px_rgba(17,84,255,0.3)]"
        >
          <div>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tightest mb-2">
              100%
            </div>
            <div className="text-base font-bold text-white mb-1">A la Medida</div>
            <div className="text-xs text-[#D9D9D9]/75 font-mono">
              Cero plantillas predeterminadas.
            </div>
          </div>

          <div className="sm:border-l border-[#1154FF]/30 sm:pl-8">
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tightest mb-2">
              0
            </div>
            <div className="text-base font-bold text-white mb-1">Vendor Lock-In</div>
            <div className="text-xs text-[#D9D9D9]/75 font-mono">
              Dueño total de tu código y datos.
            </div>
          </div>

          <div className="sm:border-l border-[#1154FF]/30 sm:pl-8">
            <div className="text-4xl sm:text-5xl font-black text-[#1154FF] tracking-tightest mb-2 filter drop-shadow-[0_0_20px_#1154FF]">
              99.9%
            </div>
            <div className="text-base font-bold text-white mb-1">SLA Cloud</div>
            <div className="text-xs text-[#D9D9D9]/75 font-mono">
              Disponibilidad edge con Supabase &amp; Vercel.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
