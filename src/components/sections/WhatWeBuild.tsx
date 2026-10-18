"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CardSpotlight } from "@/components/ui/CardSpotlight";
import {
  Layers,
  UsersRound,
  Truck,
  Globe2,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

const CAPABILITIES = [
  {
    tag: "01 // OPERACIONES",
    title: "Sistemas de Gestión Operativa (ERP)",
    description: "Inventarios, producción y tesorería alineados a tu lógica específica.",
    icon: <Layers className="w-6 h-6 text-[#1154FF]" />,
    cols: "md:col-span-2 lg:col-span-2",
    features: ["Inventario en tiempo real", "Trazabilidad total", "Métricas ejecutivas"],
  },
  {
    tag: "02 // COMERCIAL",
    title: "CRMs y Cotizadores",
    description: "Embudos de venta B2B y cotizaciones automatizadas en 1 clic.",
    icon: <UsersRound className="w-6 h-6 text-[#1154FF]" />,
    cols: "md:col-span-1 lg:col-span-1",
    features: ["Generación de PDFs", "Seguimiento ágil"],
  },
  {
    tag: "03 // LOGÍSTICA",
    title: "Despacho y Rutas",
    description: "Monitoreo de órdenes y sincronización con transportistas sin llamadas.",
    icon: <Truck className="w-6 h-6 text-[#1154FF]" />,
    cols: "md:col-span-1 lg:col-span-1",
    features: ["Confirmación digital", "Estados en vivo"],
  },
  {
    tag: "04 // AUTOSERVICIO",
    title: "Portales Clientes / Proveedores",
    description: "Descarga de facturas, pedidos y certificados 24/7 de forma segura.",
    icon: <Globe2 className="w-6 h-6 text-[#1154FF]" />,
    cols: "md:col-span-1 lg:col-span-1",
    features: ["Descarga de archivos", "Roles y permisos"],
  },
  {
    tag: "05 // INTEGRACIÓN",
    title: "APIs y Conectores Críticos",
    description: "Conexión con pasarelas de pago, facturación electrónica y WhatsApp API.",
    icon: <Cpu className="w-6 h-6 text-[#1154FF]" />,
    cols: "md:col-span-1 lg:col-span-1",
    features: ["Webhooks en vivo", "Cero duplicidad"],
  },
];

export const WhatWeBuild: React.FC = () => {
  return (
    <section id="que-hacemos" className="py-24 sm:py-32 relative bg-[#01040F] overflow-hidden">
      {/* Background radial blue glow */}
      <div className="absolute top-1/3 left-10 w-[600px] h-[500px] bg-[#1154FF]/20 blur-[150px] rounded-full pointer-events-none" />

      {/* Blue neon divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1154FF]/60 to-transparent shadow-[0_0_15px_#1154FF]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          tag="QUÉ CONSTRUIMOS"
          title="Soluciones de software que eliminan cuellos de botella."
          description="Ecosistemas digitales que multiplican tu volumen transaccional sin inflar tus costos fijos."
        />

        {/* Bento Grid with Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={cap.cols}
            >
              <CardSpotlight
                className="p-8 h-full flex flex-col justify-between border-[#1154FF]/30 bg-gradient-to-b from-[#061442]/70 via-[#030B24]/85 to-[#01040F] hover:border-[#1154FF] shadow-[0_4px_30px_-5px_rgba(17,84,255,0.25)] group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-xl bg-[#1154FF]/20 border border-[#1154FF]/40 text-[#1154FF] group-hover:bg-[#1154FF] group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(17,84,255,0.4)]">
                      {cap.icon}
                    </div>
                    <span className="font-mono text-xs text-[#6095FF] tracking-wider font-bold">
                      {cap.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight leading-snug mb-3">
                    {cap.title}
                  </h3>

                  <p className="text-base text-[#D9D9D9]/80 leading-relaxed font-normal mb-6">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1154FF]/20 flex flex-wrap items-center gap-2">
                  {cap.features.map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      className="inline-flex items-center text-xs font-mono px-3 py-1 rounded-md bg-[#1154FF]/10 text-[#7BA6FF] border border-[#1154FF]/25 font-semibold"
                    >
                      &bull; {feat}
                    </span>
                  ))}
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
