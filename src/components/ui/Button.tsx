import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  isExternal = false,
  icon,
  iconPosition = "right",
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 rounded-md gap-1.5 tracking-wide",
    md: "text-sm px-5 py-2.5 rounded-lg gap-2 tracking-normal",
    lg: "text-base px-7 py-3.5 rounded-lg gap-2.5 tracking-tight font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-[#1154FF] text-white hover:bg-[#2B68FF] active:scale-[0.98] shadow-[0_0_20px_-3px_rgba(17,84,255,0.45)] hover:shadow-[0_0_30px_-2px_rgba(17,84,255,0.6)] border border-[#3E7BFF]/50",
    outline:
      "bg-transparent text-white border border-white/15 hover:border-[#1154FF] hover:bg-[#1154FF]/10 active:scale-[0.98] transition-colors",
    ghost:
      "bg-transparent text-[#D9D9D9] hover:text-white hover:bg-white/5 active:scale-[0.98]",
    link: "bg-transparent text-[#1154FF] hover:text-[#3B7BFF] underline-offset-4 hover:underline p-0",
  };

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};
