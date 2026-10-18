import React from "react";
import { ScrollProgress } from "@/components/visual/ScrollProgress";
import { ScrollJourneyExperience } from "@/components/visual/ScrollJourneyExperience";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { WhyLogika } from "@/components/sections/WhyLogika";
import { Method } from "@/components/sections/Method";
import { Stack } from "@/components/sections/Stack";
import { Founder } from "@/components/sections/Founder";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#01040F] text-white selection:bg-[#1154FF] selection:text-white flex flex-col relative">
      {/* Scroll Progress Bar at the top */}
      <ScrollProgress />

      {/* Kinetic Floating Journey & Survey Launcher */}
      <ScrollJourneyExperience />

      {/* 01. Fixed Header */}
      <Header />

      {/* 02. Hero with Interactive Living Network Canvas & Parallax */}
      <Hero />

      {/* 03. Official Brand & Motion Cinema Showcase */}
      <BrandShowcase />

      {/* 04. Leadership: Juan David Figueroa Jiménez (CEO & Ingeniero Multimedia) */}
      <Founder />

      {/* 05. Operational Bottlenecks */}
      <Problem />

      {/* 06. Solution: Before vs. After */}
      <Solution />

      {/* 07. Bento Grid: What We Build */}
      <WhatWeBuild />

      {/* 08. Why LOGIKA LAB: Adaptability & Scalability */}
      <WhyLogika />

      {/* 09. 4-Phase Method Timeline */}
      <Method />

      {/* 10. World-Class Tech Stack */}
      <Stack />

      {/* 11. Diagnostic Request & Direct WhatsApp */}
      <Contact />

      {/* 12. Corporate Footer */}
      <Footer />
    </main>
  );
}
