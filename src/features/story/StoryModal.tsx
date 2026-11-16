import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { StoryModalProps, StorySlide } from './types';
import { getStoryScript } from './storyData';
import { sound } from '../../lib/sound';
import { storySpeech } from './storySpeech';
import { useDialogFocus } from '../../hooks/useDialogFocus';

function buildSlideSpeechText(slide: StorySlide): string {
  const parts: string[] = [];
  parts.push(slide.headline);
  if (slide.subheadline) {
    parts.push(slide.subheadline);
  }
  const cleanBody = slide.body.replace(/[*_#`]/g, '');
  parts.push(cleanBody);

  if (slide.highlight) {
    const cleanHighlight = slide.highlight.text.replace(/[*_#`]/g, '');
    parts.push(`${slide.highlight.label}: ${cleanHighlight}`);
  }

  if (slide.reflectionPrompt) {
    const cleanPrompt = slide.reflectionPrompt.replace(/[*_#`]/g, '');
    parts.push(cleanPrompt);
  }

  return parts.join('. ');
}

export const StoryModal: React.FC<StoryModalProps> = ({
  experiment,
  philosopherName,
  philosopherId,
  onClose,
  onExploreDeepDive,
}) => {
  const story = getStoryScript(philosopherId, philosopherName, experiment);
  const totalSlides = story.slides.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHolding, setIsHolding] = useState(false);
  const [isNarratorActive, setIsNarratorActive] = useState(storySpeech.enabled);
  const [progress, setProgress] = useState(0); // 0 til 100 for gjeldende slide

  const currentSlide = story.slides[currentIndex];

  // Demp kosmisk ambient dur mens story-modusen er åpen, så opplesningen er krystallklar
  useEffect(() => {
    sound.stopAmbientDrone();
    return () => {
      if (sound.enabled) {
        sound.startAmbientDrone();
      }
    };
  }, []);

  // Beregn tidsvarighet per slide (forlenges automatisk hvis tale er aktiv så teksten rekker å bli lest)
  const slideDurationMs = React.useMemo(() => {
    if (!isNarratorActive) {
      return (currentSlide.durationSeconds || 10) * 1000;
    }
    const text = buildSlideSpeechText(currentSlide);
    const words = text.split(/\s+/).filter(Boolean).length;
    // Norsk rolig tale: ca 2.2 ord per sekund pluss pauser
    const speechSec = Math.max(currentSlide.durationSeconds || 10, Math.ceil(words / 2.2) + 2);
    return speechSec * 1000;
  }, [currentSlide, isNarratorActive]);

  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedProgressRef = useRef<number>(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialogFocus(dialogRef);

  // Gå til neste slide (rolig og lydløs overgang for best lytteopplevelse)
  const handleNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
      pausedProgressRef.current = 0;
      startTimeRef.current = null;
    } else {
      // Siste slide: stopp eller la stå på siste
      setIsPlaying(false);
      setProgress(100);
    }
  }, [currentIndex, totalSlides]);

  // Gå til forrige slide
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    setProgress(0);
    pausedProgressRef.current = 0;
    startTimeRef.current = null;
  }, [currentIndex]);

  // Restart story
  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setProgress(0);
    pausedProgressRef.current = 0;
    startTimeRef.current = null;
    setIsPlaying(true);
  }, []);

  // Timer loop for jevn fremdriftsindikator
  useEffect(() => {
    if (!isPlaying || isHolding) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      return;
    }

    let start = startTimeRef.current;
    const initialProgress = pausedProgressRef.current;

    const tick = (now: number) => {
      if (!start) {
        start = now - (initialProgress / 100) * slideDurationMs;
        startTimeRef.current = start;
      }

      const elapsed = now - start;
      const currentPct = Math.min(100, (elapsed / slideDurationMs) * 100);
      setProgress(currentPct);
      pausedProgressRef.current = currentPct;

      if (currentPct >= 100) {
        // Hvis tale er aktiv, lar vi talen styre fullføringen og kalle handleNext()
        if (!isNarratorActive) {
          handleNext();
        }
      } else {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, isHolding, slideDurationMs, isNarratorActive, handleNext]);

  // Rydd opp all tale når StoryModal lukkes helt
  useEffect(() => {
    return () => {
      storySpeech.stop();
    };
  }, []);

  // Fortellerstemme / Opplesnings-effekt: Start tale ved ny slide eller når tale slås på
  useEffect(() => {
    if (!isNarratorActive) {
      storySpeech.stop();
      return;
    }

    const textToSpeak = buildSlideSpeechText(currentSlide);
    storySpeech.speak(
      textToSpeak,
      () => {
        // Når talen er ferdig: kort og naturlig pustepause før neste del
        if (currentIndex < totalSlides - 1) {
          setTimeout(() => {
            handleNext();
          }, 300);
        } else {
          setIsPlaying(false);
          setProgress(100);
        }
      },
      () => {
        // onStart: stemmen har fysisk begynt å snakke – synkroniser fremdriftsindikatoren nøyaktig
        startTimeRef.current = performance.now();
        setProgress(0);
      }
    );
  }, [currentIndex, isNarratorActive, currentSlide, totalSlides, handleNext]);

  // Pause / gjenoppta tale ved pause eller holding
  useEffect(() => {
    if (!isNarratorActive) return;
    if (!isPlaying || isHolding) {
      storySpeech.pause();
    } else {
      storySpeech.resume();
    }
  }, [isNarratorActive, isPlaying, isHolding]);

  // Tastatursnarveier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        setIsPlaying((p) => {
          const next = !p;
          if (!next && isNarratorActive) storySpeech.pause();
          else if (next && isNarratorActive) storySpeech.resume();
          return next;
        });
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, handleNext, handlePrev, isNarratorActive]);

  // Fortellerstemme-toggle
  const handleToggleNarrator = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = storySpeech.toggle();
    setIsNarratorActive(next);
  };

  // Hold-down for å pause
  const handleHoldStart = () => {
    setIsHolding(true);
    if (isNarratorActive) {
      storySpeech.pause();
    }
  };

  const handleHoldEnd = () => {
    setIsHolding(false);
    startTimeRef.current = null; // resynk i neste tick
    if (isNarratorActive) {
      storySpeech.resume();
    }
  };

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Story: ${story.experimentTitle} av ${philosopherName}`}
      className="focus:outline-none fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 bg-cosmos/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      {/* Selve story-kortet (9:16 format på desktop, fullskjerm på mobil) */}
      <div
        className="relative w-full sm:w-[420px] h-full sm:h-[780px] sm:max-h-[92vh] sm:rounded-3xl bg-cosmos-card border-0 sm:border sm:border-gold/50 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between select-none"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleHoldStart}
        onMouseUp={handleHoldEnd}
        onTouchStart={handleHoldStart}
        onTouchEnd={handleHoldEnd}
      >
        {/* Bakgrunnsbilde med atmosfærisk gradient og Ken Burns-effekt */}
        {story.image ? (
          <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            <img
              src={story.image}
              alt={story.experimentTitle}
              className={`w-full h-full object-cover transition-transform duration-[12000ms] ease-out pointer-events-none ${
                isPlaying && !isHolding ? 'scale-110' : 'scale-105'
              }`}
            />
            {/* Multi-stopp gradient: mørk i topp og bunn for perfekt kontrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/40 to-slate-950/95" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-indigo-950 via-slate-900 to-cosmos">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent" />
          </div>
        )}

        {/* TOPP: Progress-bars og tittel-header */}
        <div className="relative z-20 px-4 pt-3.5 pb-2 space-y-2.5">
          {/* Segmentert fremdriftslinje */}
          <div className="flex items-center gap-1.5 w-full">
            {story.slides.map((_, idx) => {
              let fillPct = 0;
              if (idx < currentIndex) fillPct = 100;
              else if (idx === currentIndex) fillPct = progress;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                    setProgress(0);
                    pausedProgressRef.current = 0;
                    startTimeRef.current = null;
                  }}
                  className="flex-1 h-1 rounded-full bg-white/25 overflow-hidden transition-all hover:h-1.5 focus:outline-none"
                  title={`Gå til del ${idx + 1}`}
                >
                  <div
                    className="h-full bg-gold transition-all duration-75 ease-linear rounded-full shadow-[0_0_8px_#f6c85f]"
                    style={{ width: `${fillPct}%` }}
                  />
                </button>
              );
            })}
          </div>

          {/* Header-kontroller */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-black/60 border border-gold/40 flex items-center justify-center text-sm shadow-md shrink-0">
                {story.icon || '✦'}
              </div>
              <div className="min-w-0 leading-tight">
                <span className="text-xs font-serif font-bold text-white block truncate">
                  {philosopherName}
                </span>
                <span className="text-[10px] text-star-dim block truncate">
                  {story.experimentTitle}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Fortellerstemme / Opplesning */}
              {storySpeech.isSupported && (
                <button
                  type="button"
                  onClick={handleToggleNarrator}
                  className={`h-8 px-2.5 sm:px-3 rounded-full border flex items-center gap-1.5 text-xs font-serif transition-all shadow-md ${
                    isNarratorActive
                      ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.4)] font-bold'
                      : 'bg-black/50 hover:bg-black/80 border-white/20 text-star-dim hover:text-white'
                  }`}
                  title={
                    isNarratorActive
                      ? `Opplesning på (${storySpeech.currentVoiceName}) – klikk for å slå av`
                      : 'Slå på norsk opplesning / fortellerstemme'
                  }
                >
                  <span className={isNarratorActive ? 'animate-pulse' : ''}>
                    {isNarratorActive ? '🔊' : '🔈'}
                  </span>
                  <span className="text-[11px] font-medium">
                    {isNarratorActive ? 'Tale på' : 'Tale av'}
                  </span>
                </button>
              )}

              {/* Pause/Spill-knapp */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying((p) => !p);
                }}
                className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 flex items-center justify-center text-xs text-star-white transition-all shadow-md"
                title={isPlaying ? 'Pause story (Mellomrom)' : 'Fortsett story'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              {/* Lukk-knapp */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 flex items-center justify-center text-xs text-star-white transition-all shadow-md"
                title="Lukk story (Esc)"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* MIDTE: Interaktive trykkesoner for forrige/neste */}
        <div className="absolute inset-0 z-10 flex">
          {/* Venstre 35% trykksone -> Forrige */}
          <div
            onClick={handlePrev}
            className="w-[35%] h-full cursor-pointer group flex items-center pl-2 opacity-0 hover:opacity-100 transition-opacity"
            title="Trykk for forrige del"
          >
            <div className="w-8 h-8 rounded-full bg-black/40 text-white/70 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
              ‹
            </div>
          </div>

          {/* Høyre 65% trykksone -> Neste */}
          <div
            onClick={handleNext}
            className="w-[65%] h-full cursor-pointer group flex items-center justify-end pr-2 opacity-0 hover:opacity-100 transition-opacity"
            title="Trykk for neste del"
          >
            <div className="w-8 h-8 rounded-full bg-black/40 text-white/70 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
              ›
            </div>
          </div>
        </div>

        {/* BUNN: Innholdskort for den aktive sliden */}
        <div className="relative z-20 p-5 sm:p-6 space-y-3.5 bg-gradient-to-t from-black via-black/95 to-transparent pointer-events-auto">
          {/* Kapittel-merke */}
          <div className="flex items-center justify-between">
            <span className="inline-block px-2.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-[10px] font-mono tracking-wider font-bold text-gold">
              {currentSlide.badge}
            </span>
            <span className="text-[11px] font-mono text-star-dim">
              {currentIndex + 1} / {totalSlides}
            </span>
          </div>

          {/* Overskrift */}
          <div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-wide leading-tight drop-shadow-md">
              {currentSlide.headline}
            </h3>
            {currentSlide.subheadline && (
              <p className="text-xs font-serif text-gold/80 italic mt-0.5">
                {currentSlide.subheadline}
              </p>
            )}
          </div>

          {/* Hovedtekst */}
          <p className="text-xs sm:text-sm text-star-white/95 leading-relaxed font-sans whitespace-pre-line drop-shadow-sm">
            {currentSlide.body}
          </p>

          {/* Uthevet fakta / eksamens-knagg */}
          {currentSlide.highlight && (
            <div className="p-3 rounded-xl bg-gold/10 border border-gold/30 text-xs text-amber-100 font-sans shadow-md space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-serif font-bold text-gold uppercase tracking-wider">
                <span>{currentSlide.highlight.icon || '💡'}</span>
                <span>{currentSlide.highlight.label}:</span>
              </div>
              <p className="leading-relaxed italic">{currentSlide.highlight.text}</p>
            </div>
          )}

          {/* Slide 4 (Siste slide): Handlingsknapper */}
          {currentIndex === totalSlides - 1 && (
            <div className="pt-2 flex flex-col gap-2">
              {onExploreDeepDive && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onExploreDeepDive();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gold hover:bg-gold-light text-cosmos font-serif font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <span>📖</span> Utforsk fullt dypdykk for {philosopherName}
                </button>
              )}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="flex-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-star-white font-serif text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <span>↺</span> Spill på nytt
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-star-dim font-serif text-xs transition-all"
                >
                  Lukk
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
