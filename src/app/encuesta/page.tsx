import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SurveyContainer } from "@/components/survey/SurveyContainer";
import { ArrowLeft, MessageSquare, Shield, Globe } from "lucide-react";
import { getWhatsAppUrl, SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Encuesta de Validación Operativa 2026 | LOGIKA LAB — Software Engineering",
  description:
    "Estudio técnico confidencial sobre arquitectura de software, cuellos de botella operativos y desarrollo a la medida para empresas y fundadores en Colombia y Latinoamérica.",
  alternates: {
    canonical: "https://logikalab.com/encuesta",
  },
  openGraph: {
    title: "Encuesta de Validación Operativa | LOGIKA LAB",
    description:
      "Diagnóstico confidencial para empresas y fundadores. Evalúa tus necesidades tecnológicas con LOGIKA LAB — Software Engineering.",
    url: "https://logikalab.com/encuesta",
    siteName: "LOGIKA LAB",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Encuesta de Validación Operativa | LOGIKA LAB",
    description:
      "Diagnóstico técnico para estructurar software a la medida y optimizar procesos operativos.",
  },
};

export default function EncuestaPage() {
  const { founder, location } = SITE_CONFIG;

  return (
    <div className="min-h-screen bg-[#01040F] text-white selection:bg-[#1154FF] selection:text-white flex flex-col relative overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#1154FF]/15 blur-[180px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[400px] bg-[#1154FF]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Top Standalone Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#01040F]/90 backdrop-blur-xl border-b border-[#1154FF]/30 py-4 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-[#1154FF] rounded-md outline-none"
            title="Volver a la página principal de LOGIKA LAB"
          >
            <div className="relative">
              <div className="absolute -inset-1.5 bg-[#1154FF]/30 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <Logo height={32} priority />
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-[#1154FF]/20 border border-white/10 hover:border-[#1154FF] text-[#D9D9D9] hover:text-white text-xs font-mono font-semibold transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#1154FF]" />
              <span className="hidden sm:inline">Volver a</span>
              <span>logikalab.com</span>
            </Link>

            <a
              href={getWhatsAppUrl("Hola Juan David, tengo dudas sobre la encuesta de validación operativa.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1154FF] hover:bg-[#2B68FF] text-white text-xs font-mono font-bold shadow-[0_0_20px_#1154FF] transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Questionnaire Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10 flex flex-col justify-center">
        {/* Intro Banner */}
        <div className="mb-6 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1154FF]/20 border border-[#1154FF]/40 text-[#6095FF] text-xs font-mono font-bold mb-3">
            <Shield className="w-3.5 h-3.5 text-[#1154FF]" />
            <span>ESTUDIO TÉCNICO OFICIAL 2026 &bull; HABEAS DATA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Encuesta de Validación Operativa
          </h1>
          <p className="text-sm text-[#D9D9D9]/80 mt-2">
            Identificamos los cuellos de botella de tu modelo de negocio y evaluamos la viabilidad
            de construir un sistema de software 100% adaptado a tus operaciones.
          </p>
        </div>

        {/* Survey Component Card */}
        <div className="w-full rounded-3xl border-2 border-[#1154FF]/40 bg-gradient-to-b from-[#061442] via-[#030A24] to-[#01040F] shadow-[0_0_80px_rgba(17,84,255,0.4)] overflow-hidden">
          <SurveyContainer standalone={true} />
        </div>
      </main>

      {/* Standalone Footer */}
      <footer className="border-t border-[#1154FF]/25 py-8 px-4 text-center text-xs text-[#D9D9D9]/70 font-mono relative z-10 bg-[#01040F]/95">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <strong className="text-white">LOGIKA LAB &bull; Software Engineering</strong>
            <span className="block text-[11px] text-[#D9D9D9]/60 mt-0.5">
              {founder.name} &bull; {founder.role} ({founder.profession})
            </span>
          </div>
          <div className="text-[11px] text-[#D9D9D9]/60">
            {location.formatted} &bull; Todos los derechos reservados &copy; 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
