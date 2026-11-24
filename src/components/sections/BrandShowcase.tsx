"use client";

import React from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { Type, Layers, Eye, ShieldCheck, Grid } from "lucide-react";
import { BrandVideoPlayer } from "@/components/brand/BrandVideoPlayer";

const BRAND_COLORS = [
  {
    hex: "#075FFF",
    rgb: "RGB 7 / 95 / 255",
    name: "AZUL LOGIK",
    role: "Uso: Acento e identidad // Firma de reconocimiento",
    bgClass: "bg-[#075FFF]",
    borderClass: "border-[#075FFF]",
    textColor: "text-white",
  },
  {
    hex: "#000000",
    rgb: "RGB 0 / 0 / 0",
    name: "NEGRO ABSOLUTO",
    role: "Uso: Fondo principal // Contraste radical 21:1 AAA",
    bgClass: "bg-[#000000]",
    borderClass: "border-white/25",
    textColor: "text-white",
  },
  {
    hex: "#FFFFFF",
    rgb: "RGB 255 / 255 / 255",
    name: "BLANCO",
    role: "Uso: Logotipo y textos // Lectura prioritaria",
    bgClass: "bg-[#FFFFFF]",
    borderClass: "border-white",
    textColor: "text-black",
  },
  {
    hex: "#B4B4B4",
    rgb: "RGB 180 / 180 / 180",
    name: "GRIS DESCRIPTOR",
    role: "Uso: Apoyo tipográfico // Subtítulos y descriptores",
    bgClass: "bg-[#B4B4B4]",
    borderClass: "border-[#B4B4B4]",
    textColor: "text-black",
  },
];

const THREE_DECISIONS = [
  {
    symbol: "Aa",
    title: "Geometría amable",
    desc: "Terminaciones redondeadas y trazos contundentes, con un lenguaje cercano y tecnológico.",
    theme: "bg-[#000000] border-white/15 text-white",
    symbolColor: "text-white",
  },
  {
    symbol: "01/02",
    title: "Contraste radical",
    desc: "Negro (#000000) y blanco (#FFFFFF) como estructura. Azul eléctrico (#075FFF) como firma de reconocimiento.",
    theme: "bg-[#075FFF] border-[#075FFF] text-white shadow-[0_0_40px_rgba(7,95,255,0.45)]",
    symbolColor: "text-white",
  },
  {
    symbol: "[ ]",
    title: "Piezas autónomas",
    desc: "Separación entre signos y componentes: un lenguaje modular que sugiere construcción y adaptabilidad.",
    theme: "bg-[#000000] border-[#075FFF]/40 text-white",
    symbolColor: "text-[#075FFF]",
  },
];

