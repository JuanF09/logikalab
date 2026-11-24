import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/config";
import { ArrowUp, MapPin, MessageSquare } from "lucide-react";

export const Footer: React.FC = () => {
  const { location, year, brandName, tagline, founder } = SITE_CONFIG;

  return (
    <footer className="border-t border-[#075FFF]/30 bg-[#000000] text-[#B4B4B4] py-16 relative overflow-hidden">
      {/* Background subtle blue glow */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-[#075FFF]/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* Col 1: Brand Full Signature (Firma Principal) & Founder */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="mb-5">
              <Logo height={56} variant="full" />
            </Link>
            <p className="text-sm text-[#B4B4B4] max-w-sm leading-relaxed mb-4">
              Firma de ingeniería de software a la medida y estudio de producto digital.
              Liderada por <strong className="text-white">{founder.name}</strong>, {founder.profession} &amp; {founder.role}.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-white">
              <MapPin className="w-3.5 h-3.5 text-[#075FFF]" />
              <span>{location.formatted}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3">
            <div className="font-mono text-xs text-[#075FFF] font-bold tracking-widest uppercase mb-4">
              // ARQUITECTURA
            </div>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a
                  href="#que-hacemos"
                  className="hover:text-white focus-visible:text-[#075FFF] focus-visible:underline outline-none transition-colors text-[#B4B4B4]"
                >
                  Qué construimos
                </a>
              </li>
              <li>
                <a
                  href="#solucion"
                  className="hover:text-white focus-visible:text-[#075FFF] focus-visible:underline outline-none transition-colors text-[#B4B4B4]"
                >
                  Solución &bull; Antes y Después
                </a>
              </li>
              <li>
                <a
                  href="#marca"
                  className="hover:text-white focus-visible:text-[#075FFF] focus-visible:underline outline-none transition-colors text-[#B4B4B4]"
                >
                  Sistema de Identidad Visual 2026
                </a>
              </li>
              <li>
                <a
                  href="#por-que-logika"
                  className="hover:text-white focus-visible:text-[#075FFF] focus-visible:underline outline-none transition-colors text-[#B4B4B4]"
                >
                  Por qué LOGIK LAB
                </a>
              </li>
              <li>
                <a
                  href="#metodo"
                  className="hover:text-white focus-visible:text-[#075FFF] focus-visible:underline outline-none transition-colors text-[#B4B4B4]"
                >
                  Método de 4 Fases
                </a>
              </li>
              <li>
                <a
                  href="#fundador"
                  className="hover:text-white focus-visible:text-[#075FFF] focus-visible:underline outline-none transition-colors text-[#B4B4B4]"
                >
                  CEO &bull; Juan David Figueroa
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct WhatsApp Action */}
          <div className="md:col-span-4">
            <div className="font-mono text-xs text-[#075FFF] font-bold tracking-widest uppercase mb-4">
              // CANAL DIRECTO
            </div>
            <p className="text-sm text-[#B4B4B4] leading-relaxed mb-4">
              Diseñamos alrededor de tu operación. Ecosistemas de software full-stack sobre bases de datos relacionales normalizadas.
            </p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex sm:inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#075FFF] text-white text-xs font-mono font-bold shadow-[0_0_20px_rgba(7,95,255,0.6)] hover:bg-[#075FFF] transition-all min-h-[44px]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chatear por WhatsApp ({SITE_CONFIG.contact.whatsappDisplay})</span>
            </a>

            <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span>SISTEMAS OPERATIVOS // 100% ONLINE</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#B4B4B4] text-center sm:text-left">
          <div>
            &copy; {year} {brandName} &middot; {tagline}. Todos los derechos reservados.
          </div>

          <a
            href="#hero"
            aria-label="Volver arriba"
            className="flex items-center gap-1.5 text-[#B4B4B4] hover:text-white transition-colors min-h-[44px]"
          >
            <span>SUBIR</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#075FFF]" />
          </a>
        </div>
      </div>
    </footer>
  );
};
