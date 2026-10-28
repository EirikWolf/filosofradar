import React from 'react';
import type { ExphilProfile } from './types';
import { EXPHIL_PROFILES } from './exphilData';

interface ExphilCardExamBoxProps {
  philosopherId: string;
  onOpenDuel?: (duelId: string) => void;
  onNavigateToExphilHub?: () => void;
}

export const ExphilCardExamBox: React.FC<ExphilCardExamBoxProps> = ({
  philosopherId,
  onNavigateToExphilHub,
}) => {
  const profile: ExphilProfile | undefined = EXPHIL_PROFILES[philosopherId];

  if (!profile) {
    return null;
  }

  const getPillarBadgeColor = () => {
    switch (profile.pillar) {
      case 'etikk':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'erkjennelse':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'menneskesyn':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default:
        return 'bg-gold/20 text-gold border-gold/40';
    }
  };

  return (
    <div className="my-6 p-4.5 rounded-2xl bg-gradient-to-br from-amber-950/30 via-cosmos-card to-cosmos border-2 border-gold/40 shadow-[0_0_20px_rgba(246,200,95,0.15)] relative overflow-hidden">
      {/* Bakgrunnsdekor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

      {/* Topplinje med pensumstempel */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">🎓</span>
          <span className="text-xs font-serif font-bold uppercase tracking-widest text-gold">
            Examen Philosophicum Pensum
          </span>
        </div>
        <span className={`text-[10px] font-serif uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getPillarBadgeColor()}`}>
          {profile.pillarLabel}
        </span>
      </div>

      <div className="text-xs font-serif text-star-dim italic mb-3">
        Tema: <strong className="text-star-white not-italic">{profile.subPillar}</strong>
      </div>

      {/* 💡 Hovedbidrag på eksamen */}
      <div className="mb-3.5 p-3 rounded-xl bg-cosmos/70 border border-white/10">
        <div className="flex items-center gap-1.5 text-gold text-xs font-serif font-bold mb-1">
          <span>💡</span> Hovedpoeng på eksamen
        </div>
        <p className="text-xs text-star-white font-sans leading-relaxed">
          {profile.coreTakeaway}
        </p>
      </div>

      {/* 🔑 Sensors nøkkelord */}
      <div className="mb-3.5">
        <div className="text-[11px] font-serif font-bold uppercase tracking-wider text-star-dim mb-1.5 flex items-center gap-1.5">
          <span>🔑</span> Sensors nøkkelord (må nevnes):
        </div>
        <div className="flex flex-wrap gap-1.5">
          {profile.examKeywords.map((kw, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md bg-gold/10 border border-gold/30 text-gold-bright text-[11px] font-serif font-medium"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* ⚠️ Eksamensfelle */}
      <div className="mb-3.5 p-3 rounded-xl bg-red-950/30 border border-red-500/30">
        <div className="flex items-center gap-1.5 text-red-300 text-xs font-serif font-bold mb-1">
          <span>⚠️</span> Typisk eksamensfelle
        </div>
        <p className="text-xs text-red-100 font-sans leading-relaxed">
          {profile.commonPitfall}
        </p>
      </div>

      {/* 📝 Typiske eksamensoppgaver */}
      {profile.typicalQuestions.length > 0 && (
        <div className="mb-4">
          <div className="text-[11px] font-serif font-bold uppercase tracking-wider text-star-dim mb-1.5 flex items-center gap-1.5">
            <span>📝</span> Typisk eksamensoppgave:
          </div>
          <ul className="space-y-1.5">
            {profile.typicalQuestions.map((q, idx) => (
              <li
                key={idx}
                className="text-xs text-star-white/90 font-serif italic bg-cosmos/40 p-2 rounded-lg border border-white/5"
              >
                «{q}»
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Snarvei til Ex.phil-huben */}
      {onNavigateToExphilHub && (
        <button
          onClick={onNavigateToExphilHub}
          className="w-full py-2 px-3 rounded-xl bg-gold text-cosmos font-serif font-bold text-xs hover:bg-gold-bright transition-all shadow-[0_0_12px_rgba(246,200,95,0.3)] flex items-center justify-center gap-2"
        >
          <span>🎓</span> Åpne Ex.phil Eksamens-hub (Dueller & Flashcards)
        </button>
      )}
    </div>
  );
};
