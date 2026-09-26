import React, { useState } from 'react';
import type { Philosopher } from '../../schemas/philosopher';
import { THEME_IDS } from '../../schemas/philosopher';
import { getThemeMeta } from '../../lib/themes';
import { getTraditionMeta } from '../../lib/traditions';
import { formatLifeSpan, formatYear, calculateLifespan, checkOverlap } from '../../lib/years';
import { ThemeRadar } from '../../components/ThemeRadar';

interface PhilosopherComparisonProps {
  initialIds: string[];
  allPhilosophers: Philosopher[];
  onClose: () => void;
  onOpenPhilosopherCard: (id: string) => void;
}

const COMPARISON_COLORS = ['#f6c85f', '#67e8f9', '#f472b6'];

export const PhilosopherComparison: React.FC<PhilosopherComparisonProps> = ({
  initialIds,
  allPhilosophers,
  onClose,
  onOpenPhilosopherCard,
}) => {
  // Sammenlign 2 eller 3 filosofer
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (initialIds.length >= 2) return initialIds.slice(0, 3);
    if (initialIds.length === 1) {
      // Finn en naturlig partner å sammenligne med (f.eks. Platon med Sokrates eller Aristoteles)
      const second = allPhilosophers.find((p) => p.id !== initialIds[0])?.id;
      return second ? [initialIds[0], second] : [initialIds[0]];
    }
    return [allPhilosophers[0].id, allPhilosophers[1].id];
  });

  const selectedPhilosophers = selectedIds
    .map((id) => allPhilosophers.find((p) => p.id === id))
    .filter((p): p is Philosopher => p !== undefined);

  // Legg til en tredje filosof
  const addPhilosopher = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Fjern en filosof
  const removePhilosopher = (id: string) => {
    if (selectedIds.length > 2) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    }
  };

  // Erstatt en filosof
  const changePhilosopher = (index: number, newId: string) => {
    const updated = [...selectedIds];
    updated[index] = newId;
    setSelectedIds(updated);
  };

  // Sjekk om de levde samtidig
  const haveOverlap = selectedPhilosophers.length >= 2 && (() => {
    const p1 = selectedPhilosophers[0];
    const p2 = selectedPhilosophers[1];
    const s1 = p1.born?.year ?? p1.floruit?.from ?? -400;
    const e1 = p1.died?.year ?? p1.floruit?.to ?? (s1 + 65);
    const s2 = p2.born?.year ?? p2.floruit?.from ?? -400;
    const e2 = p2.died?.year ?? p2.floruit?.to ?? (s2 + 65);
    return checkOverlap({ start: s1, end: e1 }, { start: s2, end: e2 });
  })();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-cosmos/80 backdrop-blur-md animate-in fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[92vh] bg-cosmos-card border border-gold/40 rounded-2xl shadow-2xl flex flex-col p-6 sm:p-8 overflow-y-auto animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs uppercase font-serif tracking-widest mb-1">
              <span>⚖️</span> Sammenligningskammer
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-star-white">
              Hvem tenkte likt?
            </h2>
            <p className="text-xs text-star-dim font-sans mt-0.5">
              Sammenlign tema-profiler, levetid og idéer mellom {selectedPhilosophers.length} tenkere.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/20 text-star-dim hover:text-white hover:border-gold transition-colors flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* Velg filosofer å sammenligne */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {selectedPhilosophers.map((p, idx) => (
            <div
              key={p.id}
              className="p-3 rounded-xl border flex flex-col gap-2"
              style={{
                borderColor: `${COMPARISON_COLORS[idx]}50`,
                backgroundColor: `${COMPARISON_COLORS[idx]}10`,
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COMPARISON_COLORS[idx] }}
                />
                <span className="text-[11px] font-serif uppercase tracking-wider text-star-dim">
                  Filosof {idx + 1}
                </span>
                {selectedPhilosophers.length > 2 && (
                  <button
                    onClick={() => removePhilosopher(p.id)}
                    className="text-star-dim hover:text-rose-400 text-xs px-1"
                    title="Fjern fra sammenligning"
                  >
                    ✕
                  </button>
                )}
              </div>

              <select
                value={p.id}
                onChange={(e) => changePhilosopher(idx, e.target.value)}
                className="w-full px-2 py-1.5 rounded-lg bg-cosmos border border-white/20 text-star-white font-serif text-xs focus:border-gold focus:outline-none"
              >
                {allPhilosophers.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name} ({getTraditionMeta(opt.tradition).name})
                  </option>
                ))}
              </select>

              <div className="text-[11px] text-star-dim flex justify-between items-center">
                <span>{formatLifeSpan(p)}</span>
                <button
                  onClick={() => onOpenPhilosopherCard(p.id)}
                  className="text-gold hover:underline"
                >
                  Vis kort ↗
                </button>
              </div>
            </div>
          ))}

          {/* Knapp for å legge til en 3. filosof hvis bare 2 er valgt */}
          {selectedPhilosophers.length < 3 && (
            <div className="p-4 rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center text-center gap-2 hover:border-gold/40 transition-colors">
              <span className="text-xl">➕</span>
              <span className="text-xs text-star-dim font-serif">Legg til en tredje filosof</span>
              <select
                onChange={(e) => {
                  if (e.target.value) addPhilosopher(e.target.value);
                }}
                defaultValue=""
                className="px-2 py-1 rounded bg-cosmos border border-white/20 text-xs text-star-white font-serif"
              >
                <option value="" disabled>
                  Velg filosof...
                </option>
                {allPhilosophers
                  .filter((p) => !selectedIds.includes(p.id))
                  .map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        {/* Hoveddel: Overlagte temaradarer + tabell */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-cosmos/60 border border-white/10 rounded-2xl p-6 mb-6">
          {/* Edderkoppdiagram */}
          <div className="flex flex-col items-center">
            <h3 className="text-xs uppercase font-serif tracking-widest text-gold mb-4 text-center">
              ✦ Overlagte tema-radardiagrammer
            </h3>
            <ThemeRadar
              philosophers={selectedPhilosophers}
              size={290}
              colors={COMPARISON_COLORS}
              showLegend={true}
            />
          </div>

          {/* Tema-poengtabell */}
          <div>
            <h3 className="text-xs uppercase font-serif tracking-widest text-star-dim mb-3">
              Tema-sammenligning (Skala 0–5)
            </h3>
            <div className="space-y-2 text-xs">
              {THEME_IDS.map((themeId) => {
                const meta = getThemeMeta(themeId);
                return (
                  <div key={themeId} className="flex items-center justify-between border-b border-white/5 pb-1">
                    <span className="font-serif text-star-dim">{meta.name}</span>
                    <div className="flex items-center gap-3">
                      {selectedPhilosophers.map((p, idx) => (
                        <span
                          key={p.id}
                          className="font-mono font-bold w-6 text-center"
                          style={{ color: COMPARISON_COLORS[idx] }}
                        >
                          {p.themes[themeId]}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Felles levetidsakse og samtidighet */}
        <div className="p-4 bg-cosmos/80 border border-white/10 rounded-xl mb-6">
          <h3 className="text-xs uppercase font-serif tracking-widest text-gold mb-2 flex items-center justify-between">
            <span>⏳ Historisk tid og levetid</span>
            {haveOverlap ? (
              <span className="text-emerald-400 text-[11px] normal-case font-sans">
                ✦ Disse to levde samtidig i historien!
              </span>
            ) : (
              <span className="text-star-dim text-[11px] normal-case font-sans">
                Levde i ulike epoker
              </span>
            )}
          </h3>

          <div className="space-y-3 mt-3">
            {selectedPhilosophers.map((p, idx) => {
              const b = p.born?.year ?? p.floruit?.from ?? -400;
              const d = p.died?.year ?? p.floruit?.to ?? (b + 60);
              const age = p.born && p.died ? calculateLifespan(p.born.year, p.died.year) : null;

              return (
                <div key={p.id} className="flex items-center gap-3 text-xs font-serif">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: COMPARISON_COLORS[idx] }}
                  />
                  <span className="w-28 truncate text-star-white font-bold">{p.name}</span>
                  <span className="text-star-dim font-mono">
                    {formatYear(b)} – {formatYear(d)}
                  </span>
                  {age && <span className="text-gold-bright text-[11px]">({age} år)</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Kjerneidéer og sitater side-om-side */}
        <div className={`grid grid-cols-1 ${selectedPhilosophers.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
          {selectedPhilosophers.map((p, idx) => (
            <div
              key={p.id}
              className="p-4 rounded-xl border bg-cosmos/50 flex flex-col justify-between"
              style={{ borderColor: `${COMPARISON_COLORS[idx]}30` }}
            >
              <div>
                <h4
                  className="font-serif font-bold text-sm mb-2"
                  style={{ color: COMPARISON_COLORS[idx] }}
                >
                  {p.name}
                </h4>
                <div className="space-y-2 mb-4">
                  {p.keyIdeas.map((idea, iIdx) => (
                    <div key={iIdx} className="text-xs">
                      <strong className="text-star-white font-serif block">{idea.title}</strong>
                      <p className="text-star-dim text-[11px] leading-relaxed font-sans">{idea.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {p.quote && (
                <blockquote className="italic border-l-2 border-gold/40 pl-2 text-[11px] text-star-white/90 font-serif mt-2">
                  «{p.quote.text}»
                </blockquote>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
