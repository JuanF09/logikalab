"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { InteractiveTechCard, TechItem } from "@/components/ui/InteractiveTechCard";
import {
  NextjsLogo,
  TypeScriptLogo,
  PostgreSQLLogo,
  SupabaseLogo,
  VercelLogo,
  NodejsLogo,
  TailwindLogo,
  DockerLogo,
} from "@/components/brand/TechLogos";
import { Sparkles, Terminal } from "lucide-react";

const TECHNOLOGIES: TechItem[] = [
  {
    name: "Next.js",
    category: "Full-Stack Framework",
    desc: "Renderizado híbrido (SSR/SSG), optimización edge y compilación ultra veloz con Turbopack.",
    brandColor: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.45)",
    spec: "v15.2 • ACTIVE",
    telemetry: "Turbopack // Edge SSR",
    logo: <NextjsLogo className="w-8 h-8" />,
  },
  {
    name: "TypeScript",
    category: "Type Safety",
    desc: "Tipado estricto en tiempo de compilación. Elimina el 98% de errores en producción y refactorizaciones.",
    brandColor: "#3178C6",
    glowColor: "rgba(49, 120, 198, 0.55)",
    spec: "STRICT • 0 ERRORS",
    telemetry: "Zero Any // 100% Typed",
    logo: <TypeScriptLogo className="w-8 h-8" />,
  },
  {
    name: "PostgreSQL",
    category: "Relational Database",
    desc: "Bases de datos normalizadas, transacciones ACID estrictas, consultas indexadas y soberanía absoluta de datos.",
    brandColor: "#336791",
    glowColor: "rgba(51, 103, 145, 0.55)",
    spec: "ACID • POOL ACTIVE",
    telemetry: "High Concurrency // SQL",
    logo: <PostgreSQLLogo className="w-8 h-8" />,
  },
  {
    name: "Supabase",
    category: "Backend & Auth",
    desc: "Infraestructura PostgreSQL en la nube, autenticación por roles (RBAC) y seguridad Row Level Security (RLS).",
    brandColor: "#3ECF8E",
    glowColor: "rgba(62, 207, 142, 0.55)",
    spec: "RLS • ENTERPRISE",
    telemetry: "Edge Auth // Storage",
    logo: <SupabaseLogo className="w-8 h-8" />,
  },
  {
    name: "Vercel",
    category: "Edge Cloud",
    desc: "Despliegue serverless global de baja latencia con CDN distribuida y 99.99% de disponibilidad en producción.",
    brandColor: "#FFFFFF",
    glowColor: "rgba(255, 255, 255, 0.45)",
    spec: "99.99% SLA • EDGE",
    telemetry: "< 15ms Latency // Global",
    logo: <VercelLogo className="w-8 h-8" />,
  },
  {
    name: "Node.js",
    category: "Runtime Engine",
    desc: "Entorno asíncrono no bloqueante de alta velocidad para microservicios, APIs REST y tareas en segundo plano.",
    brandColor: "#5FA04E",
    glowColor: "rgba(95, 160, 78, 0.55)",
    spec: "v22.x LTS • FAST",
    telemetry: "Event Loop // Workers",
    logo: <NodejsLogo className="w-8 h-8" />,
  },
  {
    name: "Tailwind CSS",
    category: "Design System",
    desc: "Sistema de diseño atómico y tipográfico compilado a medida. Cero sobrecarga de CSS y máxima fluidez visual.",
    brandColor: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.55)",
    spec: "ZERO RUNTIME",
    telemetry: "Atomic Tokens // GPU Accel",
    logo: <TailwindLogo className="w-8 h-8" />,
  },
  {
    name: "Docker & APIs",
    category: "Container & Connectors",
    desc: "Contenedores OCI portátiles para entornos reproducibles, microservicios aislados y orquestación continua.",
    brandColor: "#2496ED",
    glowColor: "rgba(36, 150, 237, 0.55)",
    spec: "OCI • ISOLATED",
    telemetry: "REST & Webhooks // CI/CD",
    logo: <DockerLogo className="w-8 h-8" />,
  },
];

export const Stack: React.FC = () => {
  return (
    <section id="stack" className="py-24 sm:py-32 relative bg-[#01040F] overflow-hidden">
      {/* Background radial blue glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[750px] h-[550px] bg-[#1154FF]/20 blur-[170px] rounded-full pointer-events-none" />

      {/* Blue neon divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1154FF]/60 to-transparent shadow-[0_0_15px_#1154FF]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          tag="STACK TECNOLÓGICO"
          title="Herramientas de clase mundial. Cero tecnología obsoleta."
          description="La misma base tecnológica probada por Stripe, Linear, Vercel y Uber para operar con máxima velocidad, seguridad transaccional y sin caídas."
        />

        {/* Status Callout Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 mb-8 rounded-2xl border border-[#1154FF]/30 bg-[#061442]/50 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1154FF] animate-ping" />
            <span className="text-white font-bold tracking-wider">
              ECOSISTEMA NATIVO // 8 NÚCLEOS TECNOLÓGICOS ACTIVOS
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#D9D9D9]/80">
            <Terminal className="w-3.5 h-3.5 text-[#1154FF]" />
            <span>Toca o pasa el cursor sobre cada tarjeta para activar la telemetría 3D</span>
          </div>
        </div>

        {/* Tech Grid with Interactive 3D Physics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {TECHNOLOGIES.map((tech, idx) => (
            <InteractiveTechCard key={tech.name} tech={tech} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
