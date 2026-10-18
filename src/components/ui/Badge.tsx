import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "neutral" | "subtle";
  withBrackets?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "blue",
  withBrackets = true,
  className,
}) => {
  const variantStyles = {
    blue: "text-[#1154FF] border-[#1154FF]/30 bg-[#1154FF]/10",
    neutral: "text-[#D9D9D9] border-white/15 bg-white/5",
    subtle: "text-[#888899] border-white/10 bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-[11px] sm:text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border select-none transition-colors duration-200",
        variantStyles[variant],
        className
      )}
    >
      {withBrackets ? (
        <>
          <span className="text-[#1154FF] opacity-80 font-bold">&#123;</span>
          <span className="px-1 text-white/90">{children}</span>
          <span className="text-[#1154FF] opacity-80 font-bold">&#125;</span>
        </>
      ) : (
        children
      )}
    </span>
  );
};
