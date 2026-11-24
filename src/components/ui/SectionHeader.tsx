import React from "react";
import { Badge } from "./Badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  tag: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  tag,
  title,
  description,
  align = "left",
  className,
}) => {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl mb-12 sm:mb-16",
        isCenter ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <div className={cn("mb-4", isCenter && "flex justify-center")}>
        <Badge variant="blue">{tag}</Badge>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-[1.15]">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-[18px] text-[#B4B4B4] leading-[1.5] font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
