import React, { useState, useMemo } from 'react';
import type { Philosopher } from '../../schemas/philosopher';
import { formatLifeSpan } from '../../lib/years';
import { TRADITIONS, getTraditionMeta } from '../../lib/traditions';

const FEATURED_IDS = new Set([
  'hypatia',
  'sokrates',
  'arne-naess',
  'buddha',
  'marcus-aurelius',
]);

interface PhilosopherListProps {
  philosophers: Philosopher[];
  onOpenCard?: (id: string) => void;
}

export const PhilosopherList: React.FC<PhilosopherListProps> = ({ philosophers, onOpenCard }) => {
  const [search, setSearch] = useState<string>('');
  const [selectedTradition, setSelectedTradition] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return philosophers.filter((p) => {
      const tradMeta = getTraditionMeta(p.tradition);
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.nameOriginal && p.nameOriginal.toLowerCase().includes(search.toLowerCase())) ||
        p.schools.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
        tradMeta.name.toLowerCase().includes(search.toLowerCase()) ||
        p.keyIdeas.some((idea) => idea.title.toLowerCase().includes(search.toLowerCase()) || idea.text.toLowerCase().includes(search.toLowerCase()));

      const matchesTradition = selectedTradition === 'all' || p.tradition === selectedTradition;

      return matchesSearch && matchesTradition;
    });
  }, [philosophers, search, selectedTradition]);

  // Tell antall per tradisjon
  const traditionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of philosophers) {
      counts[p.tradition] = (counts[p.tradition] || 0) + 1;
    }
    return counts;
  }, [philosophers]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 animate-fade-in">
      {/* Søk og filtre */}
      <div className="bg-cosmos-card/80 border border-gold-dim/40 rounded-2xl p-5 shadow-2xl backdrop-blur-md flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dim">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Søk etter filosof, idé, retning eller verdensdel..."
              className="w-full bg-cosmos border border-white/15 rounded-xl pl-9 pr-4 py-2.5 text-sm text-star-white placeholder:text-star-dim focus:outline-none focus:border-gold transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-star-dim hover:text-white"
              >
                Nullstill
              </button>
            )}
          </div>
          <div className="text-xs text-star-dim font-serif whitespace-nowrap self-center">
            Viser <span className="text-gold font-bold">{filtered.length}</span> av {philosophers.length} stjerner
          </div>
        </div>

        {/* Tradisjon-faner */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/5">
          <button
            onClick={() => setSelectedTradition('all')}
            className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
              selectedTradition === 'all'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_8px_#f6c85f]'
                : 'bg-white/5 text-star-dim hover:text-white hover:bg-white/10'
            }`}
          >
            Alle ({philosophers.length})
          </button>
          {Object.entries(TRADITIONS).map(([id, meta]) => {
            const count = traditionCounts[id] || 0;
            if (count === 0) return null;
            const isSelected = selectedTradition === id;
            return (
              <button
                key={id}
                onClick={() => setSelectedTradition(id)}
                className={`px-3 py-1 rounded-full text-xs font-serif transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'font-bold shadow-md'
                    : 'bg-white/5 text-star-dim hover:text-white hover:bg-white/10'
                }`}
                style={{
                  backgroundColor: isSelected ? meta.color : undefined,
                  color: isSelected ? '#040714' : undefined,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: isSelected ? '#040714' : meta.color }}
                />
                {meta.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Resultatliste */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-cosmos-card/40 rounded-2xl border border-white/5">
          <p className="text-star-dim font-serif text-base">Ingen filosofer matchet søket ditt.</p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedTradition('all');
            }}
            className="mt-3 text-xs text-gold underline hover:text-gold-bright"
          >
            Vis alle filosofer igjen
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((p) => {
            const tradMeta = getTraditionMeta(p.tradition);
            const isExpanded = expandedId === p.id;

            return (
              <article
                key={p.id}
                className={`bg-cosmos-card/80 border rounded-xl p-4 transition-all duration-300 ${
                  isExpanded
                    ? 'border-gold/60 shadow-[0_0_25px_rgba(246,200,95,0.15)] bg-cosmos-card'
                    : 'border-white/10 hover:border-gold/30 hover:bg-cosmos-card/95'
                }`}
              >
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer select-none"
                  onClick={() => setExpandedId(isExpanded ? null : p.id)}
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full mt-1 sm:mt-0 flex-shrink-0 shadow-[0_0_8px]"
                      style={{ backgroundColor: tradMeta.color, color: tradMeta.color }}
                    />
                    <div>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h3 className="font-serif text-lg font-bold text-star-white hover:text-gold transition-colors">
                          {p.name}
                        </h3>
                        {p.nameOriginal && (
                          <span className="text-xs text-star-dim/70 font-serif">
                            ({p.nameOriginal})
                          </span>
                        )}
                        {FEATURED_IDS.has(p.id) && (
                          <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-gold/20 text-gold font-serif border border-gold/30">
                            ★ Utvalgt
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-cyan-glow font-sans mt-0.5">
                        {formatLifeSpan(p)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-serif border"
                      style={{
                        borderColor: `${tradMeta.color}40`,
                        color: tradMeta.color,
                        backgroundColor: `${tradMeta.color}15`,
                      }}
                    >
                      {tradMeta.name}
                    </span>
                    <button
                      className="text-xs text-star-dim hover:text-white px-2 py-1"
                      aria-label={isExpanded ? 'Lukk detaljer' : 'Åpne detaljer'}
                    >
                      {isExpanded ? '▲ Lukk' : '▼ Mer'}
                    </button>
                  </div>
                </div>

                {/* Ekstra detaljer når man klikker */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-4 text-sm animate-fade-in">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-xs font-serif text-gold uppercase tracking-widest">
                          Kjerneidéer
                        </h4>
                        {onOpenCard && (
                          <button
                            onClick={() => onOpenCard(p.id)}
                            className="px-3 py-1 bg-gold text-cosmos rounded-md font-serif text-xs font-bold hover:bg-gold-bright transition-all shadow-md flex items-center gap-1"
                          >
                            <span>📖</span> Åpne filosofkort
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {p.keyIdeas.map((idea, idx) => (
                          <div
                            key={idx}
                            className="bg-cosmos/80 border border-white/5 rounded-lg p-3"
                          >
                            <span className="font-serif text-star-white text-xs font-bold block mb-1">
                              {idea.title}
                            </span>
                            <p className="text-xs text-star-bright/80 leading-relaxed font-sans">
                              {idea.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {p.quote && (
                      <blockquote className="border-l-2 border-gold pl-3 py-1 my-1 italic text-xs font-serif text-gold-bright bg-gold/5 rounded-r">
                        «{p.quote.text}»
                        <cite className="block not-italic text-[10px] text-star-dim mt-1 font-sans">
                          – {p.quote.work}
                        </cite>
                      </blockquote>
                    )}

                    <div className="bg-cyan-glow/5 border border-cyan-glow/20 rounded-lg p-3">
                      <span className="text-xs font-serif text-cyan-glow font-bold block mb-1">
                        💭 Tenk selv
                      </span>
                      <p className="text-xs text-star-bright/90 font-sans italic">
                        {p.thinkAbout}
                      </p>
                    </div>

                    {/* Temaprofil-tall */}
                    <div>
                      <h4 className="text-xs font-serif text-gold uppercase tracking-widest mb-2">
                        Temaprofil (0–5)
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        {Object.entries(p.themes).map(([theme, score]) => (
                          <div
                            key={theme}
                            className="flex items-center justify-between bg-cosmos/60 px-2.5 py-1.5 rounded border border-white/5"
                          >
                            <span className="text-star-dim capitalize text-[11px]">{theme}</span>
                            <span className="text-gold font-bold font-serif">{score}/5</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Kilder og lenker */}
                    {p.links.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-2 text-xs border-t border-white/5">
                        <span className="text-star-dim">Les mer på:</span>
                        {p.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-glow hover:text-white underline underline-offset-2 transition-colors"
                          >
                            {link.label} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
