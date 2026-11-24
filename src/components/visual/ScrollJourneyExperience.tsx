"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SurveyModal } from "@/components/survey/SurveyModal";
import { ClipboardList } from "lucide-react";

export const ScrollJourneyExperience: React.FC = () => {
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // Parallax offsets for floating kinetic elements along the vertical viewport
  const yElement1 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const yElement2 = useTransform(scrollYProgress, [0, 1], [100, -500]);
  const yElement3 = useTransform(scrollYProgress, [0, 1], [-50, -420]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <>
      {/* Floating Kinetic Tech Artifacts in Margins (Piezas autónomas [ ]) */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none hidden xl:block">
        {/* Floating Autonomous Piece Left */}
        <motion.div
          style={{ y: yElement1, rotate: rotate1 }}
          className="absolute top-[28%] left-8 p-3 rounded-2xl bg-[#000000]/40 border border-[#075FFF]/25 text-[#075FFF]/70 font-mono text-2xl font-bold backdrop-blur-sm shadow-[0_0_20px_rgba(7,95,255,0.15)]"
        >
          [ ]
        </motion.div>

        {/* Floating Architecture Tag Right */}
        <motion.div
          style={{ y: yElement2, rotate: rotate2 }}
          className="absolute top-[48%] right-10 py-1.5 px-3 rounded-full bg-[#000000]/50 border border-[#075FFF]/30 text-[#B4B4B4] font-mono text-[10px] tracking-widest uppercase backdrop-blur-sm"
        >
          // POSTGRESQL &bull; RELATIONAL
        </motion.div>

        {/* Floating Node Left Lower */}
        <motion.div
          style={{ y: yElement3 }}
          className="absolute top-[68%] left-10 py-1.5 px-3 rounded-full bg-[#000000]/50 border border-[#075FFF]/30 text-white/70 font-mono text-[10px] tracking-widest uppercase backdrop-blur-sm"
        >
          &gt;_ LOGIK LAB // 2026
        </motion.div>
      </div>

      {/* Floating Quick Action Pill for Survey */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-[calc(1.25rem+var(--sab,0px))] right-4 sm:bottom-6 sm:right-6 z-40"
      >
        {/* Desktop / Tablet Full Pill */}
        <button
          onClick={() => setIsSurveyOpen(true)}
          className="hidden sm:flex group items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#000000] to-[#000000] border-2 border-[#075FFF] text-white font-mono text-xs font-bold shadow-[0_0_25px_rgba(7,95,255,0.6)] hover:shadow-[0_0_35px_#075FFF] hover:border-white transition-all active:scale-95"
          aria-label="Abrir encuesta de validación operativa"
        >
          <span className="w-2 h-2 rounded-full bg-[#075FFF] group-hover:bg-white animate-ping" />
          <ClipboardList className="w-4 h-4 text-[#075FFF] group-hover:text-white transition-colors" />
          <span>Encuesta de Validación</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#075FFF] text-white font-black">
            NUEVO
          </span>
        </button>

        {/* Mobile Circular High-Tech FAB */}
        <button
          onClick={() => setIsSurveyOpen(true)}
          className="sm:hidden relative w-12 h-12 rounded-full bg-gradient-to-br from-[#000000] via-[#000000] to-[#000000] border-2 border-[#075FFF] text-white flex items-center justify-center shadow-[0_0_25px_rgba(7,95,255,0.7)] active:scale-90 transition-transform"
          aria-label="Abrir encuesta de validación operativa"
          title="Encuesta de Validación"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#075FFF] border-2 border-[#000000] flex items-center justify-center animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </span>
          <ClipboardList className="w-5 h-5 text-[#075FFF]" />
        </button>
      </motion.div>

      {/* Persistent Survey Modal Instance */}
      <SurveyModal
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
      />
    </>
  );
};
