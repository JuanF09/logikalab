"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Menu, X, ArrowUpRight, ClipboardList } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config";
import { SurveyModal } from "@/components/survey/SurveyModal";

const NAV_LINKS = [
  { label: "Marca & Reel", href: "#marca" },
  { label: "CEO & Liderazgo", href: "#fundador" },
  { label: "Qué hacemos", href: "#que-hacemos" },
  { label: "Solución", href: "#solucion" },
  { label: "Método", href: "#metodo" },
  { label: "Stack", href: "#stack" },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#01040F]/90 backdrop-blur-md border-b border-[#1154FF]/30 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with blue glow */}
        <Link
          href="/"
          className="group focus-visible:ring-2 focus-visible:ring-[#1154FF] rounded-md outline-none relative"
          aria-label="LOGIKA LAB Inicio"
        >
          <div className="absolute -inset-2 bg-[#1154FF]/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <Logo height={36} priority />
        </Link>

        {/* Desktop Navigation Anchors */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#D9D9D9]/80"
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors duration-200 tracking-tight hover:underline underline-offset-8 decoration-[#1154FF] decoration-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons: Encuesta & Hablemos */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            onClick={() => setIsSurveyOpen(true)}
            variant="outline"
            size="sm"
            icon={<ClipboardList className="w-3.5 h-3.5 text-[#1154FF]" />}
            iconPosition="left"
            className="border-[#1154FF]/50 bg-[#061442]/60 hover:bg-[#1154FF]/20 hover:border-[#1154FF] text-white font-semibold shadow-sm"
          >
            Encuesta
          </Button>

          <Button
            href={getWhatsAppUrl()}
            isExternal
            variant="primary"
            size="sm"
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            className="shadow-[0_0_20px_#1154FF]"
          >
            Hablemos
          </Button>
        </div>

        {/* Mobile Hamburger Toggle & Encuesta */}
        <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setIsSurveyOpen(true)}
            className="min-h-[44px] min-w-[44px] px-2.5 py-2 text-xs font-semibold rounded-xl border border-[#1154FF]/50 bg-[#061442]/80 text-white flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm"
            aria-label="Abrir encuesta de validación"
            title="Encuesta de Validación"
          >
            <ClipboardList className="w-4 h-4 text-[#1154FF]" />
            <span className="hidden xs:inline text-[11px]">Encuesta</span>
          </button>

          <Button
            href={getWhatsAppUrl()}
            isExternal
            variant="primary"
            size="sm"
            className="min-h-[44px] px-3 py-2 text-xs font-semibold shadow-[0_0_15px_#1154FF]"
          >
            Hablemos
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#D9D9D9] hover:text-white rounded-xl border border-[#1154FF]/40 bg-[#061442]/60 hover:bg-[#1154FF]/20 active:scale-95 transition-all"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with AnimatePresence */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-0 h-[100dvh] bg-[#01040F]/98 backdrop-blur-3xl z-50 flex flex-col justify-between p-6 pt-20 overflow-y-auto touch-scroll-container">
          {/* Top Close bar inside full-height drawer */}
          <div className="absolute top-4 left-6 right-6 flex items-center justify-between pb-3 border-b border-[#1154FF]/25">
            <Logo height={30} />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center text-white rounded-xl border border-[#1154FF]/40 bg-[#061442]/80 active:scale-95 transition-all"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <span className="font-mono text-xs text-[#1154FF] font-bold tracking-widest uppercase">
              // MENÚ &bull; LOGIKA LAB
            </span>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl sm:text-2xl font-extrabold text-white hover:text-[#1154FF] active:text-[#1154FF] transition-colors py-2 tracking-tight min-h-[44px] flex items-center border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pb-8 border-t border-white/10 pt-5">
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSurveyOpen(true);
              }}
              variant="outline"
              size="lg"
              className="w-full min-h-[48px] border-[#1154FF] text-white"
            >
              Realizar Encuesta de Validación
            </Button>
            <Button
              href={getWhatsAppUrl()}
              isExternal
              variant="primary"
              size="lg"
              className="w-full min-h-[48px] shadow-[0_0_25px_#1154FF]"
            >
              WhatsApp Directo con Juan David
            </Button>
          </div>
        </div>
      )}

      {/* Survey Modal Dialog */}
      <SurveyModal
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
      />
    </header>
  );
};
