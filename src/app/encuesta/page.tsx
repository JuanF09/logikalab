import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SurveyContainer } from "@/components/survey/SurveyContainer";
import { ArrowLeft, MessageSquare, Shield, Globe } from "lucide-react";
import { getWhatsAppUrl, SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Encuesta de Validación Operativa 2026 | LOGIK LAB — Software Engineering",
  description:
    "Estudio técnico confidencial sobre arquitectura de software, cuellos de botella operativos y desarrollo a la medida para empresas y fundadores en Colombia y Latinoamérica.",
  alternates: {
    canonical: "https://logikalab.com/encuesta",
  },
  openGraph: {
    title: "Encuesta de Validación Operativa | LOGIK LAB",
    description:
      "Diagnóstico confidencial para empresas y fundadores. Evalúa tus necesidades tecnológicas con LOGIK LAB — Software Engineering.",
    url: "https://logikalab.com/encuesta",
    siteName: "LOGIK LAB",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Encuesta de Validación Operativa | LOGIK LAB",
    description:
      "Diagnóstico técnico para estructurar software a la medida y optimizar procesos operativos.",
  },
};

export default function EncuestaPage() {
  const { founder, location } = SITE_CONFIG;

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#075FFF] selection:text-white flex flex-col relative overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#075FFF]/15 blur-[180px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[400px] bg-[#075FFF]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Top Standalone Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#000000]/90 backdrop-blur-xl border-b border-[#075FFF]/30 py-3 sm:py-4 px-3 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 sm:gap-3 focus-visible:ring-2 focus-visible:ring-[#075FFF] rounded-md outline-none"
            title="Volver a la página principal de LOGIK LAB"
          >
            <div className="relative">
              <div className="absolute -inset-1.5 bg-[#075FFF]/30 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <Logo height={28} priority />
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-[#075FFF]/20 border border-white/10 hover:border-[#075FFF] text-[#B4B4B4] hover:text-white text-xs font-mono font-semibold transition-all min-h-[38px]"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#075FFF]" />
              <span className="hidden sm:inline">Volver a</span>
              <span>logikalab.com</span>
            </Link>

            <a
              href={getWhatsAppUrl("Hola Juan David, tengo dudas sobre la encuesta de validación operativa.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#075FFF] hover:bg-[#075FFF] text-white text-xs font-mono font-bold shadow-[0_0_20px_#075FFF] transition-all min-h-[38px]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Questionnaire Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-12 relative z-10 flex flex-col justify-center">
        {/* Intro Banner */}
        <div className="mb-6 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#075FFF]/20 border border-[#075FFF]/40 text-[#075FFF] text-xs font-mono font-bold mb-3">
            <Shield className="w-3.5 h-3.5 text-[#075FFF]" />
            <span>ESTUDIO TÉCNICO OFICIAL 2026 &bull; HABEAS DATA</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Encuesta de Validación Operativa
          </h1>
          <p className="text-xs sm:text-sm text-[#B4B4B4]/80 mt-2 px-2 sm:px-0">
            Identificamos los cuellos de botella de tu modelo de negocio y evaluamos la viabilidad
            de construir un sistema de software 100% adaptado a tus operaciones.
          </p>
        </div>

        {/* Survey Component Card */}
        <div className="w-full rounded-2xl sm:rounded-3xl border sm:border-2 border-[#075FFF]/40 bg-gradient-to-b from-[#000000] via-[#000000] to-[#000000] shadow-[0_0_80px_rgba(7, 95, 255,0.4)] overflow-hidden">
          <SurveyContainer standalone={true} />
        </div>
      </main>

      {/* Standalone Footer */}
      <footer className="border-t border-[#075FFF]/25 py-8 px-4 text-center text-xs text-[#B4B4B4]/70 font-mono relative z-10 bg-[#000000]/95">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <strong className="text-white">LOGIK LAB &bull; Software Engineering</strong>
            <span className="block text-[11px] text-[#B4B4B4]/60 mt-0.5">
              {founder.name} &bull; {founder.role} ({founder.profession})
            </span>
          </div>
          <div className="text-[11px] text-[#B4B4B4]/60">
            {location.formatted} &bull; Todos los derechos reservados &copy; 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
