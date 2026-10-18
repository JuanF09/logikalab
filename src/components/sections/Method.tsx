"use client";

import React, { useRef } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Search, GitBranch, Code2, Rocket } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

const STEPS = [
  {
    step: "01",
    tag: "FASE 01 // INMERSIÓN",
    title: "Diagnóstico de Flujos",
    description: "Mapeo exhaustivo de procesos, hojas de cálculo actuales y cuellos de botella.",
    deliverable: "Mapa operativo vs. arquitectura propuesta.",
    icon: <Search className="w-5 h-5 text-[#1154FF]" />,
  },
  {
    step: "02",
    tag: "FASE 02 // MODELADO",
    title: "Arquitectura de Datos",
    description: "Diseño relacional en PostgreSQL, modelos entidad-relación y permisos por roles.",
    deliverable: "Blueprint técnico y wireframes interactivos.",
    icon: <GitBranch className="w-5 h-5 text-[#1154FF]" />,
  },
  {
    step: "03",
    tag: "FASE 03 // CÓDIGO",
    title: "Construcción Full-Stack",
    description: "Desarrollo con TypeScript, Next.js y pruebas de estrés con datos reales.",
    deliverable: "Demos continuas en entornos de staging.",
    icon: <Code2 className="w-5 h-5 text-[#1154FF]" />,
  },
  {
    step: "04",
    tag: "FASE 04 // VUELO",
    title: "Despliegue & Mantenimiento",
    description: "Migración de históricos sin interrupción, capacitación y soporte continuo.",
    deliverable: "Puesta en producción cloud con monitoreo.",
    icon: <Rocket className="w-5 h-5 text-[#1154FF]" />,
  },
];

export const Method: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="metodo"
      className="py-24 sm:py-32 relative bg-[#01040F] overflow-hidden"
    >
      {/* Background radial blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#1154FF]/20 blur-[170px] rounded-full pointer-events-none" />

      {/* Blue neon divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1154FF]/60 to-transparent shadow-[0_0_15px_#1154FF]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          tag="MÉTODO"
          title="Cómo convertimos el caos en un sistema predecible."
          description="Cuatro fases de ingeniería rigurosa donde la arquitectura precede a cada línea de código."
        />

        <div className="relative mt-16">
          {/* Base track line */}
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-[2px] bg-white/10 -translate-x-1/2" />

          {/* Dynamic Laser Line that fills on scroll */}
          <motion.div
            style={{ scaleY }}
            className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-[3px] bg-gradient-to-b from-[#1154FF] via-[#7BA6FF] to-white shadow-[0_0_20px_#1154FF] origin-top -translate-x-1/2 z-0"
          />

          <div className="space-y-12 lg:space-y-16">
            {STEPS.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`relative flex flex-col lg:flex-row items-center ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Center Node Badge on Line with pulse */}
                  <motion.div
                    whileInView={{ scale: [0.8, 1.15, 1], borderColor: ["#1154FF", "#FFFFFF", "#1154FF"] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full bg-[#040C2B] border-2 border-[#1154FF] text-white font-mono text-sm font-bold shadow-[0_0_25px_#1154FF] z-10"
                  >
                    {item.step}
                  </motion.div>

                  {/* Content Card */}
                  <div
                    className="w-full lg:w-[calc(50%-45px)] p-8 rounded-2xl border border-[#1154FF]/40 bg-gradient-to-b from-[#061442]/80 via-[#030A24]/90 to-[#01040F] hover:border-[#1154FF] shadow-[0_0_35px_-5px_rgba(17,84,255,0.3)] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2.5 rounded-xl bg-[#1154FF]/20 border border-[#1154FF]/40 text-[#1154FF] shadow-[0_0_12px_rgba(17,84,255,0.4)]">
                          {item.icon}
                        </div>
                        <span className="font-mono text-xs text-[#6095FF] font-bold tracking-wider">
                          {item.tag}
                        </span>
                      </div>
                      <span className="lg:hidden font-mono text-sm font-bold text-white px-3 py-1 rounded bg-[#1154FF] shadow-[0_0_10px_#1154FF]">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                      {item.title}
                    </h3>

                    <p className="text-base text-[#D9D9D9]/80 leading-relaxed font-normal mb-5">
                      {item.description}
                    </p>

                    <div className="p-3.5 rounded-xl bg-[#01040F]/80 border border-[#1154FF]/30 flex items-center gap-2 text-xs font-mono text-[#D9D9D9]/80">
                      <span className="text-[#1154FF] font-bold text-sm">&#8627;</span>
                      <span>
                        <strong className="text-white">Entregable:</strong> {item.deliverable}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
