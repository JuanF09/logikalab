"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export interface TechItem {
  name: string;
  category: string;
  desc: string;
  brandColor: string;
  glowColor: string;
  telemetry: string;
  spec: string;
  logo: React.ReactNode;
}

interface InteractiveTechCardProps {
  tech: TechItem;
  index: number;
}

export const InteractiveTechCard: React.FC<InteractiveTechCardProps> = ({
  tech,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation between -12 and 12 degrees
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
    setMousePos({ x, y });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (e.touches.length > 0 && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      setMousePos({ x, y });
    }
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsHovered(false);
      setRotateX(0);
      setRotateY(0);
    }, 1200);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="perspective-1000 h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
        className="relative h-full p-5 sm:p-7 rounded-2xl border-2 transition-colors duration-300 flex flex-col justify-between overflow-hidden cursor-pointer select-none group bg-gradient-to-b from-[#061442]/90 via-[#030924]/95 to-[#01040F]"
      >
        {/* Border Glow with Brand Color on Hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
          style={{
            borderColor: isHovered ? tech.brandColor : "rgba(17, 84, 255, 0.25)",
            borderWidth: isHovered ? "2px" : "1px",
            boxShadow: isHovered ? `0 0 35px ${tech.glowColor}` : "none",
          }}
        />

        {/* Dynamic Cursor Spotlight Tracking */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${tech.brandColor}30, transparent 75%)`,
          }}
        />

        {/* Brand Ambient Aura Behind Logo */}
        <div
          className="absolute -top-10 -left-10 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
          style={{
            backgroundColor: tech.brandColor,
            opacity: isHovered ? 0.35 : 0.08,
          }}
        />

        {/* Card Content - Z-space depth */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            {/* Top Row: Official Logo + Live Status Telemetry */}
            <div className="flex items-center justify-between mb-5">
              {/* Logo Box with 3D Depth & Light Ring */}
              <div
                className="relative p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-center shadow-lg group-hover:scale-110"
                style={{
                  backgroundColor: `${tech.brandColor}15`,
                  borderColor: isHovered ? tech.brandColor : "rgba(255, 255, 255, 0.15)",
                  boxShadow: isHovered ? `0 0 25px ${tech.glowColor}` : "none",
                }}
              >
                {tech.logo}
              </div>

              {/* Status Badge with Live Pulsing Radar */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 font-mono text-[10px]">
                <span className="flex h-2 w-2 relative">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: tech.brandColor }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: tech.brandColor }}
                  />
                </span>
                <span className="text-[#D9D9D9] font-bold tracking-wider">
                  {tech.spec}
                </span>
              </div>
            </div>

            {/* Tool Name & Category */}
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-white transition-colors">
              {tech.name}
            </h4>

            <div
              className="text-xs font-mono font-bold mt-1 mb-3 transition-colors"
              style={{ color: isHovered ? tech.brandColor : "#6095FF" }}
            >
              // {tech.category}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#D9D9D9]/80 leading-relaxed font-normal">
              {tech.desc}
            </p>
          </div>

          {/* Bottom Interactive Visualizer Bar */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px]">
            {/* Telemetry Tag */}
            <div className="flex items-center gap-1.5 text-[#D9D9D9]/90">
              <Activity className="w-3.5 h-3.5 text-[#1154FF]" />
              <span className="truncate">{tech.telemetry}</span>
            </div>

            {/* 6-Bar Micro Audio/Signal Equalizer Animation */}
            <div className="flex items-end gap-1 h-3.5 shrink-0 pl-2">
              {[0.4, 0.8, 0.5, 0.9, 0.6, 0.7].map((height, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? tech.brandColor : "rgba(255,255,255,0.3)",
                    height: isHovered ? `${Math.max(25, (height * 100) % 100)}%` : "35%",
                    transform: isHovered ? "scaleY(1.2)" : "scaleY(1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
