import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  height?: number;
  priority?: boolean;
}

/**
 * LOGIKA LAB Official Logotipo
 * Utiliza el activo oficial extraído directamente del manual de identidad de marca,
 * adaptado a modo oscuro con transparencia alfa limpia.
 */
export const Logo: React.FC<LogoProps> = ({
  className = "",
  height = 36,
  priority = true,
}) => {
  // Proporción original del activo extraído: 1642 x 447 (~ 3.67 : 1)
  const width = Math.round(height * (1642 / 447));

  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      <Image
        src="/brand/logo.png"
        alt="LOGIKA LAB — Software Engineering"
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ maxHeight: `${height}px` }}
      />
    </div>
  );
};
