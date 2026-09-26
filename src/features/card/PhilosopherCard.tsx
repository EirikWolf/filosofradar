import React, { useEffect } from 'react';
import type { Philosopher } from '../../schemas/philosopher';
import { formatLifeSpan } from '../../lib/years';
import { getTraditionMeta } from '../../lib/traditions';
import { ThemeRadar } from '../../components/ThemeRadar';

interface PhilosopherCardProps {
  philosopher: Philosopher;
  allPhilosophers: Philosopher[];
  onClose: () => void;
  onSelectPhilosopher: (id: string) => void;
  onStartCompare: (id: string) => void;
  onViewTimeline?: () => void;
}

export const PhilosopherCard: React.FC<PhilosopherCardProps> = ({
  philosopher,
  allPhilosophers,
  onClose,
  onSelectPhilosopher,
  onStartCompare,
  onViewTimeline,
}) => {
  const meta = getTraditionMeta(philosopher.tradition);

  // Kart over filosofer for rask id-oppslag
  const philosophersById = React.useMemo(() => {
    const map = new Map<string, Philosopher>();
    for (const p of allPhilosophers) {
      map.set(p.id, p);
    }
    return map;
  }, [allPhilosophers]);

  // Tastatursnarvei: Escape lukker kortet
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-cosmos/70 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      {/* Kort-panel som glir inn fra høyre */}
      <aside
        className="w-full max-w-lg md:max-w-xl h-full bg-cosmos-card border-l border-gold/30 shadow-2xl overflow-y-auto flex flex-col p-6 sm:p-8 animate-in slide-in-from-right duration-300 select-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header med lukk-knapp og tradisjon */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            {/* Avatar eller stjerneglyf */}
            {philosopher.image ? (
              <img
                src={philosopher.image.file}
                alt={philosopher.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gold/60 shadow-lg"
              />
            ) : (
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-serif text-2xl font-bold border shadow-lg"
                style={{
                  backgroundColor: `${meta.color}20`,
                  borderColor: meta.color,
                  color: meta.color,
                }}
              >
                {philosopher.name.charAt(0)}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: meta.color }} />
                <span className="text-xs uppercase font-serif tracking-widest text-star-dim">
                  {meta.name}
                </span>
                {philosopher.reviewed ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ✓ Faktasjekket
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Under arbeid
                  </span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-serif font-bold text-star-white flex items-baseline gap-2">
                {philosopher.name}
                {philosopher.nameOriginal && (
                  <span className="text-sm font-normal text-star-dim font-sans">
                    ({philosopher.nameOriginal})
                  </span>
                )}
              </h2>

              <p className="text-sm font-serif text-gold-bright mt-0.5">
                {formatLifeSpan(philosopher)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/20 text-star-dim hover:text-white hover:border-gold transition-colors flex items-center justify-center text-sm"
            title="Lukk (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Handlingsknapper */}
        <div className="flex flex-wrap items-center gap-2 my-4">
          <button
            onClick={() => onStartCompare(philosopher.id)}
            className="px-3.5 py-1.5 rounded-lg bg-gold text-cosmos font-serif font-bold text-xs hover:bg-gold-bright transition-all shadow-[0_0_12px_rgba(246,200,95,0.4)] flex items-center gap-1.5"
          >
            <span>⚖️</span> Sammenlign med en annen
          </button>
          {onViewTimeline && (
            <button
              onClick={onViewTimeline}
              className="px-3 py-1.5 rounded-lg border border-white/20 hover:border-gold text-star-dim hover:text-white text-xs font-serif transition-colors flex items-center gap-1.5"
            >
              <span>⏳</span> Se levetid i tidslinjen
            </button>
          )}
        </div>

        {/* Skoler / Retninger */}
        {philosopher.schools.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-5">
            <span className="text-xs font-serif text-star-dim">Retning:</span>
            {philosopher.schools.map((school) => (
              <span
                key={school}
                className="px-2.5 py-0.5 rounded-full bg-cosmos border border-white/15 text-star-white text-xs font-serif"
              >
                {school}
              </span>
            ))}
          </div>
        )}

        {/* 1. Seksjon: Temaradar (edderkoppdiagram) */}
        <div className="p-4 bg-cosmos/80 border border-white/10 rounded-2xl mb-6 shadow-inner flex flex-col items-center">
          <h3 className="text-xs uppercase font-serif tracking-widest text-gold mb-2 text-center">
            ✦ Temaradar (Hva brant {philosopher.name.split(' ')[0]} for?)
          </h3>
          <ThemeRadar philosophers={[philosopher]} size={250} showLegend={false} />
          <p className="text-xs text-star-dim italic text-center mt-3 max-w-sm px-2">
            «{philosopher.themeNotes}»
          </p>
        </div>

        {/* 2. Seksjon: Kjerneidéer */}
        <div className="mb-6">
          <h3 className="text-sm font-serif font-bold text-gold tracking-wide mb-3 flex items-center gap-2">
            <span>💡</span> Kjerneidéer
          </h3>
          <div className="space-y-3">
            {philosopher.keyIdeas.map((idea, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-cosmos/60 border border-white/10 hover:border-white/20 transition-colors"
              >
                <h4 className="text-xs font-serif font-bold text-star-white mb-1">
                  {idea.title}
                </h4>
                <p className="text-xs text-star-dim leading-relaxed font-sans">
                  {idea.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Seksjon: Sitat */}
        {philosopher.quote && (
          <div className="mb-6 p-4 rounded-xl bg-cosmos-card border-l-4 border-gold bg-gradient-to-r from-gold/10 to-transparent">
            <blockquote className="italic font-serif text-sm text-star-white leading-relaxed">
              «{philosopher.quote.text}»
            </blockquote>
            <footer className="text-[11px] text-star-dim font-sans mt-2">
              — {philosopher.quote.work} ({philosopher.quote.source})
              {philosopher.quote.translator && ` · Oversatt av: ${philosopher.quote.translator}`}
            </footer>
          </div>
        )}

        {/* 4. Seksjon: Tenk selv */}
        <div className="mb-6 p-4 rounded-xl border border-cyan-glow/30 bg-cyan-glow/5">
          <div className="flex items-center gap-2 text-cyan-glow text-xs font-serif font-bold uppercase tracking-wider mb-1">
            <span>💭</span> Tenk selv
          </div>
          <p className="text-xs text-star-white leading-relaxed font-sans">
            {philosopher.thinkAbout}
          </p>
        </div>

        {/* 5. Seksjon: Påvirkningsnettverk (Idé-slekt) */}
        <div className="mb-6 space-y-3">
          <h3 className="text-sm font-serif font-bold text-gold tracking-wide flex items-center gap-2">
            <span>🕸️</span> Idé-slekt og påvirkning
          </h3>

          {/* Påvirket av */}
          <div>
            <span className="text-xs font-serif text-star-dim block mb-1.5">
              Påvirket av ({philosopher.influencedBy.length}):
            </span>
            {philosopher.influencedBy.length === 0 ? (
              <span className="text-xs text-star-dim italic">Ingen kjente direkte forgjengere i datasettet.</span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {philosopher.influencedBy.map((id) => {
                  const inf = philosophersById.get(id);
                  return (
                    <button
                      key={id}
                      onClick={() => onSelectPhilosopher(id)}
                      className="px-2.5 py-1 rounded-full bg-cosmos border border-white/20 text-star-white hover:border-gold hover:text-gold text-xs font-serif transition-colors"
                    >
                      ← {inf ? inf.name : id}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Påvirket (hvem denne filosofen inspirerte) */}
          <div>
            <span className="text-xs font-serif text-star-dim block mb-1.5">
              Inspirerte videre ({philosopher.influences?.length ?? 0}):
            </span>
            {!philosopher.influences || philosopher.influences.length === 0 ? (
              <span className="text-xs text-star-dim italic">Ingen registrerte etterfølgere ennå.</span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {philosopher.influences.map((id) => {
                  const inf = philosophersById.get(id);
                  return (
                    <button
                      key={id}
                      onClick={() => onSelectPhilosopher(id)}
                      className="px-2.5 py-1 rounded-full bg-cosmos border border-gold/30 text-star-white hover:border-gold hover:text-gold text-xs font-serif transition-colors"
                    >
                      → {inf ? inf.name : id}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* 6. Seksjon: Kilder og lisenser */}
        <div className="mt-auto pt-4 border-t border-white/10 text-xs text-star-dim space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-serif">Kilder:</span>
            {philosopher.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-glow hover:underline text-[11px]"
              >
                {link.label} ↗
              </a>
            ))}
            <a
              href={`https://www.wikidata.org/wiki/${philosopher.wikidata}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-star-dim hover:text-white text-[11px]"
            >
              Wikidata ({philosopher.wikidata}) ↗
            </a>
          </div>

          {philosopher.image && (
            <p className="text-[10px] text-star-dim">
              Bilde: {philosopher.image.author} · Lisens: {philosopher.image.license} (
              <a
                href={philosopher.image.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                kilde
              </a>
              )
            </p>
          )}
        </div>
      </aside>
    </div>
  );
};
