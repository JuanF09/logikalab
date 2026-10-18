"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] bg-transparent pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-[#1154FF] via-[#5C8DFF] to-[#FFFFFF] origin-left shadow-[0_0_12px_#1154FF]"
        style={{ scaleX }}
      />
    </div>
  );
};