export const BrandShowcase: React.FC = () => {
  return (
    <section id="marca" className="py-24 sm:py-32 relative overflow-hidden bg-[#000000]">
      {/* Top laser beam border separating from Hero */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#075FFF] to-transparent shadow-[0_0_20px_#075FFF]" />

      {/* Huge ambient background glow in official Azul LOGIK #075FFF */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#075FFF]/20 blur-[170px] rounded-full pointer-events-none" />

      {/* Subtle giant floating watermark of new K Isotype */}
      <div className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none select-none hidden lg:block">
        <Image
          src="/brand/isotype.png"
          alt="Watermark LOGIK Isotipo"
          width={680}
          height={680}
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          tag="LOGIK LAB / BRAND SYSTEM"
          title="Una identidad. Un criterio. Síntesis, contraste y modularidad."
          description="Nuestro sistema visual se apoya en una palabra gráfica de formas redondeadas, el azul eléctrico #075FFF, el negro absoluto #000000 y la familia editorial Inter / Inter Display."
        />

        {/* 01. Three Visual Essence Decisions (Page 4 of Brand Manual) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {THREE_DECISIONS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className={`p-7 sm:p-8 rounded-2xl border flex flex-col justify-between ${item.theme}`}
            >
              <div className={`text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 ${item.symbolColor}`}>
                {item.symbol}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-white/85 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 02. Interactive Brand System Showcase (3 Master Resources) */}
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
                <span className="font-mono text-xs text-[#075FFF] font-bold tracking-widest uppercase">
                  // 01 / INVENTARIO • TRES RECURSOS, UN SISTEMA
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#075FFF]/20 text-white border border-[#075FFF]/40 font-bold">
                  EDICIÓN 1.0 / NOV 2026
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Firma principal, logotipo abreviado e isotipo autónomo.
              </h3>
            </div>
            <p className="text-xs text-[#B4B4B4] font-mono sm:text-right max-w-sm">
              Reserva visual obligatoria X = 10% de la altura visible en sus cuatro lados.
            </p>
          </div>

          <BrandVideoPlayer />
        </motion.div>

        {/* 03. Master Brand Cards Grid: Firma Principal & Isotipo Autónomo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-12">
          {/* Card 1: Firma Principal on Pure Black #000000 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-2xl sm:rounded-3xl border-2 border-[#075FFF]/50 bg-[#000000] p-5 sm:p-8 md:p-10 flex flex-col justify-between shadow-[0_0_60px_rgba(7,95,255,0.3)] relative overflow-hidden group"
          >
            {/* Top Tag */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6 relative z-10">
              <span className="font-mono text-[11px] sm:text-xs text-white font-bold tracking-widest uppercase bg-white/5 px-3 py-1 rounded-full border border-white/15">
                // 03 / SISTEMA DE MARCA • FIRMA PRINCIPAL
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono px-3 py-1 rounded-full bg-[#075FFF] text-white font-bold shadow-lg">
                MÍNIMO DIGITAL: 640 PX
              </span>
            </div>

            {/* Giant Firma Completa Representation */}
            <div className="py-6 sm:py-10 flex items-center justify-center relative z-10">
              <div className="relative w-full max-w-lg aspect-[2.97/1] transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/brand/logo-full.png"
                  alt="LOGIK LAB Software Engineering Firma Principal"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Anatomy Breakdown */}
            <div className="pt-5 sm:pt-6 border-t border-white/15 grid grid-cols-1 xs:grid-cols-3 gap-2.5 sm:gap-4 text-xs font-mono text-white/90 relative z-10">
              <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10">
                <span className="text-white font-extrabold text-sm">Logik</span>
                <span className="block text-[#075FFF] font-bold mt-0.5">Lettering propietario</span>
                <span className="text-[11px] text-[#B4B4B4]">Formas redondeadas y K modular</span>
              </div>
              <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10">
                <span className="text-[#B4B4B4] font-extrabold text-sm">DESCRIPTOR</span>
                <span className="block text-white font-bold mt-0.5">Software Engineering</span>
                <span className="text-[11px] text-[#B4B4B4]">Gris descriptor #B4B4B4</span>
              </div>
              <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10">
                <span className="text-white font-extrabold text-sm">Inter Display</span>
                <span className="block text-[#075FFF] font-bold mt-0.5">Sistema Editorial</span>
                <span className="text-[11px] text-[#B4B4B4]">Pesos 400 / 500 / 600 / 700 / 800</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Official Isotipo Autónomo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 rounded-2xl sm:rounded-3xl border-2 border-[#075FFF] bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000] p-5 sm:p-8 md:p-10 flex flex-col justify-between shadow-[0_0_50px_rgba(7,95,255,0.35)] relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-[#075FFF] font-bold tracking-widest uppercase">
                // ISOTIPO AUTÓNOMO
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/10 text-white border border-white/20">
                AVATAR • FAVICON • 40 PX+
              </span>
            </div>

            {/* Isotype Visual */}
            <div className="py-6 flex items-center justify-center">
              <div className="relative w-44 h-44 transition-transform duration-500 group-hover:scale-110 p-6 rounded-3xl bg-[#000000] border border-white/15 shadow-2xl">
                <Image
                  src="/brand/isotype.png"
                  alt="Isotipo Autónomo LOGIK LAB"
                  fill
                  className="object-contain p-5 filter drop-shadow-[0_0_25px_rgba(7,95,255,0.5)]"
                />
              </div>
            </div>

            <div className="space-y-2 pt-5 border-t border-white/10 text-xs">
              <div className="font-bold text-white text-sm">
                Dos elementos. Una identidad.
              </div>
              <p className="text-[#B4B4B4] leading-relaxed">
                La barra vertical blanca y el ángulo azul (#075FFF) de vértice izquierdo generan una señal compacta y distinguible en microformatos.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 04. Verified Master Color Palette (Page 11 of Brand Manual) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_COLORS.map((col, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-2xl border border-white/15 bg-[#000000]/90 hover:border-[#075FFF] hover:shadow-[0_0_30px_-5px_rgba(7,95,255,0.4)] transition-all duration-300"
            >
              {/* Color Swatch Box */}
              <div
                className={`w-full h-16 rounded-xl mb-4 border ${col.borderClass} ${col.bgClass} flex flex-col items-center justify-center shadow-inner`}
              >
                <span className={`font-mono text-xs font-extrabold tracking-wider ${col.textColor}`}>
                  {col.hex}
                </span>
                <span className={`font-mono text-[10px] opacity-80 ${col.textColor}`}>
                  {col.rgb}
                </span>
              </div>

              <div className="text-base font-bold text-white tracking-tight">
                {col.name}
              </div>

              <div className="text-xs text-[#B4B4B4] font-mono mt-1">
                {col.role}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
