import React from "react";
import Image from "next/image";

interface IsotypeProps {
  className?: string;
  size?: number;
  withBrackets?: boolean;
}

/**
 * LOGIKA LAB Official Isotipo: { K } LAB
 */
export const Isotype: React.FC<IsotypeProps> = ({
  className = "",
  size = 48,
  withBrackets = true,
}) => {
  const src = withBrackets ? "/brand/isotype.png" : "/brand/isotype-clean.png";
  // Proporción aproximada
  const width = withBrackets ? Math.round(size * (983 / 775)) : Math.round(size * (593 / 747));

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: `${width}px`, height: `${size}px` }}
    >
      <Image
        src={src}
        alt="LOGIKA LAB Isotipo"
        width={width}
        height={size}
        className="h-full w-auto object-contain"
      />
    </div>
  );
};
