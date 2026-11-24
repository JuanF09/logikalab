"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Menu, X, ArrowUpRight, ClipboardList } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config";
import { SurveyModal } from "@/components/survey/SurveyModal";

const NAV_LINKS = [
  { label: "Identidad", href: "#marca" },
  { label: "CEO & Liderazgo", href: "#fundador" },
  { label: "Soluciones", href: "#que-hacemos" },
  { label: "Enfoque", href: "#solucion" },
  { label: "Proceso", href: "#metodo" },
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
          ? "bg-[#000000]/90 backdrop-blur-md border-b border-[#075FFF]/30 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo Abreviado (Logik) with X=10% safe breathing space */}
        <Link
          href="/"
          className="group focus-visible:ring-2 focus-visible:ring-[#075FFF] rounded-md outline-none relative py-1"
          aria-label="LOGIK LAB Inicio"
        >
          <div className="absolute -inset-2 bg-[#075FFF]/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <Logo height={32} variant="short" priority />
        </Link>

        {/* Desktop Navigation Anchors (Inter Medium 500) */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#B4B4B4]"
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors duration-200 tracking-tight hover:underline underline-offset-8 decoration-[#075FFF] decoration-2"
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
            icon={<ClipboardList className="w-3.5 h-3.5 text-[#075FFF]" />}
            iconPosition="left"
            className="border-[#075FFF]/50 bg-[#000000]/80 hover:bg-[#075FFF]/20 hover:border-[#075FFF] text-white font-semibold shadow-sm"
          >
            Encuesta
          </Button>

          <Button
            href={getWhatsAppUrl()}
            isExternal
            variant="primary"
            size="sm"
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            className="shadow-[0_0_20px_rgba(7,95,255,0.6)]"
          >
            Contacto
          </Button>
        </div>

        {/* Mobile Hamburger Toggle & Encuesta */}
        <div className="flex md:hidden items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setIsSurveyOpen(true)}
            className="min-h-[44px] min-w-[44px] px-2.5 py-2 text-xs font-semibold rounded-xl border border-[#075FFF]/50 bg-[#000000]/90 text-white flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm"
            aria-label="Abrir encuesta de validación"
            title="Encuesta de Validación"
          >
            <ClipboardList className="w-4 h-4 text-[#075FFF]" />
            <span className="hidden xs:inline text-[11px]">Encuesta</span>
          </button>

          <Button
            href={getWhatsAppUrl()}
            isExternal
            variant="primary"
            size="sm"
            className="min-h-[44px] px-3 py-2 text-xs font-semibold shadow-[0_0_15px_#075FFF]"
          >
            Contacto
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#B4B4B4] hover:text-white rounded-xl border border-[#075FFF]/40 bg-[#000000]/80 hover:bg-[#075FFF]/20 active:scale-95 transition-all"
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-0 h-[100dvh] bg-[#000000]/98 backdrop-blur-3xl z-50 flex flex-col justify-between p-6 pt-20 overflow-y-auto touch-scroll-container">
          <div className="absolute top-4 left-6 right-6 flex items-center justify-between pb-3 border-b border-[#075FFF]/25">
            <Logo height={28} variant="short" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center text-white rounded-xl border border-[#075FFF]/40 bg-[#000000] active:scale-95 transition-all"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <span className="font-mono text-xs text-[#075FFF] font-bold tracking-widest uppercase">
              // MENÚ &bull; LOGIK LAB
            </span>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl sm:text-2xl font-extrabold text-white hover:text-[#075FFF] active:text-[#075FFF] transition-colors py-2 tracking-tight min-h-[44px] flex items-center border-b border-white/10"
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
              className="w-full min-h-[48px] border-[#075FFF] text-white"
            >
              Realizar Encuesta de Validación
            </Button>
            <Button
              href={getWhatsAppUrl()}
              isExternal
              variant="primary"
              size="lg"
              className="w-full min-h-[48px] shadow-[0_0_25px_#075FFF]"
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
