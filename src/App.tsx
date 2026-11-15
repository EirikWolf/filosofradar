import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { PhilosopherList } from './features/list/PhilosopherList';
import { TimelineView } from './features/timeline/TimelineView';
import { RadarView } from './features/radar/RadarView';
import { NetworkView } from './features/network/NetworkView';
import { PhilosopherCard } from './features/card/PhilosopherCard';
import { DailyPhilosopher } from './features/daily/DailyPhilosopher';
import { TourPlayer } from './features/tours/TourPlayer';
import type { Tour } from './features/tours/types';
import { sound } from './lib/sound';
import type { Philosopher } from './schemas/philosopher';
import philosophersData from './generated/philosophers.json';

// Kodeoppdeling via lazy loading for sekundære og tyngre moduler
const Galaxy3DView = React.lazy(() =>
  import('./features/galaxy/Galaxy3DView').then((m) => ({ default: m.Galaxy3DView })),
);
const QuizView = React.lazy(() =>
  import('./features/quiz/QuizView').then((m) => ({ default: m.QuizView })),
);
const ExphilHub = React.lazy(() =>
  import('./features/exphil/ExphilHub').then((m) => ({ default: m.ExphilHub })),
);
const AboutView = React.lazy(() =>
  import('./features/about/AboutView').then((m) => ({ default: m.AboutView })),
);
const PhilosopherComparison = React.lazy(() =>
  import('./features/comparison/PhilosopherComparison').then((m) => ({
    default: m.PhilosopherComparison,
  })),
);
const TourSelectModal = React.lazy(() =>
  import('./features/tours/TourSelectModal').then((m) => ({ default: m.TourSelectModal })),
);

const ViewFallback: React.FC = () => (
  <div
    className="flex flex-col items-center justify-center min-h-[400px] text-star-dim gap-3"
    role="status"
    aria-label="Laster visning..."
  >
    <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
    <span className="text-xs font-serif tracking-wider uppercase text-gold/80">Laster observatoriet...</span>
  </div>
);

const philosophers = philosophersData as Philosopher[];

type ViewMode = 'radar' | 'galaxy' | 'timeline' | 'network' | 'list' | 'quiz' | 'exphil' | 'factcheck' | 'about';

