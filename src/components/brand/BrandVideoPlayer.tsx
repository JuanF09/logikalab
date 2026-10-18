"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  Sparkles,
  Film,
  Code2,
} from "lucide-react";

interface Milestone {
  time: number;
  label: string;
  sub: string;
}

const MILESTONES: Milestone[] = [
  {
    time: 0,
    label: "00:00 // Isotipo {LK} LAB",
    sub: "Estructura modular compacta de identidad.",
  },
  {
    time: 2.2,
    label: "00:02 // Apertura de Corchetes",
    sub: "Expansión del contenedor geométrico { }.",
  },
  {
    time: 5.0,
    label: "00:05 // Revelación Tipográfica",
    sub: "LOGIKA LAB &bull; Software Engineering en alta precisión.",
  },
];

export const BrandVideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(9);
  const [showControls, setShowControls] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-play on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Modern browsers require muted for autoplay
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 9);
    }
  };

  const togglePlay = () => {
    setHasInteracted(true);
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setHasInteracted(true);
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (time: number) => {
    setHasInteracted(true);
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
    if (!isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    handleSeek(0);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current && !videoRef.current) return;
    const isFs = document.fullscreenElement || (document as any).webkitFullscreenElement;
    if (!isFs) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {
          (videoRef.current as any)?.webkitEnterFullscreen?.();
        });
      } else if ((videoRef.current as any)?.webkitEnterFullscreen) {
        (videoRef.current as any).webkitEnterFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };

  const handleTimelineInteraction = (clientX: number, target: HTMLDivElement) => {
    const rect = target.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newTime = (clickX / rect.width) * duration;
    handleSeek(newTime);
  };

  const formatTime = (secs: number) => {
    const s = Math.floor(secs);
    const ms = Math.floor((secs % 1) * 10);
    return `00:0${s}.${ms}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* Cinematic Frame Container */}
      <div
        ref={containerRef}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(true)}
        onTouchStart={() => setShowControls(true)}
        className="relative w-full rounded-2xl sm:rounded-3xl border-2 border-[#1154FF]/60 bg-[#020719] shadow-[0_0_80px_rgba(17,84,255,0.45)] overflow-hidden group select-none"
      >
        {/* Dynamic Backlight Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1154FF]/20 via-[#003BDE]/30 to-[#1154FF]/20 blur-3xl opacity-70 pointer-events-none" />

        {/* Video Aspect 16:9 Container */}
        <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            src="/brand/video-logika-lab.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Top HUD Telemetry Overlay */}
          <div className="absolute top-0 left-0 right-0 p-3 sm:p-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent flex items-center justify-between text-[11px] sm:text-xs font-mono pointer-events-none z-20">
            <div className="flex items-center gap-1.5 sm:gap-2 truncate max-w-[65%]">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1154FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1154FF]"></span>
              </span>
              <span className="text-white font-bold tracking-wider truncate">
                LOGIKA LAB // REEL OFICIAL
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#1154FF]/30 border border-[#1154FF] text-[#6095FF] text-[9px] sm:text-[10px] font-bold">
                16:9 &bull; HD
              </span>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-white/10 text-white text-[10px] font-semibold border border-white/20">
                #1154FF AZUL VÍVIDO
              </span>
            </div>
          </div>

          {/* Big Center Play/Pause Indicator on hover/pause */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1154FF]/90 hover:bg-[#1154FF] text-white flex items-center justify-center shadow-[0_0_50px_#1154FF] transition-all transform hover:scale-110 z-20"
              aria-label="Reproducir video"
            >
              <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white ml-1" />
            </button>
          )}

          {/* Bottom Custom Futuristic Controls Bar */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-3 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-20 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {/* Timeline Progress Bar (Clickable & Touch Scrubber) */}
            <div
              onClick={(e) => handleTimelineInteraction(e.clientX, e.currentTarget)}
              onTouchMove={(e) => {
                if (e.touches.length > 0) {
                  handleTimelineInteraction(e.touches[0].clientX, e.currentTarget);
                }
              }}
              className="relative w-full h-3 sm:h-2.5 rounded-full bg-white/20 hover:h-3.5 transition-all cursor-pointer overflow-hidden border border-white/20 mb-3"
            >
              <div
                className="h-full bg-gradient-to-r from-[#1154FF] via-[#5C8DFF] to-white rounded-full shadow-[0_0_15px_#1154FF] transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between text-white font-mono text-xs">
              {/* Left: Play/Pause, Restart, Time */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 sm:p-2 rounded-xl bg-white/10 hover:bg-[#1154FF] border border-white/20 text-white transition-all active:scale-95 min-w-[36px] min-h-[36px] flex items-center justify-center"
                  aria-label={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 fill-white" />
                  )}
                </button>

                <button
                  onClick={handleRestart}
                  className="p-2 sm:p-2 rounded-xl bg-white/10 hover:bg-[#1154FF] border border-white/20 text-white transition-all active:scale-95 min-w-[36px] min-h-[36px] flex items-center justify-center"
                  title="Reiniciar reproducción"
                  aria-label="Reiniciar video"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <div className="text-[11px] sm:text-xs text-[#D9D9D9] font-bold tracking-wider pl-1">
                  <span className="text-white">{formatTime(currentTime)}</span>
                  <span className="text-white/40"> / </span>
                  <span className="text-[#6095FF]">00:09.0</span>
                </div>
              </div>

              {/* Right: Sound Toggle, Fullscreen */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={toggleMute}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all active:scale-95 ${
                    isMuted
                      ? "bg-white/10 border-white/20 text-[#D9D9D9] hover:bg-white/20"
                      : "bg-[#1154FF] border-[#1154FF] text-white shadow-[0_0_20px_#1154FF]"
                  }`}
                  aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-red-400" />
                      <span className="hidden sm:inline text-[11px] font-bold">Sin Audio</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-white animate-pulse" />
                      <span className="hidden sm:inline text-[11px] font-bold">Audio Activo</span>
                    </>
                  )}
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-xl bg-white/10 hover:bg-[#1154FF] border border-white/20 text-white transition-all active:scale-95"
                  title="Pantalla completa"
                  aria-label="Pantalla completa"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Milestones Grid: Clickable Chapters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {MILESTONES.map((m, idx) => {
          const isActive =
            currentTime >= m.time &&
            (idx === MILESTONES.length - 1 || currentTime < MILESTONES[idx + 1].time);

          return (
            <button
              key={idx}
              onClick={() => handleSeek(m.time)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                isActive
                  ? "bg-gradient-to-r from-[#1154FF]/30 to-[#040C2B] border-[#1154FF] shadow-[0_0_25px_rgba(17,84,255,0.4)]"
                  : "bg-[#040A22]/70 border-white/10 hover:border-white/30"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#1154FF] shadow-[0_0_10px_#1154FF]" />
              )}
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`font-mono text-xs font-extrabold ${
                    isActive ? "text-[#1154FF]" : "text-[#D9D9D9]/80"
                  }`}
                >
                  {m.label}
                </span>
                {isActive && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1154FF] text-white font-bold">
                    REPRODUCIENDO
                  </span>
                )}
              </div>
              <p className="text-xs text-[#D9D9D9]/90 font-normal leading-snug">
                {m.sub}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
