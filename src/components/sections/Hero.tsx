"use client";

import React, { useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HeroDigitalUniverse } from "@/components/visual/HeroDigitalUniverse";
import { ArrowRight, ChevronDown, Terminal, Cpu, Database, Sparkles, Film } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config";
import { motion, useScroll, useTransform } from "framer-motion";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transformations as the user scrolls
  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-[#01040F] via-[#020A24] to-[#01040F]"
    >
      {/* Heavy Electric Blue Ambient Glows */}
      <motion.div
        style={{ y: yBg }}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#1154FF]/30 blur-[160px] rounded-full pointer-events-none z-0"
      />
      <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-[#1154FF]/25 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#1154FF]/25 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Pure 3D Interactive Digital Universe (Zero Static Image) */}
      <HeroDigitalUniverse />

      {/* Main Content with Parallax Motion */}
      <motion.div
        style={{ y: yText, opacity: opacityHero }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
      >
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1154FF] bg-[#1154FF]/15 text-[#6095FF] font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(17,84,255,0.4)]">
            <span className="w-2 h-2 rounded-full bg-[#1154FF] animate-ping" />
            <span>&#123; SOFTWARE ENGINEERING STUDIO &#125;</span>
          </div>
        </motion.div>

        {/* Primary Headline: bold, punchy, minimal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tightest text-white leading-[1.08] sm:leading-[1.04] max-w-4xl"
        >
          Tu operación, en un sistema{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#7BA6FF] to-[#1154FF] filter drop-shadow-[0_0_35px_rgba(17,84,255,0.8)]">
            a tu medida.
          </span>
        </motion.h1>

        {/* Minimal Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 sm:mt-8 text-base sm:text-xl md:text-2xl text-[#D9D9D9] max-w-2xl font-normal leading-snug px-2 sm:px-0"
        >
          Ingeniería full-stack para empresas consolidadas.
          <br className="hidden sm:inline" />
          <strong className="text-white font-semibold"> Cero plantillas. Cero fricción.</strong>
        </motion.p>

        {/* High-Impact CTAs with Vibrant Blue Glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          <Button
            href={getWhatsAppUrl()}
            isExternal
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto text-base py-4 px-8 min-h-[48px] shadow-[0_0_35px_rgba(17,84,255,0.8)] hover:shadow-[0_0_50px_rgba(17,84,255,1)]"
          >
            Agendar diagnóstico
          </Button>

          <Button
            href="#marca"
            variant="outline"
            size="lg"
            icon={<Film className="w-4 h-4 text-[#1154FF]" />}
            iconPosition="left"
            className="w-full sm:w-auto text-base py-4 px-8 min-h-[48px] border-[#1154FF]/50 bg-[#061545]/40 hover:bg-[#1154FF]/20 hover:border-[#1154FF]"
          >
            Ver Video &bull; Marca
          </Button>
        </motion.div>

        {/* Minimal 3-Pillars Floating Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-20 pt-6 sm:pt-8 border-t border-[#1154FF]/25 w-full grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6 text-left"
        >
          <div className="p-4 rounded-xl bg-[#061442]/40 border border-[#1154FF]/30">
            <div className="text-xs font-mono text-[#1154FF] font-bold uppercase tracking-wider">
              // ADAPTABILIDAD
            </div>
            <div className="text-base font-bold text-white mt-1">100% a la Medida</div>
            <div className="text-xs text-[#D9D9D9]/75 mt-0.5">Modelado a tu flujo exacto.</div>
          </div>

          <div className="p-4 rounded-xl bg-[#061442]/40 border border-[#1154FF]/30">
            <div className="text-xs font-mono text-[#1154FF] font-bold uppercase tracking-wider">
              // INFRAESTRUCTURA
            </div>
            <div className="text-base font-bold text-white mt-1">Escalabilidad Cloud</div>
            <div className="text-xs text-[#D9D9D9]/75 mt-0.5">PostgreSQL &bull; Supabase &bull; Vercel.</div>
          </div>

          <div className="p-4 rounded-xl bg-[#061442]/40 border border-[#1154FF]/30">
            <div className="text-xs font-mono text-[#1154FF] font-bold uppercase tracking-wider">
              // SOBERANÍA
            </div>
            <div className="text-base font-bold text-white mt-1">Propiedad Total</div>
            <div className="text-xs text-[#D9D9D9]/75 mt-0.5">Tus datos, tu código, sin ataduras.</div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <a
          href="#problema"
          aria-label="Desplazar al problema"
          className="mt-12 inline-flex flex-col items-center text-[#6095FF] hover:text-white transition-colors group"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase mb-1">
            SCROLL
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce text-[#1154FF] group-hover:text-white" />
        </a>
      </motion.div>
    </section>
  );
};
