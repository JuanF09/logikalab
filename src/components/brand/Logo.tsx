import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  height?: number;
  priority?: boolean;
  variant?: "short" | "full";
}

/**
 * LOGIK LAB Official Logotipo (Manual de Identidad Visual v1.0 / 2026)
 * - variant="short": Logotipo abreviado (Logik) — 1024 x 295 (~3.47 : 1) para cabeceras y barra de navegación.
 * - variant="full": Firma principal (Logik SOFTWARE ENGINEERING LAB) — 754 x 254 (~2.97 : 1) para portadas y cierres.
 */
export const Logo: React.FC<LogoProps> = ({
  className = "",
  height = 34,
  priority = true,
  variant = "short",
}) => {
  const isFull = variant === "full";
  const src = isFull ? "/brand/logo-full.png" : "/brand/logo.png";
  const ratio = isFull ? 754 / 254 : 1024 / 295;
  const width = Math.round(height * ratio);

  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      <Image
        src={src}
        alt="LOGIK LAB — Software Engineering"
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ maxHeight: `${height}px` }}
      />
    </div>
  );
};
