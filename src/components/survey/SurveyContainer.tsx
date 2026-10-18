"use client";

import React, { useState, useEffect } from "react";
import {
  SURVEY_QUESTIONS,
  SURVEY_SECTIONS,
  ZERO_STATS,
  computeRealStats,
  StatsBreakdown,
  SurveySubmission,
} from "./surveyData";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  ClipboardList,
  MessageSquare,
  TrendingUp,
  Lock,
  Share2,
  Copy,
  Check,
  X,
  RotateCcw,
} from "lucide-react";
import { getWhatsAppUrl, SITE_CONFIG } from "@/lib/config";
import {
  saveSurveyToSupabase,
  fetchSurveyFromSupabase,
} from "@/lib/supabase";

interface SurveyContainerProps {
  standalone?: boolean;
  onClose?: () => void;
}

export const SurveyContainer: React.FC<SurveyContainerProps> = ({
  standalone = false,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"survey" | "stats">("survey");
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [otherText, setOtherText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);
  const [statsData, setStatsData] = useState<StatsBreakdown>(ZERO_STATS);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load real responses from Supabase (with localStorage fallback)
  useEffect(() => {
    async function loadData() {
      // 1. Try Supabase cloud database first
      const supabaseData = await fetchSurveyFromSupabase();
      if (supabaseData.length > 0) {
        setStatsData(computeRealStats(supabaseData));
        return;
      }

      // 2. Fallback to localStorage if Supabase has 0 rows or is offline
      try {
        const stored = localStorage.getItem("logika_lab_survey_responses");
        if (stored) {
          const parsed: SurveySubmission[] = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setStatsData(computeRealStats(parsed));
            return;
          }
        }
      } catch {
        // Ignore localStorage error
      }

      // 3. Otherwise strictly ZERO_STATS (all 0s when no responses exist)
      setStatsData(ZERO_STATS);
    }

    loadData();
  }, []);

  // Filter questions by active section
  const sectionQuestions = SURVEY_QUESTIONS.filter(
    (q) => q.sectionNumber === ["I", "II", "III", "IV"][currentSectionIdx]
  );

  const handleSelectOption = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNextSection = () => {
    if (currentSectionIdx < SURVEY_SECTIONS.length - 1) {
      setCurrentSectionIdx((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevSection = () => {
    if (currentSectionIdx > 0) {
      setCurrentSectionIdx((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const submission: SurveySubmission = {
      timestamp: new Date().toISOString(),
      answers,
      otherText,
    };

    // 1. Save to Supabase Cloud Database asynchronously
    try {
      await saveSurveyToSupabase(submission);
    } catch {
      // Ignore Supabase network failure
    }

    // 2. Save to localStorage for instant client persistence
    try {
      const stored = localStorage.getItem("logika_lab_survey_responses") || "[]";
      const parsed: SurveySubmission[] = JSON.parse(stored);
      parsed.push(submission);
      localStorage.setItem("logika_lab_survey_responses", JSON.stringify(parsed));
      setStatsData(computeRealStats(parsed));
    } catch {
      // Ignore localStorage failure
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    setShowCompletionPopup(true);
  };

  // Copy or share the standalone survey link
  const handleShareSurvey = async () => {
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/encuesta`
        : "https://logikalab.com/encuesta";

    const shareData = {
      title: "Encuesta de Validación Operativa | LOGIKA LAB",
      text: "Participa en el estudio de validación de ingeniería de software y arquitectura tecnológica de LOGIKA LAB.",
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative w-full text-white flex flex-col h-full">
      {/* Header Bar */}
      <div className="p-4 sm:p-7 border-b border-[#1154FF]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 bg-[#01040F]/80 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#1154FF] font-bold tracking-widest uppercase">
              // LOGIKA LAB &bull; SOFTWARE ENGINEERING
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1154FF]/20 text-white border border-[#1154FF]/40 font-bold">
              VALIDACIÓN 2026
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-white mt-1">
            Encuesta de Validación Operativa
          </h2>
          <p className="text-xs text-[#D9D9D9]/75 mt-0.5">
            Información confidencial para perfilar soluciones tecnológicas exactas.
          </p>
        </div>

        {/* Top Actions: Tabs + Share + Close */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          {/* Share Survey Link Button */}
          <button
            onClick={handleShareSurvey}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono font-bold transition-all active:scale-95 min-h-[38px] ${
              copiedLink
                ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : "bg-[#040C2B] border-[#1154FF]/50 text-white hover:bg-[#1154FF]/20 hover:border-[#1154FF]"
            }`}
            title="Copiar enlace directo de la encuesta para compartir en redes sociales"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#1154FF]" />
                <span className="hidden xs:inline">Compartir</span>
                <span className="xs:hidden">Link</span>
              </>
            )}
          </button>

          {/* Tab Selector */}
          <div className="flex items-center rounded-xl bg-[#020719] p-1 border border-[#1154FF]/30 text-xs font-mono">
            <button
              onClick={() => setActiveTab("survey")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all min-h-[36px] ${
                activeTab === "survey"
                  ? "bg-[#1154FF] text-white font-bold shadow-[0_0_12px_#1154FF]"
                  : "text-[#D9D9D9]/70 hover:text-white"
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Encuesta</span>
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all min-h-[36px] ${
                activeTab === "stats"
                  ? "bg-[#1154FF] text-white font-bold shadow-[0_0_12px_#1154FF]"
                  : "text-[#D9D9D9]/70 hover:text-white"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Estadísticas</span>
            </button>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="w-10 h-10 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:border-[#1154FF] hover:bg-[#1154FF]/20 text-white transition-all active:scale-95"
              aria-label="Cerrar ventana"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Body Area */}
      <div className={`p-4 sm:p-8 space-y-6 touch-scroll-container ${standalone ? "" : "max-h-[calc(100dvh-130px)] sm:max-h-[75vh] overflow-y-auto"}`}>
        {activeTab === "survey" ? (
          isSubmitted ? (
            /* Success / Results Screen */
            <div className="py-10 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#1154FF]/20 border-2 border-[#1154FF] flex items-center justify-center shadow-[0_0_40px_#1154FF]">
                <CheckCircle2 className="w-10 h-10 text-white animate-bounce" />
              </div>

              <div className="max-w-lg mx-auto">
                <h3 className="text-3xl font-black text-white tracking-tight">
                  ¡Respuestas Registradas con Éxito!
                </h3>
                <p className="text-sm text-[#D9D9D9]/85 mt-2 leading-relaxed">
                  Tus datos fueron procesados para el estudio de validación de LOGIKA LAB.
                  Agradecemos tu tiempo y contribución al análisis técnico de ingeniería de software.
                </p>
              </div>

              {/* Direct Link Share Banner */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#040C2B] border border-[#1154FF]/40 text-left flex items-center justify-between gap-3 shadow-md">
                <div className="truncate">
                  <div className="text-[11px] font-mono text-[#1154FF] font-bold uppercase">
                    ENLACE PÚBLICO DE LA ENCUESTA
                  </div>
                  <div className="text-xs text-[#D9D9D9] font-mono truncate">
                    {typeof window !== "undefined"
                      ? `${window.location.origin}/encuesta`
                      : "https://logikalab.com/encuesta"}
                  </div>
                </div>
                <button
                  onClick={handleShareSurvey}
                  className="px-3 py-2 rounded-xl bg-[#1154FF] hover:bg-[#2B68FF] text-white text-xs font-mono font-bold shrink-0 transition-all active:scale-95"
                >
                  {copiedLink ? "¡Copiado!" : "Copiar"}
                </button>
              </div>

              {/* Simple action to close or return to home */}
              <div className="pt-2 flex items-center justify-center gap-3 max-w-xs mx-auto">
                {onClose ? (
                  <button
                    onClick={onClose}
                    className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#1154FF] hover:bg-[#2B68FF] text-white font-bold text-sm shadow-[0_0_20px_#1154FF] transition-all min-h-[44px]"
                  >
                    <span>Cerrar</span>
                  </button>
                ) : (
                  <a
                    href="/"
                    className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#1154FF] hover:bg-[#2B68FF] text-white font-bold text-sm shadow-[0_0_20px_#1154FF] transition-all min-h-[44px]"
                  >
                    <span>Volver a LOGIKA LAB</span>
                  </a>
                )}
              </div>
            </div>
          ) : (
            /* Step by Step Questionnaire */
            <div>
              {/* Progress Indicators */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-[#1154FF] font-bold">
                    FASE {currentSectionIdx + 1} DE {SURVEY_SECTIONS.length}:{" "}
                    <span className="text-white">
                      {SURVEY_SECTIONS[currentSectionIdx].title}
                    </span>
                  </span>
                  <span className="text-[#D9D9D9]/70">
                    {Math.round(((currentSectionIdx + 1) / SURVEY_SECTIONS.length) * 100)}% Completado
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-[#020719] border border-[#1154FF]/30 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#1154FF] to-white transition-all duration-500 shadow-[0_0_10px_#1154FF]"
                    style={{
                      width: `${((currentSectionIdx + 1) / SURVEY_SECTIONS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question List for Current Section */}
              <div className="space-y-8">
                {sectionQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#1154FF]/25 bg-[#020719]/80 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                  >
                    <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 leading-snug">
                      {q.question}
                    </h4>

                    {/* Text Input Type */}
                    {q.type === "text" && (
                      <input
                        type="text"
                        value={answers[q.id] || ""}
                        onChange={(e) => handleSelectOption(q.id, e.target.value)}
                        placeholder="Escribe tu respuesta aquí..."
                        className="w-full px-4 py-3 rounded-xl bg-[#040C2B] border border-[#1154FF]/40 text-white placeholder-white/20 text-base focus:border-[#1154FF] focus:ring-2 focus:ring-[#1154FF]/50 outline-none transition-all"
                      />
                    )}

                    {/* Age Pills Type */}
                    {q.type === "age" && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {q.options?.map((ageOpt) => {
                          const isSelected = answers[q.id] === ageOpt;
                          return (
                            <button
                              key={ageOpt}
                              type="button"
                              onClick={() => handleSelectOption(q.id, ageOpt)}
                              className={`py-3 px-4 rounded-xl border text-sm font-mono font-bold transition-all ${
                                isSelected
                                  ? "bg-[#1154FF] text-white border-white shadow-[0_0_15px_#1154FF]"
                                  : "bg-[#040C2B] border-[#1154FF]/30 text-[#D9D9D9] hover:border-[#1154FF]"
                              }`}
                            >
                              {ageOpt} años
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Role Cards Type */}
                    {q.type === "role" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {q.options?.map((roleOpt) => {
                          const isSelected = answers[q.id] === roleOpt;
                          return (
                            <button
                              key={roleOpt}
                              type="button"
                              onClick={() => handleSelectOption(q.id, roleOpt)}
                              className={`p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${
                                isSelected
                                  ? "bg-[#1154FF]/25 border-[#1154FF] text-white shadow-[0_0_15px_rgba(17,84,255,0.4)]"
                                  : "bg-[#040C2B] border-[#1154FF]/30 text-[#D9D9D9] hover:border-[#1154FF]"
                              }`}
                            >
                              <span className="font-medium">{roleOpt}</span>
                              <span
                                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                                  isSelected
                                    ? "border-white bg-[#1154FF]"
                                    : "border-white/30 bg-transparent"
                                }`}
                              >
                                {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Legal Authorization Type */}
                    {q.type === "legal" && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs text-[#D9D9D9]/80 font-mono leading-relaxed">
                          <div className="flex items-center gap-1.5 text-[#1154FF] font-bold mb-1">
                            <Lock className="w-3.5 h-3.5" />
                            <span>CLÁUSULA DE PRIVACIDAD &bull; HABEAS DATA</span>
                          </div>
                          Al seleccionar &quot;Sí, autorizo&quot;, confirmas que aceptas de manera libre,
                          previa y expresa que los datos suministrados en este formulario sean recopilados,
                          almacenados y tratados con el único propósito de realizar análisis estadísticos,
                          validación de mercado y perfilamiento comercial, garantizando la total
                          confidencialidad y seguridad de tu información conforme a la normativa vigente.
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          {q.options?.map((legalOpt) => {
                            const isSelected = answers[q.id] === legalOpt;
                            const isYes = legalOpt.startsWith("Sí");
                            return (
                              <button
                                key={legalOpt}
                                type="button"
                                onClick={() => handleSelectOption(q.id, legalOpt)}
                                className={`p-3.5 rounded-xl border text-sm font-semibold flex-1 transition-all ${
                                  isSelected
                                    ? isYes
                                      ? "bg-[#1154FF] text-white border-white shadow-[0_0_20px_#1154FF]"
                                      : "bg-red-500/20 text-red-300 border-red-500"
                                    : "bg-[#040C2B] border-[#1154FF]/30 text-[#D9D9D9] hover:border-[#1154FF]"
                                }`}
                              >
                                {legalOpt}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Standard Single Choice Options */}
                    {q.type === "single" && (
                      <div className="space-y-2.5">
                        {q.options?.map((opt, optIdx) => {
                          const isSelected = answers[q.id] === opt;
                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectOption(q.id, opt)}
                              className={`w-full p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between group ${
                                isSelected
                                  ? "bg-[#1154FF]/25 border-[#1154FF] text-white shadow-[0_0_20px_rgba(17,84,255,0.4)]"
                                  : "bg-[#040C2B] border-[#1154FF]/30 text-[#D9D9D9] hover:border-[#1154FF]/70 hover:bg-[#1154FF]/10"
                              }`}
                            >
                              <span className="font-medium pr-3 leading-snug">{opt}</span>
                              <span
                                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? "border-white bg-[#1154FF]"
                                    : "border-white/30 bg-transparent group-hover:border-[#1154FF]"
                                }`}
                              >
                                {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                              </span>
                            </button>
                          );
                        })}

                        {/* Allow "Otro" write-in if question supports it */}
                        {q.allowOther && (
                          <div className="pt-2">
                            <label className="block text-xs font-mono text-[#D9D9D9]/70 mb-1">
                              Otro problema específico (opcional):
                            </label>
                            <input
                              type="text"
                              value={otherText}
                              onChange={(e) => {
                                setOtherText(e.target.value);
                                handleSelectOption(q.id, `Otro: ${e.target.value}`);
                              }}
                              placeholder="Describe brevemente tu situación..."
                              className="w-full px-4 py-3 rounded-xl bg-[#040C2B] border border-[#1154FF]/30 text-white placeholder-white/20 text-base focus:border-[#1154FF] outline-none"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Section Navigation Buttons */}
              <div className="pt-6 border-t border-[#1154FF]/30 flex flex-col-reverse xs:flex-row items-center justify-between gap-3 sm:gap-4">
                <button
                  type="button"
                  disabled={currentSectionIdx === 0}
                  onClick={handlePrevSection}
                  className="w-full xs:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-[#D9D9D9] text-xs font-mono font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[44px]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleNextSection}
                  className="w-full xs:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-xl bg-[#1154FF] hover:bg-[#2B68FF] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-mono font-bold shadow-[0_0_25px_#1154FF] transition-all min-h-[44px]"
                >
                  <span>
                    {isSubmitting
                      ? "Finalizando..."
                      : currentSectionIdx === SURVEY_SECTIONS.length - 1
                      ? "Finalizar"
                      : "Siguiente Fase"}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        ) : (
          /* Live Statistics & Analytics Dashboard */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Banner Metric */}
            <div className="p-6 rounded-2xl border-2 border-[#1154FF]/50 bg-gradient-to-r from-[#1154FF]/20 via-[#061442] to-[#01040F] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_40px_rgba(17,84,255,0.3)]">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-[#1154FF] font-bold uppercase tracking-widest">
                    // DATOS REALES EN VIVO
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1154FF]/20 text-white border border-[#1154FF]/40 font-bold">
                    {statsData.totalResponses === 0 ? "0 REGISTROS (EN ESPERA)" : `${statsData.totalResponses} REGISTROS REALES`}
                  </span>
                  {statsData.totalResponses > 0 && (
                    <button
                      onClick={() => {
                        localStorage.removeItem("logika_lab_survey_responses");
                        setStatsData(ZERO_STATS);
                      }}
                      className="text-[10px] font-mono text-red-400 hover:text-red-300 underline transition-colors ml-2"
                      title="Eliminar respuestas locales de prueba"
                    >
                      [Restablecer a 0]
                    </button>
                  )}
                </div>
                <h3 className="text-2xl font-black text-white mt-1">
                  {statsData.totalResponses}{" "}
                  {statsData.totalResponses === 1
                    ? "Empresa / Respuesta Registrada"
                    : "Empresas / Respuestas Registradas"}
                </h3>
                <p className="text-xs text-[#D9D9D9]/80 mt-1">
                  {statsData.totalResponses === 0
                    ? "Por el momento no hay datos registrados en el sistema. Todas las cifras se muestran estrictamente en 0 hasta recibir la primera respuesta."
                    : "Métricas calculadas exclusivamente con datos reales tabulados en el sistema."}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#040C2B] border border-[#1154FF]/60 text-white font-mono text-center shrink-0 shadow-[0_0_20px_rgba(17,84,255,0.4)]">
                <div className="text-3xl font-black text-[#1154FF]">
                  {statsData.customVsGeneric.custom}%
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white">
                  Prefiere 100% a Medida
                </div>
              </div>
            </div>

            {/* Chart 1: 100% a la Medida vs. Rápido Genérico */}
            <div className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#020719]/90">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#1154FF]" />
                  <span>Preferencia de Plataforma: Medida vs. Genérico</span>
                </h4>
                <span className="text-xs font-mono text-[#1154FF] font-bold">Pregunta 4</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-white font-semibold">100% a la Medida (Adaptado al negocio)</span>
                    <span className="text-[#1154FF] font-bold">
                      {statsData.customVsGeneric.custom}% ({statsData.customVsGeneric.customCount} respuestas)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-black/60 overflow-hidden border border-[#1154FF]/30">
                    <div
                      className="h-full bg-gradient-to-r from-[#1154FF] to-white rounded-full shadow-[0_0_12px_#1154FF] transition-all duration-500"
                      style={{ width: `${statsData.customVsGeneric.custom}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#D9D9D9]/70">Rápido y Genérico (Plantilla prefabricada)</span>
                    <span className="text-[#D9D9D9]/70 font-bold">
                      {statsData.customVsGeneric.generic}% ({statsData.customVsGeneric.genericCount} respuestas)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-black/60 overflow-hidden border border-white/10">
                    <div
                      className="h-full bg-white/40 rounded-full transition-all duration-500"
                      style={{ width: `${statsData.customVsGeneric.generic}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 2: Top Cuellos de Botella */}
            <div className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#020719]/90">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#1154FF]" />
                  <span>Problemas Más Urgentes a Resolver</span>
                </h4>
                <span className="text-xs font-mono text-[#1154FF] font-bold">Pregunta 1</span>
              </div>

              <div className="space-y-4">
                {statsData.topBottlenecks.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="text-[#D9D9D9]">{item.label}</span>
                      <span className="text-white font-bold">
                        {item.percentage}% ({item.count} {item.count === 1 ? "voto" : "votos"})
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-black/50 overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-[#1154FF] via-[#5C8DFF] to-white rounded-full transition-all duration-700 shadow-[0_0_10px_#1154FF]"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 3 & 4 Grid: Payment Preference & Roles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Payment Preference */}
              <div className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#020719]/90">
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-4">
                  // PREFERENCIA DE PAGO (P. 9)
                </h4>
                <div className="space-y-3.5">
                  {statsData.paymentPreference.map((p, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#040C2B] border border-[#1154FF]/30">
                      <div className="flex items-center justify-between text-sm font-bold text-white mb-1">
                        <span>{p.percentage}%</span>
                        <span className="text-xs font-mono text-[#6095FF]">
                          ({p.count} {p.count === 1 ? "voto" : "votos"})
                        </span>
                      </div>
                      <div className="text-xs text-[#D9D9D9]/80 leading-snug">{p.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Role Distribution */}
              <div className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#020719]/90">
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-4">
                  // PERFIL DE LOS ENCUESTADOS (P. 16)
                </h4>
                <div className="space-y-3">
                  {statsData.roleDistribution.map((r, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-mono py-2 border-b border-white/10">
                      <span className="text-[#D9D9D9]">{r.label}</span>
                      <span className="text-[#1154FF] font-bold">
                        {r.percentage}% ({r.count})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Emerging Confirmation Popup Modal */}
      {showCompletionPopup && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#020719] border-2 border-[#1154FF] p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(17,84,255,0.6)] overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#1154FF]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#1154FF]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Glowing Animated Icon */}
            <div className="relative w-20 h-20 mx-auto rounded-full bg-[#1154FF]/20 border-2 border-[#1154FF] flex items-center justify-center shadow-[0_0_35px_#1154FF] mb-5">
              <CheckCircle2 className="w-10 h-10 text-white animate-pulse" />
            </div>

            {/* Status Badge */}
            <div className="inline-block px-3 py-1 rounded-full bg-[#1154FF]/20 border border-[#1154FF]/40 text-[#6095FF] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
              // REGISTRO CONFIRMADO
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              ¡Encuesta Finalizada con Éxito!
            </h3>

            <p className="text-sm text-[#D9D9D9]/85 leading-relaxed mb-6">
              Tu respuesta ha sido registrada y guardada exitosamente en el sistema de LOGIKA LAB. Agradecemos tu tiempo y contribución a nuestro estudio de ingeniería de software.
            </p>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => {
                setShowCompletionPopup(false);
                if (onClose) {
                  onClose();
                }
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1154FF] hover:bg-[#2B68FF] text-white font-bold text-sm shadow-[0_0_25px_#1154FF] transition-all active:scale-95 min-h-[46px]"
            >
              <span>Aceptar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
