import React from 'react';
import type { ThoughtExperiment } from '../deepdive/types';
import { sound } from '../../lib/sound';

interface VisualHookCardProps {
  experiment: ThoughtExperiment;
  philosopherName: string;
  philosopherId: string;
  onPlayStory?: (exp: ThoughtExperiment) => void;
}

export const VisualHookCard: React.FC<VisualHookCardProps> = ({
  experiment,
  philosopherName,
  philosopherId,
  onPlayStory,
}) => {
  const handlePlayStory = () => {
    sound.playStarSelect();
    if (onPlayStory) {
      onPlayStory(experiment);
    }
  };

  return (
    <div
      data-philosopher-id={philosopherId}
      className="rounded-2xl border border-gold/40 bg-linear-to-b from-slate-900/90 to-cosmos/95 overflow-hidden shadow-2xl transition-all hover:border-gold/70 group"
    >
      {/* Illustrasjonstopp eller kosmisk banner */}
      {experiment.image ? (
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-black/60">
          <img
            src={experiment.image}
            alt={experiment.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent opacity-80" />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-gold/40 text-[11px] font-serif text-gold flex items-center gap-1.5 shadow-md">
            <span>{experiment.icon || '✦'}</span> Visuell knagg
          </div>
        </div>
      ) : (
        <div className="relative h-24 sm:h-28 w-full overflow-hidden bg-linear-to-r from-indigo-950/60 via-slate-900/80 to-amber-950/40 border-b border-white/10 flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(246,200,95,0.25)]">
              {experiment.icon || '💡'}
            </div>
            <div>
              <span className="text-[10px] uppercase font-serif tracking-widest text-gold/80 block">
                Visuell tankemodell // {philosopherName}
              </span>
              <span className="text-sm font-serif font-bold text-white tracking-wide">
                {experiment.title}
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center text-[10px] text-star-dim/80 font-mono px-2.5 py-1 rounded-full border border-white/10 bg-cosmos/60">
            ✦ TANKEEKSPERIMENT
          </div>
        </div>
      )}

      {/* Innhold */}
      <div className="p-4 sm:p-5 space-y-3">
        {/* Tittel (dersom banneret hadde bilde) */}
        {experiment.image && (
          <h4 className="text-sm sm:text-base font-serif font-bold text-white flex items-center gap-2">
            <span className="text-gold">{experiment.icon || '✦'}</span>
            {experiment.title}
          </h4>
        )}

        {/* Beskrivelse */}
        <p className="text-xs sm:text-sm text-star-white/95 font-sans leading-relaxed">
          {experiment.description}
        </p>

        {/* Spisset knagg / Takeaway for eksamen */}
        <div className="p-3.5 rounded-xl bg-gold/10 border border-gold/30 text-xs text-amber-100 font-sans shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-gold uppercase tracking-wider">
            <span>💡</span> Eksamen-knagg:
          </div>
          <p className="italic leading-relaxed">{experiment.takeaway}</p>
        </div>

        {/* Handlingsknapp for video/story */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="text-[11px] text-star-dim">
            Kjerneidé for {philosopherName}
          </span>
          <button
            type="button"
            onClick={handlePlayStory}
            className="px-3.5 py-1.5 rounded-lg bg-gold/15 hover:bg-gold/25 border border-gold/40 text-gold text-xs font-serif font-bold transition-all flex items-center gap-1.5 hover:scale-[1.02] shadow-xs"
            title="Se en kort, animert oppsummering av dette tankeeksperimentet"
          >
            <span>▶</span> Se idéen på 45 sek
          </button>
        </div>
      </div>
    </div>
  );
};
