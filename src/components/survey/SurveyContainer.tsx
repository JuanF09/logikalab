"use client";

import React, { useState, useEffect, useRef } from "react";
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
  TrendingUp,
  Lock,
  Share2,
  Copy,
  Check,
  X,
  Download,
  Clock,
  DollarSign,
  AlertTriangle,
  Building2,
  Users,
  Layers,
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
  const [rawSubmissions, setRawSubmissions] = useState<SurveySubmission[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  // Validation & Scroll States
  const [unansweredQuestionIds, setUnansweredQuestionIds] = useState<number[]>([]);
  const [phaseErrorMsg, setPhaseErrorMsg] = useState<string | null>(null);
  const [privacyError, setPrivacyError] = useState<string | null>(null);

  // References for reliable auto-scrolling to top on phase transition
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const topQuestionnaireRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (topQuestionnaireRef.current) {
      topQuestionnaireRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Scroll to top whenever the section or tab changes
  useEffect(() => {
    scrollToTop();
  }, [currentSectionIdx, activeTab]);

  // Load real responses from Supabase (with localStorage fallback)
  useEffect(() => {
    async function loadData() {
      // 1. Try Supabase cloud database first
      const supabaseData = await fetchSurveyFromSupabase();
      if (supabaseData.length > 0) {
        setRawSubmissions(supabaseData);
        setStatsData(computeRealStats(supabaseData));
        return;
      }

      // 2. Fallback to localStorage if Supabase has 0 rows or is offline
      try {
        const stored = localStorage.getItem("logika_lab_survey_responses");
        if (stored) {
          const parsed: SurveySubmission[] = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRawSubmissions(parsed);
            setStatsData(computeRealStats(parsed));
            return;
          }
        }
      } catch {
        // Ignore localStorage error
      }

      // 3. Otherwise strictly ZERO_STATS (all 0s when no responses exist)
      setRawSubmissions([]);
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
    setUnansweredQuestionIds((prev) => prev.filter((id) => id !== questionId));

    if (questionId === 18) {
      if (value.startsWith("Sí")) {
        setPrivacyError(null);
        setPhaseErrorMsg(null);
      } else {
        setPrivacyError(
          "Debes autorizar el tratamiento de datos personales para que la respuesta pueda ser enviada."
        );
      }
    }
  };

  // Rigorous validation of the current section before advancing
  const validateCurrentSection = (): boolean => {
    const missingIds: number[] = [];
    setPhaseErrorMsg(null);
    setPrivacyError(null);

    for (const q of sectionQuestions) {
      const ans = answers[q.id];
      if (q.type === "text") {
        if (!ans || ans.trim().length === 0) {
          missingIds.push(q.id);
        }
      } else if (q.type === "legal") {
        if (!ans || !ans.startsWith("Sí")) {
          missingIds.push(q.id);
          setPrivacyError(
            "Debes autorizar el tratamiento de datos personales para que la respuesta pueda ser enviada."
          );
        }
      } else {
        if (!ans || ans.trim().length === 0) {
          missingIds.push(q.id);
        }
      }
    }

    if (missingIds.length > 0) {
      setUnansweredQuestionIds(missingIds);
      const firstMissing = missingIds[0];

      if (firstMissing === 18 || missingIds.includes(18)) {
        setPhaseErrorMsg(
          "Debes autorizar el tratamiento de datos personales para que la respuesta pueda ser enviada."
        );
      } else {
        setPhaseErrorMsg(
          `Por favor responde todas las preguntas de esta fase para continuar (falta responder la pregunta ${firstMissing}).`
        );
      }

      // Smooth scroll to the first missing question
      setTimeout(() => {
        const el = document.getElementById(`question-card-${firstMissing}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 60);

      return false;
    }

    setUnansweredQuestionIds([]);
    setPhaseErrorMsg(null);
    setPrivacyError(null);
    return true;
  };

  const handleNextSection = () => {
    if (!validateCurrentSection()) {
      return;
    }

    if (currentSectionIdx < SURVEY_SECTIONS.length - 1) {
      setCurrentSectionIdx((prev) => prev + 1);
      setTimeout(scrollToTop, 60);
    } else {
      handleSubmit();
    }
  };

  const handlePrevSection = () => {
    if (currentSectionIdx > 0) {
      setCurrentSectionIdx((prev) => prev - 1);
      setUnansweredQuestionIds([]);
      setPhaseErrorMsg(null);
      setPrivacyError(null);
      setTimeout(scrollToTop, 60);
    }
  };

  const handleSubmit = async () => {
    // Final check for legal terms
    if (!answers[18] || !answers[18].startsWith("Sí")) {
      setPrivacyError(
        "Debes autorizar el tratamiento de datos personales para que la respuesta pueda ser enviada."
      );
      setPhaseErrorMsg(
        "Debes autorizar el tratamiento de datos personales para que la respuesta pueda ser enviada."
      );
      const el = document.getElementById("question-card-18");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

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
      setRawSubmissions(parsed);
      setStatsData(computeRealStats(parsed));
    } catch {
      // Ignore localStorage failure
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    setShowCompletionPopup(true);
    setTimeout(scrollToTop, 60);
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

  // Export all survey responses to CSV with UTF-8 BOM for Microsoft Excel / SPSS
  const handleExportCSV = () => {
    if (rawSubmissions.length === 0) {
      alert("Aún no hay respuestas registradas para exportar.");
      return;
    }

    const headers = [
      "ID_Registro",
      "Timestamp",
      "Nombre_Completo",
      "Empresa_o_Proyecto",
      "Sector_Industria",
      "Rol_Principal",
      "Rango_Edad",
      "P1_Problema_Critico",
      "P2_Mayor_Frustracion_Tecnologia",
      "P3_Herramientas_Operacion_Actuales",
      "P4_Horas_Perdidas_Semana",
      "P5_Preferencia_Medida_vs_Generico",
      "P6_Prioridad_Numero_Uno",
      "P7_Tiempo_Espera_Dispuesto",
      "P8_Formato_Avances",
      "P9_Acompanamiento_PosEntrega",
      "P10_Modelo_Pago_Preferido",
      "P11_Disposicion_Pagar_Presupuesto",
      "P12_Barrera_Inversion",
      "P18_Autorizacion_Habeas_Data",
    ];

    const escapeCSV = (val: string | undefined | null) => {
      if (!val) return '""';
      const clean = String(val).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = rawSubmissions.map((s, idx) => {
      const a = s.answers || {};
      return [
        escapeCSV(String(idx + 1)),
        escapeCSV(s.timestamp),
        escapeCSV(a[13] || "Anónimo"),
        escapeCSV(a[14] || ""),
        escapeCSV(a[15] || ""),
        escapeCSV(a[16] || ""),
        escapeCSV(a[17] || ""),
        escapeCSV(a[1] || s.otherText || ""),
        escapeCSV(a[2] || ""),
        escapeCSV(a[3] || ""),
        escapeCSV(a[4] || ""),
        escapeCSV(a[5] || ""),
        escapeCSV(a[6] || ""),
        escapeCSV(a[7] || ""),
        escapeCSV(a[8] || ""),
        escapeCSV(a[9] || ""),
        escapeCSV(a[10] || ""),
        escapeCSV(a[11] || ""),
        escapeCSV(a[12] || ""),
        escapeCSV(a[18] || "Autorizado"),
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `logika_lab_encuesta_sustentacion_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            Diagnóstico de procesos y arquitectura de software para empresas y proyectos.
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
            title="Copiar enlace directo de la encuesta"
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
      <div
        ref={scrollContainerRef}
        className={`p-4 sm:p-8 space-y-6 touch-scroll-container ${standalone ? "" : "max-h-[calc(100dvh-130px)] sm:max-h-[75vh] overflow-y-auto"}`}
      >
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
                  className="px-3 py-1.5 rounded-lg bg-[#1154FF] hover:bg-[#2B68FF] text-white text-xs font-mono font-bold shrink-0 transition-all flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("stats")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#040C2B] border border-[#1154FF]/50 hover:bg-[#1154FF]/20 text-white font-bold text-sm transition-all min-h-[44px]"
                >
                  <BarChart3 className="w-4 h-4 text-[#1154FF]" />
                  <span>Ver Resultados Globales</span>
                </button>

                <a
                  href={getWhatsAppUrl(
                    "Hola Juan David, acabo de completar la encuesta de LOGIKA LAB y me gustaría coordinar un diagnóstico técnico para mi negocio."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all min-h-[44px]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Agendar Diagnóstico en WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            /* Step by Step Questionnaire */
            <div ref={topQuestionnaireRef}>
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
                {sectionQuestions.map((q) => {
                  const isUnanswered = unansweredQuestionIds.includes(q.id);
                  const isLegalAlert = q.type === "legal" && (privacyError !== null || answers[q.id] === "No autorizo.");

                  return (
                    <div
                      key={q.id}
                      id={`question-card-${q.id}`}
                      className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] ${
                        isLegalAlert
                          ? "border-red-500/80 bg-red-500/10 shadow-[0_0_25px_rgba(239,68,68,0.35)]"
                          : isUnanswered
                          ? "border-amber-400/80 bg-amber-500/10 shadow-[0_0_25px_rgba(245,158,11,0.3)]"
                          : "border-[#1154FF]/25 bg-[#020719]/80"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                        <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                          {q.question}
                        </h4>
                        {isUnanswered && q.type !== "legal" && (
                          <span className="shrink-0 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>RESPUESTA PENDIENTE</span>
                          </span>
                        )}
                        {isLegalAlert && (
                          <span className="shrink-0 px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>AUTORIZACIÓN REQUERIDA</span>
                          </span>
                        )}
                      </div>

                      {/* Text Input Type */}
                      {q.type === "text" && (
                        <div>
                          <input
                            type="text"
                            value={answers[q.id] || ""}
                            onChange={(e) => handleSelectOption(q.id, e.target.value)}
                            placeholder={
                              q.id === 14
                                ? "Nombre de tu empresa o idea (ej. Mi Empresa / Independiente)"
                                : "Escribe tu respuesta aquí..."
                            }
                            className={`w-full px-4 py-3 rounded-xl bg-[#040C2B] border text-white placeholder-white/25 text-base focus:border-[#1154FF] focus:ring-2 focus:ring-[#1154FF]/50 outline-none transition-all ${
                              isUnanswered ? "border-amber-400 ring-1 ring-amber-400/50" : "border-[#1154FF]/40"
                            }`}
                          />
                          {q.id === 14 && (
                            <span className="block text-[11px] text-[#D9D9D9]/60 font-mono mt-1.5">
                              * Si aún no tienes empresa formalmente constituida, puedes escribir el nombre de tu proyecto o &quot;Independiente&quot;.
                            </span>
                          )}
                        </div>
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

                      {/* Role & Industry Cards Type */}
                      {(q.type === "role" || q.type === "industry") && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {q.options?.map((opt) => {
                            const isSelected = answers[q.id] === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleSelectOption(q.id, opt)}
                                className={`p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${
                                  isSelected
                                    ? "bg-[#1154FF]/25 border-[#1154FF] text-white shadow-[0_0_15px_rgba(17,84,255,0.4)]"
                                    : "bg-[#040C2B] border-[#1154FF]/30 text-[#D9D9D9] hover:border-[#1154FF]"
                                }`}
                              >
                                <span className="font-medium pr-2 leading-snug">{opt}</span>
                                <span
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
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
                            validación de mercado e investigación técnica de ingeniería de software,
                            garantizando la total confidencialidad de tu información conforme a la normativa vigente.
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
                                        : "bg-red-500/25 text-red-300 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                                      : "bg-[#040C2B] border-[#1154FF]/30 text-[#D9D9D9] hover:border-[#1154FF]"
                                  }`}
                                >
                                  {legalOpt}
                                </button>
                              );
                            })}
                          </div>

                          {/* Explicit warning if "No autorizo" or if privacyError exists */}
                          {(answers[q.id] === "No autorizo." || privacyError) && (
                            <div className="p-4 rounded-xl bg-red-500/20 border-2 border-red-500/60 text-xs sm:text-sm text-red-200 font-mono flex items-start gap-3 shadow-[0_0_25px_rgba(239,68,68,0.3)] animate-in fade-in">
                              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                              <div>
                                <strong className="block font-bold text-white mb-0.5">
                                  Autorización obligatoria para enviar la respuesta:
                                </strong>
                                Para que tu encuesta pueda ser registrada en la base de datos de LOGIKA LAB y forme parte de nuestro estudio de ingeniería de software, es indispensable marcar <strong>&quot;Sí, autorizo el tratamiento de mis datos personales&quot;</strong>. Si marcas &quot;No autorizo&quot;, la respuesta no podrá ser enviada.
                              </div>
                            </div>
                          )}
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
                  );
                })}
              </div>

              {/* Validation Warning Alert Banner if any question was skipped */}
              {(phaseErrorMsg || privacyError) && (
                <div className="p-4 rounded-xl bg-amber-500/20 border-2 border-amber-500/50 text-xs sm:text-sm text-amber-200 font-mono flex items-start gap-3 shadow-[0_0_20px_rgba(245,158,11,0.25)] animate-in fade-in mt-6">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-white mb-0.5">Atención:</strong>
                    <span>{phaseErrorMsg || privacyError}</span>
                  </div>
                </div>
              )}

              {/* Section Navigation Buttons */}
              <div className="pt-6 border-t border-[#1154FF]/30 flex flex-col-reverse xs:flex-row items-center justify-between gap-3 sm:gap-4 mt-6">
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
                  className="w-full xs:w-auto inline-flex items-center justify-center gap-1.5 px-7 py-3 rounded-xl bg-[#1154FF] hover:bg-[#2B68FF] text-white text-xs font-mono font-bold shadow-[0_0_20px_#1154FF] transition-all min-h-[44px]"
                >
                  <span>
                    {isSubmitting
                      ? "Finalizando..."
                      : currentSectionIdx === SURVEY_SECTIONS.length - 1
                      ? "Finalizar Encuesta"
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
            <div className="p-6 rounded-2xl border-2 border-[#1154FF]/50 bg-gradient-to-r from-[#1154FF]/20 via-[#061442] to-[#01040F] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-[0_0_40px_rgba(17,84,255,0.3)]">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-[#1154FF] font-bold uppercase tracking-widest">
                    // DATOS REALES EN VIVO &bull; SUPABASE POSTGRESQL
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#1154FF]/20 text-white border border-[#1154FF]/40 font-bold">
                    {statsData.totalResponses === 0 ? "N = 0 REGISTROS (EN ESPERA)" : `N = ${statsData.totalResponses} RESPUESTAS TABULADAS`}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {statsData.totalResponses}{" "}
                  {statsData.totalResponses === 1
                    ? "Respuesta Registrada"
                    : "Respuestas Registradas"}
                </h3>
                <p className="text-xs text-[#D9D9D9]/80 mt-1 max-w-xl">
                  {statsData.totalResponses === 0
                    ? "Base de datos en estado inicial (0 respuestas). Cada métrica se actualizará automáticamente en tiempo real con datos empíricos conforme los participantes completen el formulario."
                    : "Métricas cuantitativas calculadas estrictamente sobre respuestas reales guardadas en la base de datos de LOGIKA LAB."}
                </p>
              </div>

              {/* Action and Key KPI Block */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                {/* Export CSV Button for Thesis Defense */}
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#040C2B] border border-[#1154FF]/60 hover:bg-[#1154FF]/25 hover:border-white text-white text-xs font-mono font-bold shadow-[0_0_15px_rgba(17,84,255,0.3)] transition-all active:scale-95 shrink-0"
                  title="Exportar base de datos completa de respuestas a archivo CSV para Excel/SPSS"
                >
                  <Download className="w-4 h-4 text-[#1154FF]" />
                  <span>Descargar Datos (.CSV)</span>
                </button>

                <div className="p-4 rounded-xl bg-[#040C2B] border border-[#1154FF]/60 text-white font-mono text-center shrink-0 shadow-[0_0_20px_rgba(17,84,255,0.4)]">
                  <div className="text-3xl font-black text-[#1154FF]">
                    {statsData.customVsGeneric.custom}%
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white">
                    Prefiere 100% a Medida
                  </div>
                </div>
              </div>
            </div>

            {/* Chart 1: 100% a la Medida vs. Rápido Genérico (P5) */}
            <div className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#020719]/90">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#1154FF]" />
                  <span>Preferencia de Plataforma: Medida vs. Genérico</span>
                </h4>
                <span className="text-xs font-mono text-[#1154FF] font-bold">Pregunta 5</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-white font-semibold">100% a la Medida (Adaptado exactamente a la operación)</span>
                    <span className="text-[#1154FF] font-bold">
                      {statsData.customVsGeneric.custom}% ({statsData.customVsGeneric.customCount} votos)
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
                      {statsData.customVsGeneric.generic}% ({statsData.customVsGeneric.genericCount} votos)
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

            {/* Grid: Herramientas Actuales (P3) y Horas Perdidas (P4) - Validación del Problema */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Herramientas Actuales */}
              <div className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#020719]/90">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#1154FF]" />
                    <span>Herramientas de Operación Actuales</span>
                  </h4>
                  <span className="text-xs font-mono text-[#1154FF] font-bold">Pregunta 3</span>
                </div>
                <div className="space-y-3.5">
                  {statsData.currentTools.map((t, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-[#D9D9D9] pr-2 truncate">{t.label}</span>
                        <span className="text-white font-bold shrink-0">
                          {t.percentage}% ({t.count})
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden border border-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-[#1154FF] to-[#6095FF] rounded-full transition-all duration-500"
                          style={{ width: `${t.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Horas Perdidas en Tareas Manuales */}
              <div className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#020719]/90">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1154FF]" />
                    <span>Horas Semanales Perdidas en Procesos Manuales</span>
                  </h4>
                  <span className="text-xs font-mono text-[#1154FF] font-bold">Pregunta 4</span>
                </div>
                <div className="space-y-3.5">
                  {statsData.timeLostWeekly.map((h, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-[#D9D9D9]">{h.label}</span>
                        <span className="text-white font-bold">
                          {h.percentage}% ({h.count})
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden border border-white/10">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-[#1154FF] rounded-full transition-all duration-500"
                          style={{ width: `${h.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chart: Top Cuellos de Botella (P1) */}
            <div className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#020719]/90">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#1154FF]" />
                  <span>Problemas Críticos Más Urgentes a Resolver</span>
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

            {/* Chart: Disposición a Pagar / Rango de Inversión (P11) - Validación Financiera */}
            <div className="p-6 rounded-2xl border-2 border-[#1154FF]/40 bg-gradient-to-b from-[#040C2B] to-[#020719]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Disposición a Pagar / Rango de Inversión Razonable</span>
                </h4>
                <span className="text-xs font-mono text-[#1154FF] font-bold">Pregunta 11</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {statsData.willingnessToPay.map((wtp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#01040F] border border-[#1154FF]/30 flex flex-col justify-between">
                    <div className="text-xs text-[#D9D9D9] font-medium mb-3 leading-snug">
                      {wtp.label}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className="text-lg font-black text-emerald-400 font-mono">
                        {wtp.percentage}%
                      </span>
                      <span className="text-xs font-mono text-[#D9D9D9]/70">
                        {wtp.count} {wtp.count === 1 ? "empresa" : "empresas"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grid: Modelo de Pago (P10) y Barreras de Inversión (P12) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Payment Preference */}
              <div className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#020719]/90">
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-4">
                  // MODALIDAD DE COBRO PREFERIDA (P. 10)
                </h4>
                <div className="space-y-3.5">
                  {statsData.paymentPreference.map((p, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#040C2B] border border-[#1154FF]/30">
                      <div className="flex items-center justify-between text-sm font-bold text-white mb-1">
                        <span className="text-emerald-400">{p.percentage}%</span>
                        <span className="text-xs font-mono text-[#6095FF]">
                          ({p.count} {p.count === 1 ? "voto" : "votos"})
                        </span>
                      </div>
                      <div className="text-xs text-[#D9D9D9]/80 leading-snug">{p.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment Barriers */}
              <div className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#020719]/90">
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-4">
                  // PRINCIPAL BARRERA PARA INVERTIR (P. 12)
                </h4>
                <div className="space-y-3.5">
                  {statsData.investmentBarriers.map((b, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#040C2B] border border-[#1154FF]/30">
                      <div className="flex items-center justify-between text-sm font-bold text-white mb-1">
                        <span className="text-amber-400">{b.percentage}%</span>
                        <span className="text-xs font-mono text-[#6095FF]">
                          ({b.count} {b.count === 1 ? "voto" : "votos"})
                        </span>
                      </div>
                      <div className="text-xs text-[#D9D9D9]/80 leading-snug">{b.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid: Sectores (P15) y Roles (P16) - Caracterización de Muestra */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Industry Distribution */}
              <div className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#020719]/90">
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#1154FF]" />
                  <span>Sectores Económicos de la Muestra (P. 15)</span>
                </h4>
                <div className="space-y-2.5">
                  {statsData.industryDistribution.map((ind, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-mono py-1.5 border-b border-white/5">
                      <span className="text-[#D9D9D9] truncate pr-2">{ind.label}</span>
                      <span className="text-[#1154FF] font-bold shrink-0">
                        {ind.percentage}% ({ind.count})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Role Distribution */}
              <div className="p-6 rounded-2xl border border-[#1154FF]/30 bg-[#020719]/90">
                <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#1154FF]" />
                  <span>Roles de los Tomadores de Decisión (P. 16)</span>
                </h4>
                <div className="space-y-2.5">
                  {statsData.roleDistribution.map((r, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs font-mono py-2 border-b border-white/5">
                      <span className="text-[#D9D9D9]">{r.label}</span>
                      <span className="text-emerald-400 font-bold">
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