export const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('radar');
  const [lastObservatoryView, setLastObservatoryView] = useState<ViewMode>('radar');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [comparingIds, setComparingIds] = useState<string[] | null>(null);
  const [isClassroomMode, setIsClassroomMode] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(sound.enabled);

  const isObservatoryView =
    view === 'radar' || view === 'galaxy' || view === 'timeline' || view === 'network' || view === 'list';

  const selectObservatoryView = useCallback((v: ViewMode) => {
    setView(v);
    setLastObservatoryView(v);
  }, []);

  // Guidet tur tilstand
  const [isTourModalOpen, setIsTourModalOpen] = useState<boolean>(false);
  const [activeTour, setActiveTour] = useState<Tour | null>(null);
  const [activeTourStopIndex, setActiveTourStopIndex] = useState<number>(0);

  const startTour = useCallback((tour: Tour) => {
    setActiveTour(tour);
    setActiveTourStopIndex(0);
    setIsTourModalOpen(false);
    if (view !== 'radar' && view !== 'galaxy') {
      setView('radar');
    }
  }, [view]);

  const nextTourStop = useCallback(() => {
    if (!activeTour) return;
    if (activeTourStopIndex < activeTour.stops.length - 1) {
      setActiveTourStopIndex((prev) => prev + 1);
    }
  }, [activeTour, activeTourStopIndex]);

  const prevTourStop = useCallback(() => {
    if (activeTourStopIndex > 0) {
      setActiveTourStopIndex((prev) => prev - 1);
    }
  }, [activeTourStopIndex]);

  const exitTour = useCallback(() => {
    setActiveTour(null);
    setActiveTourStopIndex(0);
  }, []);

  const currentTourStop = activeTour ? activeTour.stops[activeTourStopIndex] : null;
  const tourPhilosopher = currentTourStop
    ? philosophers.find((p) => p.id === currentTourStop.philosopherId) || null
    : null;

  const toggleSound = useCallback(() => {
    const next = sound.toggle();
    setIsSoundEnabled(next);
  }, []);

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
        {/* Kontroll-linje i toppen */}
        <div className="flex items-center justify-between w-full max-w-4xl px-2 mb-3 text-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-dim bg-cosmos-card/90 text-gold text-xs uppercase tracking-widest font-serif shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-glow animate-ping" />
            Observatoriet // {philosophers.length} stjerner aktive
          </div>

          <div className="flex items-center gap-2">
            {/* Kosmisk lyd-knapp (kompakt ikon) */}
            <button
              onClick={toggleSound}
              aria-label={isSoundEnabled ? 'Kosmisk lyd på' : 'Kosmisk lyd av'}
              title={isSoundEnabled ? 'Kosmisk lyd på (klikk for å dempe)' : 'Skru på kosmiske lyder og synthesizer'}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm transition-all border shadow-md ${
                isSoundEnabled
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.35)]'
                  : 'bg-cosmos-card/80 border-white/15 text-star-dim hover:text-white'
              }`}
            >
              {isSoundEnabled ? '🔊' : '🔈'}
            </button>

            {/* Om-knapp */}
            <button
              onClick={() => setView('about')}
              aria-label="Om observatoriet og kilder"
              title="Om observatoriet, metodikk og kilder"
              className={`px-3 py-1 rounded-full text-xs font-serif transition-all border shadow-sm ${
                view === 'about' || view === 'factcheck'
                  ? 'bg-gold/20 border-gold text-gold font-bold shadow-[0_0_10px_rgba(246,200,95,0.3)]'
                  : 'bg-cosmos-card/80 border-white/15 text-star-dim hover:text-white'
              }`}
            >
              <span>ℹ️</span> Om
            </button>

            {/* Klasseromsmodus-knapp */}
            <button
              onClick={() => setIsClassroomMode((prev) => !prev)}
              aria-label="Klasseromsmodus for storskjerm"
              title="Skru av/på stor skrift og presentasjonsvisning for projektor"
              className={`px-3 py-1 rounded-full text-xs font-serif transition-all border shadow-sm ${
                isClassroomMode
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                  : 'bg-cosmos-card/80 border-white/15 text-star-dim hover:text-white'
              }`}
            >
              <span>🎓</span> {isClassroomMode ? 'Stor' : 'Klasserom'}
            </button>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif tracking-wider text-star-white drop-shadow-[0_0_25px_rgba(103,232,249,0.45)]">
          FILOSOFRADAREN
        </h1>
        <p className="text-star-dim text-sm md:text-base mt-2 max-w-md mx-auto font-sans">
          Filosofiens historie som et levende stjernekart.
        </p>

        {/* De 3 Hovedrommene */}
        <nav
          aria-label="Hovedrom"
          className="flex flex-wrap items-center justify-center gap-2 mt-5 p-1.5 bg-cosmos-card/95 border border-white/15 rounded-full shadow-2xl"
        >
          <button
            onClick={() => setView(lastObservatoryView)}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-serif tracking-wider transition-all flex items-center gap-2 ${
              isObservatoryView
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_15px_rgba(246,200,95,0.6)] scale-[1.02]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>🔭</span> Observatoriet
          </button>

          <button
            onClick={() => setView('exphil')}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-serif tracking-wider transition-all flex items-center gap-2 border ${
              view === 'exphil'
                ? 'bg-amber-400 text-cosmos font-bold border-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.6)] scale-[1.02]'
                : 'border-amber-400/30 text-amber-300 hover:bg-amber-400/10'
            }`}
            title="Eksamensmestring for Examen Philosophicum (radar, flashcards og debattarena)"
          >
            <span>🎓</span> Ex.phil Studie-Hub
          </button>

          <button
            onClick={() => setView('quiz')}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-serif tracking-wider transition-all flex items-center gap-2 ${
              view === 'quiz'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_15px_rgba(246,200,95,0.6)] scale-[1.02]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>🎭</span> Quizen & Opplevelser
          </button>
        </nav>

        {/* Under-velger for Observatoriet */}
        {isObservatoryView && (
          <nav
            aria-label="Observatorie-visninger"
            className="flex flex-wrap items-center justify-center gap-1.5 mt-3 p-1 bg-slate-900/70 border border-white/10 rounded-full shadow-lg animate-fadeIn"
          >
            <button
              onClick={() => selectObservatoryView('radar')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                view === 'radar'
                  ? 'bg-gold/20 border border-gold text-gold font-bold shadow-sm'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              <span>✦</span> Radaren
            </button>
            <button
              onClick={() => selectObservatoryView('galaxy')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                view === 'galaxy'
                  ? 'bg-gold/20 border border-gold text-gold font-bold shadow-sm'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              <span>🌌</span> 3D-Galaksen
            </button>
            <button
              onClick={() => selectObservatoryView('timeline')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                view === 'timeline'
                  ? 'bg-gold/20 border border-gold text-gold font-bold shadow-sm'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              <span>⏳</span> Tidslinjen
            </button>
            <button
              onClick={() => selectObservatoryView('network')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                view === 'network'
                  ? 'bg-gold/20 border border-gold text-gold font-bold shadow-sm'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              <span>🕸️</span> Idénettet
            </button>
            <button
              onClick={() => selectObservatoryView('list')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                view === 'list'
                  ? 'bg-gold/20 border border-gold text-gold font-bold shadow-sm'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              <span>📋</span> Tabell ({philosophers.length})
            </button>
          </nav>
        )}

        {/* Hurtig-snarveier når man er i Quizen & Opplevelser */}
        {view === 'quiz' && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-3 animate-fadeIn text-xs">
            <span className="text-star-dim italic">Utforsk flere opplevelser:</span>
            <button
              onClick={() => setIsTourModalOpen(true)}
              className="px-3.5 py-1 rounded-full font-serif border border-gold/40 bg-gold/10 text-gold hover:bg-gold hover:text-cosmos transition-all flex items-center gap-1.5 font-bold shadow-sm"
            >
              <span>🧭</span> Start en guidet tur
            </button>
            <button
              onClick={() => setComparingIds(['sokrates', 'platon'])}
              className="px-3.5 py-1 rounded-full font-serif border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all flex items-center gap-1.5 font-bold shadow-sm"
            >
              <span>⚖️</span> Sammenlign to tenkere
            </button>
          </div>
        )}
      </header>

      {/* Dagens filosof (vises elegant øverst i observatoriet) */}
      <div className="w-full mt-4">
        <DailyPhilosopher
          philosophers={philosophers}
          onOpenCard={openCard}
          onNavigateToRadar={(id) => {
            setView('radar');
            openCard(id);
          }}
        />
      </div>

      {/* Hovedinnhold: Radaren, 3D-Galaksen, Tidslinjen, Idénettet, Listevisning osv. */}
      <main className="my-4 w-full flex flex-col items-center justify-center">
        <Suspense fallback={<ViewFallback />}>
          {view === 'radar' ? (
            <RadarView
              philosophers={philosophers}
              onOpenCard={openCard}
              onStartCompare={(id) => setComparingIds([id])}
              onNavigateToTimeline={() => setView('timeline')}
              onNavigateToList={() => setView('list')}
              focusPhilosopherId={currentTourStop?.philosopherId}
            />
          ) : view === 'galaxy' ? (
            <Galaxy3DView
              philosophers={philosophers}
              onOpenCard={openCard}
              onNavigateToRadar={(id) => {
                setView('radar');
                if (id) openCard(id);
              }}
              focusPhilosopherId={currentTourStop?.philosopherId}
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
          ) : view === 'exphil' ? (
            <ExphilHub
              philosophers={philosophers}
              onOpenCard={openCard}
              onComparePhilosophers={(ids) => setComparingIds(ids)}
              onNavigateToRadar={(focusId) => {
                setView('radar');
                if (focusId) {
                  openCard(focusId);
                }
              }}
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
          ) : view === 'about' || view === 'factcheck' ? (
            <AboutView
              philosophers={philosophers}
              onOpenCard={openCard}
              defaultTab={view === 'factcheck' ? 'factcheck' : 'about'}
            />
          ) : (
            <PhilosopherList
              philosophers={philosophers}
              onOpenCard={openCard}
            />
          )}
        </Suspense>
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
          onNavigateToExphilHub={() => {
            closeCard();
            setView('exphil');
          }}
        />
      )}

      {/* Sammenligningskammeret (modal for 2-3 filosofer) */}
      {comparingIds && (
        <Suspense fallback={null}>
          <PhilosopherComparison
            initialIds={comparingIds}
            allPhilosophers={philosophers}
            onClose={() => setComparingIds(null)}
            onOpenPhilosopherCard={(id) => {
              setComparingIds(null);
              openCard(id);
            }}
          />
        </Suspense>
      )}

      {/* Guidet tur modal og spiller */}
      {isTourModalOpen && (
        <Suspense fallback={null}>
          <TourSelectModal
            philosophers={philosophers}
            onSelectTour={startTour}
            onClose={() => setIsTourModalOpen(false)}
          />
        </Suspense>
      )}

      {activeTour && tourPhilosopher && (
        <TourPlayer
          tour={activeTour}
          currentStopIndex={activeTourStopIndex}
          philosopher={tourPhilosopher}
          onNextStop={nextTourStop}
          onPrevStop={prevTourStop}
          onSelectStopIndex={(idx) => setActiveTourStopIndex(idx)}
          onOpenPhilosopherCard={(id) => openCard(id)}
          onExitTour={exitTour}
        />
      )}

      {/* Footer med status og snarveier */}
      <footer className="w-full max-w-2xl text-center py-6 text-xs text-star-dim border-t border-white/10 flex flex-col items-center gap-2">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-serif">
          <button
            onClick={() => setView('exphil')}
            className="hover:text-gold transition-colors underline underline-offset-4 text-amber-300 font-bold"
          >
            🎓 Ex.phil Studie-hub
          </button>
          <span>·</span>
          <button
            onClick={() => setIsTourModalOpen(true)}
            className="hover:text-gold transition-colors underline underline-offset-4"
          >
            🧭 Guidede turer
          </button>
          <span>·</span>
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
          Filosofradaren · Et åpent observatorium over filosofiens historie · 100% åpen og personvernvennlig
        </p>
      </footer>
    </div>
  );
};

export default App;
