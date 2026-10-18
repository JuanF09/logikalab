"use client";

import React, { useEffect } from "react";
import { SurveyContainer } from "./SurveyContainer";

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SurveyModal: React.FC<SurveyModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape key & lock scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Heavy Backdrop with blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#01040F]/90 backdrop-blur-2xl transition-opacity animate-in fade-in duration-300"
      />

      {/* Ambient Blue Backlight */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-[#1154FF]/25 blur-[170px] rounded-full pointer-events-none" />

      {/* Main Modal Card */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border-2 border-[#1154FF]/40 bg-gradient-to-b from-[#061442] via-[#030A24] to-[#01040F] shadow-[0_0_80px_rgba(17,84,255,0.45)] overflow-hidden z-10 text-white">
        <SurveyContainer onClose={onClose} />
      </div>
    </div>
  );
};
