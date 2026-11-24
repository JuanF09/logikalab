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
    blue: "text-[#075FFF] border-[#075FFF]/35 bg-[#075FFF]/10",
    neutral: "text-[#B4B4B4] border-white/15 bg-white/5",
    subtle: "text-[#B4B4B4] border-white/10 bg-transparent",
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
          <span className="text-[#075FFF] opacity-90 font-bold">[</span>
          <span className="px-1 text-white/95">{children}</span>
          <span className="text-[#075FFF] opacity-90 font-bold">]</span>
        </>
      ) : (
        children
      )}
    </span>
  );
};
