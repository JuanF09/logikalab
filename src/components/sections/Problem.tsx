"use client";

import React from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import { FileSpreadsheet, MessageSquareWarning, Blocks, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const PAIN_POINTS = [
  {
    icon: <FileSpreadsheet className="w-5 h-5 text-[#1154FF]" />,
    code: "ERR_01 // FRAGMENTACIÓN",
    tag: "FÓRMULAS ROTAS",
    title: "Hojas de cálculo aisladas",
    description: "Versiones desincronizadas, fórmulas rotas y ceguera operativa.",
    impact: "Horas perdidas reconciliando datos a mano.",
    image: "/images/problem-spreadsheets.jpg",
    alt: "Hojas de cálculo aisladas y desincronizadas con fórmulas rotas",
  },
  {
    icon: <MessageSquareWarning className="w-5 h-5 text-[#1154FF]" />,
    code: "ERR_02 // VULNERABILIDAD",
    tag: "OPERACIÓN INFORMAL",
    title: "Operaciones por WhatsApp",
    description: "Pedidos perdidos en chats personales y dependencia de la memoria humana.",
    impact: "Fuga de clientes y cero trazabilidad.",
    image: "/images/problem-whatsapp.jpg",
    alt: "Caos operativo en chats y pedidos perdidos en WhatsApp",
  },
  {
    icon: <Blocks className="w-5 h-5 text-[#1154FF]" />,
    code: "ERR_03 // INCOMPATIBILIDAD",
    tag: "SISTEMA CERRADO",
    title: "Software genérico rígido",
    description: "ERPs que te obligan a cambiar tus métodos y cobran licencias inútiles.",
    impact: "Costo mensual elevado sin resolver el cuello de botella.",
    image: "/images/problem-erp.jpg",
    alt: "Software rígido incompatible y licencias costosas",
  },
];

export const Problem: React.FC = () => {
  return (
    <section id="problema" className="py-24 sm:py-32 relative bg-[#01040F] overflow-hidden">
      {/* Background ambient blue glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-[#1154FF]/15 blur-[150px] rounded-full pointer-events-none" />

      {/* Blue neon divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1154FF]/60 to-transparent shadow-[0_0_15px_#1154FF]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          tag="EL PROBLEMA"
          title="El desorden operativo tiene un costo. Lo pagas todos los días."
          description="Las empresas no frenan por falta de ventas, sino por la fricción de procesos manuales que saturan a sus líderes."
        />

        {/* 3 Problem Cards Grid with Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PAIN_POINTS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="h-full"
            >
              <CardSpotlight className="group p-5 sm:p-6 lg:p-7 h-full flex flex-col justify-between border-[#1154FF]/30 bg-gradient-to-b from-[#061238]/70 via-[#030922]/85 to-[#01040F] hover:border-[#1154FF] shadow-[0_4px_25px_-5px_rgba(17,84,255,0.25)] hover:shadow-[0_8px_35px_-5px_rgba(17,84,255,0.4)] transition-all duration-500">
                <div className="flex flex-col flex-1">
                  {/* Visual Image Representation */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#1154FF]/30 bg-[#02071B] mb-5 shadow-[0_0_20px_-5px_rgba(0,0,0,0.8)]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                      className="object-cover object-center filter saturate-125 contrast-110 transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient overlay to integrate with card theme */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030922]/90 via-[#030922]/20 to-transparent pointer-events-none" />

                    {/* Floating Badges inside Image */}
                    <div className="absolute top-2.5 left-2.5 p-2 rounded-lg bg-[#01040F]/80 backdrop-blur-md border border-[#1154FF]/40 text-[#1154FF] shadow-[0_0_12px_rgba(17,84,255,0.35)]">
                      {item.icon}
                    </div>

                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-[#01040F]/85 backdrop-blur-md border border-red-500/30 text-[10px] font-mono font-bold text-red-400 tracking-wider">
                      {item.tag}
                    </div>
                  </div>

                  {/* Code identifier */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[11px] text-[#6095FF] tracking-wider font-bold">
                      {item.code}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#D9D9D9]/80 leading-relaxed font-normal mb-6 flex-1">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Impact Note */}
                <div className="pt-4 border-t border-[#1154FF]/20 flex items-start gap-2.5 text-xs font-mono text-[#D9D9D9]/70 mt-auto">
                  <AlertCircle className="w-4 h-4 text-[#1154FF] shrink-0 mt-0.5" />
                  <span>{item.impact}</span>
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
