import React, { useState, useEffect, useCallback } from 'react';
import { PhilosopherList } from './features/list/PhilosopherList';
import { TimelineView } from './features/timeline/TimelineView';
import { RadarView } from './features/radar/RadarView';
import { NetworkView } from './features/network/NetworkView';
import { PhilosopherCard } from './features/card/PhilosopherCard';
import { PhilosopherComparison } from './features/comparison/PhilosopherComparison';
import { QuizView } from './features/quiz/QuizView';
import { FactCheckView } from './features/factcheck/FactCheckView';
import { AboutView } from './features/about/AboutView';
import type { Philosopher } from './schemas/philosopher';
import philosophersData from './generated/philosophers.json';

const philosophers = philosophersData as Philosopher[];

type ViewMode = 'radar' | 'timeline' | 'network' | 'list' | 'quiz' | 'factcheck' | 'about';

export const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('radar');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [comparingIds, setComparingIds] = useState<string[] | null>(null);
  const [isClassroomMode, setIsClassroomMode] = useState<boolean>(false);

  // Synkroniser med URL (?f=filosof-id)
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const fParam = params.get('f');
      if (fParam && philosophers.some((p) => p.id === fParam)) {
        setActiveCardId(fParam);
      } else {
        setActiveCardId(null);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const openCard = useCallback((id: string) => {
    setActiveCardId(id);
    const url = new URL(window.location.href);
    url.searchParams.set('f', id);
    window.history.pushState({}, '', url.toString());
  }, []);

  const closeCard = useCallback(() => {
    setActiveCardId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('f');
    window.history.pushState({}, '', url.toString());
  }, []);

  const activePhilosopher = activeCardId
    ? philosophers.find((p) => p.id === activeCardId) || null
    : null;

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-between p-4 sm:p-6 bg-cosmos selection:bg-gold/30 transition-all ${
        isClassroomMode ? 'classroom-mode' : ''
      }`}
    >
      {/* Header */}
      <header className="text-center mt-2 flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-dim bg-cosmos-card/90 text-gold text-xs uppercase tracking-widest font-serif shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-glow animate-ping" />
            Observatoriet // {philosophers.length} stjerner lastet
          </div>

          {/* Klasseromsmodus-knapp */}
          <button
            onClick={() => setIsClassroomMode((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif transition-all border shadow-lg ${
              isClassroomMode
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                : 'bg-cosmos-card/80 border-white/15 text-star-dim hover:text-white'
            }`}
            title="Skru av/på stor skrift og presentasjonsvisning for projektor"
          >
            <span>🎓</span> {isClassroomMode ? 'Klasseromsmodus på' : 'Klasserom'}
          </button>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif tracking-wider text-star-white drop-shadow-[0_0_25px_rgba(103,232,249,0.45)]">
          FILOSOFRADAREN
        </h1>
        <p className="text-star-dim text-sm md:text-base mt-2 max-w-md mx-auto font-sans">
          Filosofiens historie som et levende stjernekart.
        </p>

        {/* Visnings-velger */}
        <nav className="flex flex-wrap items-center justify-center gap-2 mt-5 p-1 bg-cosmos-card/90 border border-white/10 rounded-full shadow-xl">
          <button
            onClick={() => setView('radar')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-2 ${
              view === 'radar'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.6)]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>✦</span> Radaren
          </button>
          <button
            onClick={() => setView('timeline')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-2 ${
              view === 'timeline'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.6)]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>⏳</span> Tidslinjen
          </button>
          <button
            onClick={() => setView('network')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-2 ${
              view === 'network'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.6)]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>🕸️</span> Idénettet
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-2 ${
              view === 'list'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.6)]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>📋</span> Listevisning ({philosophers.length})
          </button>
          <button
            onClick={() => setView('quiz')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-2 ${
              view === 'quiz'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.6)]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>🎭</span> Quizen
          </button>
          <button
            onClick={() => setComparingIds(['sokrates', 'platon'])}
            className="px-4 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-2 border border-gold/40 text-gold hover:bg-gold/15 shadow-sm"
          >
            <span>⚖️</span> Sammenlign
          </button>
          <button
            onClick={() => setView('factcheck')}
            className={`px-3.5 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-1.5 ${
              view === 'factcheck'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.6)]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>🛡️</span> Faktasjekk
          </button>
          <button
            onClick={() => setView('about')}
            className={`px-3.5 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-1.5 ${
              view === 'about'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.6)]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>ℹ️</span> Om
          </button>
        </nav>
      </header>

      {/* Hovedinnhold: Radaren, Tidslinjen, Idénettet eller Listevisning */}
      <main className="my-6 w-full flex flex-col items-center justify-center">
        {view === 'radar' ? (
          <RadarView
            philosophers={philosophers}
            onOpenCard={openCard}
            onStartCompare={(id) => setComparingIds([id])}
            onNavigateToTimeline={() => setView('timeline')}
            onNavigateToList={() => setView('list')}
          />
        ) : view === 'timeline' ? (
          <TimelineView
            philosophers={philosophers}
            onOpenCard={openCard}
          />
        ) : view === 'network' ? (
          <NetworkView
            philosophers={philosophers}
            onOpenCard={openCard}
            onNavigateToRadar={() => setView('radar')}
          />
        ) : view === 'quiz' ? (
          <QuizView
            philosophers={philosophers}
            onOpenCard={openCard}
            onNavigateToRadar={(highlightId) => {
              setView('radar');
              if (highlightId) {
                openCard(highlightId);
              }
            }}
          />
        ) : view === 'factcheck' ? (
          <FactCheckView
            philosophers={philosophers}
            onOpenCard={openCard}
          />
        ) : view === 'about' ? (
          <AboutView />
        ) : (
          <PhilosopherList
            philosophers={philosophers}
            onOpenCard={openCard}
          />
        )}
      </main>

      {/* Filosofkortet (glir inn fra høyre) */}
      {activePhilosopher && (
        <PhilosopherCard
          philosopher={activePhilosopher}
          allPhilosophers={philosophers}
          onClose={closeCard}
          onSelectPhilosopher={(id) => openCard(id)}
          onStartCompare={(id) => {
            closeCard();
            setComparingIds([id]);
          }}
          onViewTimeline={() => {
            closeCard();
            setView('timeline');
          }}
        />
      )}

      {/* Sammenligningskammeret (modal for 2-3 filosofer) */}
      {comparingIds && (
        <PhilosopherComparison
          initialIds={comparingIds}
          allPhilosophers={philosophers}
          onClose={() => setComparingIds(null)}
          onOpenPhilosopherCard={(id) => {
            setComparingIds(null);
            openCard(id);
          }}
        />
      )}

      {/* Footer med status og snarveier */}
      <footer className="w-full max-w-2xl text-center py-6 text-xs text-star-dim border-t border-white/10 flex flex-col items-center gap-2">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-serif">
          <button
            onClick={() => setView('factcheck')}
            className="hover:text-gold transition-colors underline underline-offset-4"
          >
            🛡️ Faktasjekk & Kvalitet
          </button>
          <span>·</span>
          <button
            onClick={() => setView('about')}
            className="hover:text-gold transition-colors underline underline-offset-4"
          >
            ℹ️ Om Observatoriet & Metodikk
          </button>
          <span>·</span>
          <button
            onClick={() => setView('quiz')}
            className="hover:text-gold transition-colors underline underline-offset-4"
          >
            🎭 Hvilken filosof ligner du på?
          </button>
        </div>
        <p className="mt-1 text-[11px] text-star-dim/70">
          Filosofradaren · Skapt av Olai & Asbjørn · Fase 8 (Lansering) · 100% åpen og personvernvennlig
        </p>
      </footer>
    </div>
  );
};

export default App;
