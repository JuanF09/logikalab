"use client";

import React from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import { motion } from "framer-motion";
import { Sparkles, Palette, Type, Code2, Film } from "lucide-react";
import { BrandVideoPlayer } from "@/components/brand/BrandVideoPlayer";

const BRAND_COLORS = [
  {
    hex: "#1154FF",
    name: "AZUL VÍVIDO",
    role: "Acento Primario // Energía & CTAs",
    bgClass: "bg-[#1154FF]",
    borderClass: "border-[#1154FF]",
    textColor: "text-white",
  },
  {
    hex: "#FFFFFF",
    name: "BLANCO",
    role: "Máximo Contraste // Titulares",
    bgClass: "bg-[#FFFFFF]",
    borderClass: "border-white",
    textColor: "text-black",
  },
  {
    hex: "#000000",
    name: "NEGRO ABSOLUTO",
    role: "Fondo Base // Profundidad",
    bgClass: "bg-[#01040F]",
    borderClass: "border-white/20",
    textColor: "text-white",
  },
  {
    hex: "#D9D9D9",
    name: "GRIS CLARO",
    role: "Cuerpo de Texto // Lectura Óptima",
    bgClass: "bg-[#D9D9D9]",
    borderClass: "border-[#D9D9D9]",
    textColor: "text-black",
  },
];

export const BrandShowcase: React.FC = () => {
  return (
    <section id="marca" className="py-24 sm:py-32 relative overflow-hidden bg-[#01040F]/90">
      {/* Top laser beam border separating from Hero */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1154FF] to-transparent shadow-[0_0_20px_#1154FF]" />

      {/* Huge ambient background glow in vivid blue #1154FF */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#1154FF]/25 blur-[170px] rounded-full pointer-events-none" />

      {/* Subtle giant floating watermark of K Isotype */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none select-none hidden lg:block">
        <Image
          src="/brand/isotype-clean.png"
          alt="Watermark K LAB"
          width={700}
          height={880}
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          tag="BRAND IDENTITY 2026"
          title="Identidad visual forjada en rigor técnico y carácter propio."
          description="Cada elemento de LOGIKA LAB responde a un principio de ingeniería: geometría precisa, tipografía robusta y un azul eléctrico que define nuestra energía operativa."
        />

        {/* Flagship Cinematic Brand Video Reel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#1154FF] font-bold tracking-widest uppercase">
                  // MOTION REEL &bull; REVELACIÓN OFICIAL
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1154FF]/20 text-white border border-[#1154FF]/40 font-bold">
                  60 FPS &bull; AUDIO DESIGN
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                La marca en movimiento cinemático.
              </h3>
            </div>
            <p className="text-xs text-[#D9D9D9]/70 font-mono sm:text-right max-w-sm">
              Despliegue dinámico del isotipo modular {"{LK}"} hacia la estructura tipográfica de LOGIKA LAB.
            </p>
          </div>

          <BrandVideoPlayer />
        </motion.div>

        {/* Master Brand Cards Grid: Vector Anatomy & Isotype */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-12">
          {/* Card 1: Official Logo on Electric Brand Blue Backdrop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-2xl sm:rounded-3xl border-2 border-white/30 bg-gradient-to-br from-[#1154FF] via-[#0D40C9] to-[#051A61] p-5 sm:p-8 md:p-12 flex flex-col justify-between shadow-[0_0_70px_rgba(17,84,255,0.65)] relative overflow-hidden group"
          >
            {/* Background geometric accents */}
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

            {/* Top Tag */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6 sm:mb-8 relative z-10">
              <span className="font-mono text-[11px] sm:text-xs text-white font-black tracking-widest uppercase bg-black/30 px-3 py-1 rounded-full border border-white/20">
                // LOGOTIPO OFICIAL &bull; IDENTIDAD
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono px-3 py-1 rounded-full bg-white text-[#1154FF] font-black shadow-lg">
                #1154FF AZUL VÍVIDO
              </span>
            </div>

            {/* Giant Logo Representation on Blue Background */}
            <div className="py-6 sm:py-10 flex items-center justify-center relative z-10">
              <div className="relative w-full max-w-lg aspect-[3.67/1] transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <Image
                  src="/brand/logo.png"
                  alt="LOGIKA LAB Software Engineering Logotipo Oficial"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Details breakdown */}
            <div className="pt-5 sm:pt-6 border-t border-white/20 grid grid-cols-1 xs:grid-cols-3 gap-2.5 sm:gap-4 text-xs font-mono text-white/90 relative z-10">
              <div className="bg-black/20 p-3 rounded-xl border border-white/10">
                <span className="text-white font-extrabold text-sm">&#123; &#125;</span>
                <span className="block text-white font-bold mt-0.5">Corchetes</span>
                <span className="text-[10px] text-white/70">Símbolo de código</span>
              </div>
              <div className="bg-black/20 p-3 rounded-xl border border-white/10">
                <span className="text-white font-extrabold text-sm">LOGIKA</span>
                <span className="block text-white font-bold mt-0.5">Open Sauce</span>
                <span className="text-[10px] text-white/70">Extra-bold display</span>
              </div>
              <div className="bg-black/20 p-3 rounded-xl border border-white/10">
                <span className="text-white font-extrabold text-sm">LAB</span>
                <span className="block text-white font-bold mt-0.5">Estudio</span>
                <span className="text-[10px] text-white/70">Innovación activa</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Official Isotype { K } LAB */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 rounded-2xl sm:rounded-3xl border-2 border-[#1154FF] bg-gradient-to-br from-[#082069] via-[#041240] to-[#010617] p-5 sm:p-8 md:p-12 flex flex-col justify-between shadow-[0_0_50px_rgba(17,84,255,0.4)] relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-[#1154FF] font-bold tracking-widest uppercase">
                // ISOTIPO OFICIAL
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/10 text-white border border-white/20">
                FAVICON &bull; ICONO
              </span>
            </div>

            {/* Isotype Visual */}
            <div className="py-6 flex items-center justify-center">
              <div className="relative w-44 h-44 transition-transform duration-500 group-hover:scale-110">
                <Image
                  src="/brand/isotype.png"
                  alt="Isotipo { K } LAB"
                  fill
                  className="object-contain filter drop-shadow-[0_0_30px_rgba(17,84,255,0.6)]"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#D9D9D9]/80">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#1154FF]" />
                <span>Geometría K en corte 45°</span>
              </div>
              <span className="text-[#1154FF] font-bold">2026 ED.</span>
            </div>
          </motion.div>
        </div>

        {/* Palette & Typography Tokens Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_COLORS.map((col, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-xl border border-white/10 bg-[#040A22]/80 hover:border-[#1154FF] hover:shadow-[0_0_30px_-5px_rgba(17,84,255,0.4)] transition-all duration-300"
            >
              {/* Color Swatch Box */}
              <div
                className={`w-full h-14 rounded-lg mb-4 border ${col.borderClass} ${col.bgClass} flex items-center justify-center shadow-inner`}
              >
                <span className={`font-mono text-xs font-bold tracking-wider ${col.textColor}`}>
                  {col.hex}
                </span>
              </div>

              <div className="text-sm font-bold text-white tracking-tight">
                {col.name}
              </div>

              <div className="text-xs text-[#D9D9D9]/70 font-mono mt-1">
                {col.role}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
