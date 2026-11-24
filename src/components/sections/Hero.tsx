"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HeroDigitalUniverse } from "@/components/visual/HeroDigitalUniverse";
import { ArrowRight, ChevronDown, Layers } from "lucide-react";
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
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#000000]"
    >
      {/* Heavy Azul LOGIK (#075FFF) Ambient Glows */}
      <motion.div
        style={{ y: yBg }}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#075FFF]/25 blur-[160px] rounded-full pointer-events-none z-0"
      />
      <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-[#075FFF]/20 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#075FFF]/20 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* Pure 3D Interactive Digital Universe */}
      <HeroDigitalUniverse />

      {/* Main Content with Parallax Motion (Aligned with Page 19 Digital Mockup & existing animated hierarchy) */}
      <motion.div
        style={{ y: yText, opacity: opacityHero }}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
      >
        {/* Meta Label (META 13 / 18 per Brand Manual Page 16 & 19) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#075FFF]/60 bg-[#075FFF]/15 text-white font-mono text-[12px] sm:text-[13px] font-semibold tracking-widest uppercase shadow-[0_0_20px_rgba(7,95,255,0.35)]">
            <span className="w-2 h-2 rounded-full bg-[#075FFF] animate-ping" />
            <span>LOGIK LAB / SOFTWARE ENGINEERING</span>
          </div>
        </motion.div>

        {/* Primary Headline: Inter Display 800, Radical Contrast White + #075FFF */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold tracking-tightest text-white leading-[1.06] max-w-4xl"
        >
          La tecnología sigue{" "}
          <span className="text-[#075FFF] filter drop-shadow-[0_0_35px_rgba(7,95,255,0.65)]">
            tu lógica.
          </span>
        </motion.h1>

        {/* Subtitle in Official Gris Descriptor #B4B4B4 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 sm:mt-7 text-base sm:text-xl md:text-[22px] text-[#B4B4B4] max-w-2xl font-normal leading-relaxed px-2 sm:px-0"
        >
          Soluciones diseñadas en torno a procesos reales, con claridad desde la primera conversación.{" "}
          <strong className="text-white font-semibold">Software a tu medida.</strong>
        </motion.p>

        {/* High-Impact CTAs with Official #075FFF Glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 sm:mt-11 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          <Button
            href={getWhatsAppUrl()}
            isExternal
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto text-base py-4 px-8 min-h-[48px] shadow-[0_0_35px_rgba(7,95,255,0.75)] hover:shadow-[0_0_50px_rgba(7,95,255,1)]"
          >
            Agendar diagnóstico
          </Button>

          <Button
            href="#marca"
            variant="outline"
            size="lg"
            icon={<Layers className="w-4 h-4 text-[#075FFF]" />}
            iconPosition="left"
            className="w-full sm:w-auto text-base py-4 px-8 min-h-[48px] border-[#075FFF]/50 bg-[#000000]/70 hover:bg-[#075FFF]/20 hover:border-[#075FFF]"
          >
            Conocer el enfoque &bull; Marca
          </Button>
        </motion.div>

        {/* Minimal 3-Pillars Floating Bar + Isotype Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/15 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left"
        >
          <div className="p-5 rounded-2xl bg-[#000000]/80 border border-[#075FFF]/30 hover:border-[#075FFF] transition-colors">
            <div className="text-xs font-mono text-[#075FFF] font-bold uppercase tracking-wider">
              01 // ADAPTABILIDAD
            </div>
            <div className="text-base font-bold text-white mt-1">Software a tu medida</div>
            <div className="text-xs text-[#B4B4B4] mt-0.5">Ingeniería que entiende cada operación.</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#000000]/80 border border-[#075FFF]/30 hover:border-[#075FFF] transition-colors">
            <div className="text-xs font-mono text-[#075FFF] font-bold uppercase tracking-wider">
              02 // INFRAESTRUCTURA
            </div>
            <div className="text-base font-bold text-white mt-1">Control sobre procesos y datos</div>
            <div className="text-xs text-[#B4B4B4] mt-0.5">PostgreSQL &bull; Supabase &bull; Vercel.</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#000000]/80 border border-[#075FFF]/30 hover:border-[#075FFF] transition-colors flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-mono text-[#075FFF] font-bold uppercase tracking-wider">
                03 // SOBERANÍA
              </div>
              <div className="text-base font-bold text-white mt-1">Tu operación, más clara</div>
              <div className="text-xs text-[#B4B4B4] mt-0.5">Tus datos, tu código, sin ataduras.</div>
            </div>
            <div className="relative w-10 h-10 shrink-0 rounded-xl bg-[#000000] border border-white/15 p-1.5">
              <Image
                src="/brand/isotype.png"
                alt="LOGIK Isotipo"
                fill
                className="object-contain p-1.5"
              />
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <a
          href="#marca"
          aria-label="Desplazar al sistema de marca"
          className="mt-10 inline-flex flex-col items-center text-[#B4B4B4] hover:text-white transition-colors group"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase mb-1">
            SCROLL
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce text-[#075FFF] group-hover:text-white" />
        </a>
      </motion.div>
    </section>
  );
};
