import React from "react";
import Image from "next/image";

interface IsotypeProps {
  className?: string;
  size?: number;
  withFrame?: boolean;
}

/**
 * LOGIK LAB Official Isotipo Autónomo (Manual de Identidad Visual v1.0 / 2026)
 * Dos elementos separados: barra vertical blanca y ángulo azul (#075FFF) de vértice izquierdo.
 */
export const Isotype: React.FC<IsotypeProps> = ({
  className = "",
  size = 48,
  withFrame = false,
}) => {
  const src = withFrame ? "/brand/isotype-black.png" : "/brand/isotype.png";
  const width = withFrame ? Math.round(size * (2048 / 1152)) : size;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: `${width}px`, height: `${size}px` }}
    >
      <Image
        src={src}
        alt="LOGIK LAB Isotipo Autónomo"
        width={width}
        height={size}
        className="h-full w-auto object-contain"
      />
    </div>
  );
};
