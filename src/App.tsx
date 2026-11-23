import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { PhilosopherList } from './features/list/PhilosopherList';
import { RadarView } from './features/radar/RadarView';
import { PhilosopherCard } from './features/card/PhilosopherCard';
import { DailyPhilosopher } from './features/daily/DailyPhilosopher';
import { TourPlayer } from './features/tours/TourPlayer';
import type { Tour } from './features/tours/types';
import { sound } from './lib/sound';
import { trackPageView, trackEvent } from './lib/telemetry';
import { isKnownPhilosopherId } from './lib/philosopherIndex';
import { isExperienceView as isExperience, isObservatoryView as isObservatory, isViewMode, urlFor, type ViewMode } from './lib/views';
import type { Philosopher } from './schemas/philosopher';
import philosophersData from './generated/philosophers.json';
import contentCounts from './generated/contentCounts.json';
import type { ExphilTab } from './features/exphil/ExphilHub';
import type { ThoughtExperiment } from './features/deepdive/types';

// Kodeoppdeling via lazy loading for sekundære og tyngre moduler
// Tidslinjen og idénettverket vises ikke på forsiden. Nettverket drar med seg d3-force,
// som ellers ble forhåndslastet på første side (YTE-06). Lista lastes ikke lat: den er
// det tilgjengelige alternativet til radaren og skal ikke blinke inn.
const TimelineView = React.lazy(() =>
  import('./features/timeline/TimelineView').then((m) => ({ default: m.TimelineView })),
);
const NetworkView = React.lazy(() =>
  import('./features/network/NetworkView').then((m) => ({ default: m.NetworkView })),
);
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
const StoryModal = React.lazy(() =>
  import('./features/story/StoryModal').then((m) => ({ default: m.StoryModal })),
);
const StoryGalleryModal = React.lazy(() =>
  import('./features/story/StoryGalleryModal').then((m) => ({ default: m.StoryGalleryModal })),
);
const EthicsLabView = React.lazy(() =>
  import('./features/ethics/EthicsLabView').then((m) => ({ default: m.EthicsLabView })),
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


export const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>('radar');
  const [lastObservatoryView, setLastObservatoryView] = useState<ViewMode>('radar');
  const [exphilTab, setExphilTab] = useState<ExphilTab>('duels');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [comparingIds, setComparingIds] = useState<string[] | null>(null);
  const [isClassroomMode, setIsClassroomMode] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(sound.enabled);
  const [isStoryGalleryOpen, setIsStoryGalleryOpen] = useState<boolean>(false);
  const [focusedRadarId, setFocusedRadarId] = useState<string | null>(null);
  const [activeStory, setActiveStory] = useState<{
    philosopherId: string;
    philosopherName: string;
    experiment: ThoughtExperiment;
  } | null>(null);

  const isObservatoryView = isObservatory(view);
  const isExperienceView = isExperience(view);

  // Nøyaktig ett nytt historikkpunkt per brukerhandling (ARK-03). Tilbake går da
  // alltid til det brukeren så sist, ikke til en mellomtilstand. Før ga Hjem to punkter,
  // og Tilbake viste filosofkortet over radaren.
  const pushUrl = useCallback((change: { view?: ViewMode; card?: string | null }) => {
    window.history.pushState({}, '', urlFor(window.location.href, change));
  }, []);

  const applyView = useCallback((nextView: ViewMode) => {
    setView(nextView);
    // En markering fra «Se på radaren» gjelder bare den ene gangen. Ellers dukket
    // den opp igjen neste gang radaren ble vist, f.eks. etter Tilbake.
    setFocusedRadarId(null);
    if (isObservatory(nextView)) setLastObservatoryView(nextView);
  }, []);

  const changeView = useCallback(
    (nextView: ViewMode) => {
      applyView(nextView);
      pushUrl({ view: nextView });
    },
    [applyView, pushUrl],
  );

  const selectObservatoryView = changeView;

  // Guidet tur tilstand
  const [isTourModalOpen, setIsTourModalOpen] = useState<boolean>(false);
  const [activeTour, setActiveTour] = useState<Tour | null>(null);
  const [activeTourStopIndex, setActiveTourStopIndex] = useState<number>(0);

  const startTour = useCallback((tour: Tour) => {
    setActiveTour(tour);
    setActiveTourStopIndex(0);
    setIsTourModalOpen(false);
    trackEvent('tur-startet-' + tour.id, 'Guidet tur: ' + tour.title);
    if (view !== 'radar' && view !== 'galaxy') {
      changeView('radar');
    }
  }, [view, changeView]);

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

  // Synkroniser med URL (?v=visning & ?f=filosof-id) (UU-10)
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const vParam = params.get('v');
      // Ukjente visninger i adressen gir radaren (hvitelisten er VIEWS).
      const nextView: ViewMode = isViewMode(vParam) ? vParam : 'radar';
      setView(nextView);
      if (isObservatory(nextView)) setLastObservatoryView(nextView);
      setFocusedRadarId(null);

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

  // Telemetri: Registrer sidevisninger ved SPA-navigasjon (GoatCounter)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return; // GoatCounters skript teller automatisk første sidevisning ved lasting
    }
    const currentPath = window.location.pathname + window.location.search;
    trackPageView(currentPath);
  }, [view, activeCardId]);

  const openCard = useCallback((id: string) => {
    // Som URL-stien over: ukjente ID-er åpner ingenting (ARK-01)
    if (!isKnownPhilosopherId(id)) return;
    setActiveCardId(id);
    pushUrl({ card: id });
  }, [pushUrl]);

  // «Se på radaren» fra alle visninger: bytt til radaren, lukk et åpent kort og marker
  // stjernen. Ex.phil-huben, galaksen og quizen åpnet tidligere kortet i stedet.
  // Ett nytt historikkpunkt, så Tilbake går til visningen man kom fra.
  const showOnRadar = useCallback((id?: string) => {
    setView('radar');
    setLastObservatoryView('radar');
    setActiveCardId(null);
    setFocusedRadarId(id && isKnownPhilosopherId(id) ? id : null);
    pushUrl({ view: 'radar', card: null });
    setTimeout(() => {
      document
        .getElementById('radar-canvas-container')
        ?.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
    }, 50);
  }, [pushUrl]);

  const closeCard = useCallback(() => {
    setActiveCardId(null);
    pushUrl({ card: null });
  }, [pushUrl]);

  // Hjem-knapp som nullstiller til Radaren fra hvilken som helst side
  const handleGoHome = useCallback(() => {
    applyView('radar');
    setActiveCardId(null);
    setComparingIds(null);
    setIsStoryGalleryOpen(false);
    setIsTourModalOpen(false);
    pushUrl({ view: 'radar', card: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [applyView, pushUrl]);

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
            {/* Kosmisk lyd-knapp (kompakt ikon med garantert berøringsflate UU-07) */}
            <button
              onClick={toggleSound}
              aria-label={isSoundEnabled ? 'Kosmisk lyd på' : 'Kosmisk lyd av'}
              title={isSoundEnabled ? 'Kosmisk lyd på (klikk for å dempe)' : 'Skru på kosmiske lyder og synthesizer'}
              className={`w-7 h-7 sm:w-8 sm:h-8 min-w-[28px] min-h-[28px] shrink-0 rounded-full flex items-center justify-center text-xs sm:text-sm transition-all border shadow-md ${
                isSoundEnabled
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.35)]'
                  : 'bg-cosmos-card/80 border-white/15 text-star-dim hover:text-white'
              }`}
            >
              {isSoundEnabled ? '🔊' : '🔈'}
            </button>

            {/* Om-knapp */}
            <button
              onClick={() => changeView('about')}
              aria-label="Om observatoriet og kilder"
              title="Om observatoriet, metodikk og kilder"
              className={`px-3 py-1 rounded-full text-xs font-serif transition-all border shadow-xs ${
                view === 'about' || view === 'factcheck'
                  ? 'bg-gold/20 border-gold text-gold font-bold shadow-[0_0_10px_rgba(246,200,95,0.3)]'
                  : 'bg-cosmos-card/80 border-white/15 text-star-dim hover:text-white'
              }`}
            >
              <span aria-hidden="true">ℹ️</span> Om
            </button>

            {/* Klasseromsmodus-knapp */}
            <button
              onClick={() => setIsClassroomMode((prev) => !prev)}
              aria-label={isClassroomMode ? 'Klasserom: Stor skrift på' : 'Klasserom: Presentasjonsvisning'}
              title="Skru av/på stor skrift og presentasjonsvisning for projektor"
              className={`px-3 py-1 rounded-full text-xs font-serif transition-all border shadow-xs ${
                isClassroomMode
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                  : 'bg-cosmos-card/80 border-white/15 text-star-dim hover:text-white'
              }`}
            >
              <span aria-hidden="true">🎓</span> {isClassroomMode ? 'Stor' : 'Klasserom'}
            </button>
          </div>
        </div>

        {/* Tittel som fungerer som Hjem-knapp og nullstiller til Radaren */}
        <button
          type="button"
          onClick={handleGoHome}
          aria-label="Gå til forsiden av Filosofradaren"
          title="Klikk for å gå til forsiden av Filosofradaren (radaren)"
          className="group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-gold rounded-xl px-3 py-1 cursor-pointer transition-all"
        >
          <h1 className="text-4xl md:text-5xl font-serif tracking-wider text-star-white drop-shadow-[0_0_25px_rgba(103,232,249,0.45)] group-hover:text-cyan-200 group-hover:drop-shadow-[0_0_30px_rgba(103,232,249,0.7)] transition-all">
            FILOSOFRADAREN
          </h1>
        </button>
        <p className="text-star-dim text-sm md:text-base mt-2 max-w-md mx-auto font-sans">
          Filosofiens historie som et levende stjernekart.
        </p>

        {/* De 3 Hovedrommene */}
        <nav
          aria-label="Hovedrom"
          className="flex flex-wrap items-center justify-center gap-2 mt-5 p-1.5 bg-cosmos-card/95 border border-white/15 rounded-full shadow-2xl"
        >
          <button
            onClick={() => selectObservatoryView(lastObservatoryView)}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-serif tracking-wider transition-all flex items-center gap-2 ${
              isObservatoryView
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_15px_rgba(246,200,95,0.6)] scale-[1.02]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>🔭</span> Observatoriet
          </button>

          <button
            onClick={() => changeView('exphil')}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-serif tracking-wider transition-all flex items-center gap-2 border ${
              view === 'exphil'
                ? 'bg-amber-400 text-cosmos font-bold border-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.6)] scale-[1.02]'
                : 'border-amber-400/30 text-amber-300 hover:bg-amber-400/10'
            }`}
            title="Eksamensmestring for Examen Philosophicum (dueller, flashcards og pensum)"
          >
            <span>🎓</span> Ex.phil & Studie
          </button>

          <button
            onClick={() => changeView('quiz')}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-serif tracking-wider transition-all flex items-center gap-2 ${
              isExperienceView
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_15px_rgba(246,200,95,0.6)] scale-[1.02]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>🎭</span> Opplevelser & Quiz
          </button>
        </nav>

        {/* Kontekstuell sub-meny for Observatoriet */}
        {isObservatoryView && (
          <nav
            aria-label="Observatorie-visninger"
            className="flex flex-wrap items-center justify-center gap-1.5 mt-3 p-1 bg-slate-900/70 border border-white/10 rounded-full shadow-lg animate-fadeIn text-xs"
          >
            <button
              onClick={() => selectObservatoryView('radar')}
              className={`px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                view === 'radar'
                  ? 'bg-gold/20 border border-gold text-gold font-bold shadow-xs'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              <span>✦</span> Radaren
            </button>
            <button
              onClick={() => selectObservatoryView('galaxy')}
              className={`px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                view === 'galaxy'
                  ? 'bg-gold/20 border border-gold text-gold font-bold shadow-xs'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              <span>🌌</span> 3D-Galaksen
            </button>
            <button
              onClick={() => selectObservatoryView('timeline')}
              className={`px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                view === 'timeline'
                  ? 'bg-gold/20 border border-gold text-gold font-bold shadow-xs'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              <span>⏳</span> Tidslinjen
            </button>
            <button
              onClick={() => selectObservatoryView('network')}
              className={`px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                view === 'network'
                  ? 'bg-gold/20 border border-gold text-gold font-bold shadow-xs'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              <span>🕸️</span> Idénettet
            </button>
            <button
              onClick={() => selectObservatoryView('list')}
              className={`px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                view === 'list'
                  ? 'bg-gold/20 border border-gold text-gold font-bold shadow-xs'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              <span>📋</span> Tabell ({philosophers.length})
            </button>
          </nav>
        )}

        {/* Kontekstuell sub-meny for Ex.phil & Studie */}
        {view === 'exphil' && (
          <nav
            aria-label="Ex.phil-moduler"
            className="flex flex-wrap items-center justify-center gap-1.5 mt-3 p-1 bg-slate-900/70 border border-amber-400/20 rounded-full shadow-lg animate-fadeIn text-xs"
          >
            <button
              onClick={() => setExphilTab('duels')}
              className={`px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                exphilTab === 'duels'
                  ? 'bg-amber-400 text-cosmos font-bold shadow-xs'
                  : 'text-amber-300 hover:text-white hover:bg-amber-400/10'
              }`}
            >
              <span>⚔️</span> Eksamensdueller
            </button>
            <button
              onClick={() => setExphilTab('flashcards')}
              className={`px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                exphilTab === 'flashcards'
                  ? 'bg-amber-400 text-cosmos font-bold shadow-xs'
                  : 'text-amber-300 hover:text-white hover:bg-amber-400/10'
              }`}
            >
              <span>🃏</span> Flashcards (Begrepsdrill)
            </button>
            <button
              onClick={() => setExphilTab('quiz')}
              className={`px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                exphilTab === 'quiz'
                  ? 'bg-amber-400 text-cosmos font-bold shadow-xs'
                  : 'text-amber-300 hover:text-white hover:bg-amber-400/10'
              }`}
            >
              <span>📝</span> Eksamens-drill
            </button>
            <button
              onClick={() => setExphilTab('syllabus')}
              className={`px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                exphilTab === 'syllabus'
                  ? 'bg-amber-400 text-cosmos font-bold shadow-xs'
                  : 'text-amber-300 hover:text-white hover:bg-amber-400/10'
              }`}
            >
              <span>📚</span> Pensumliste
            </button>
            <button
              onClick={() => changeView('ethics')}
              className="px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 text-amber-300 hover:text-white hover:bg-amber-400/10 border border-amber-400/30"
              title="Tren på etiske dilemmaer og normative teorier i Etikk-Laben"
            >
              <span>⚖️</span> Etikk-Lab
            </button>
            <button
              onClick={() => setComparingIds(['platon', 'aristoteles'])}
              className="px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 text-cyan-300 hover:text-white hover:bg-cyan-500/10 border border-cyan-400/30"
              title="Sammenlign to tenkere i sammenligningskammeret"
            >
              <span>⚖️</span> Sammenlign
            </button>
          </nav>
        )}

        {/* Kontekstuell sub-meny for Opplevelser & Quiz */}
        {isExperienceView && (
          <nav
            aria-label="Opplevelses-visninger"
            className="flex flex-wrap items-center justify-center gap-1.5 mt-3 p-1 bg-slate-900/70 border border-white/10 rounded-full shadow-lg animate-fadeIn text-xs"
          >
            <button
              onClick={() => changeView('quiz')}
              className={`px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                view === 'quiz'
                  ? 'bg-gold/20 border border-gold text-gold font-bold shadow-xs'
                  : 'text-star-dim hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🎭</span> Personlighetsquiz
            </button>
            <button
              onClick={() => changeView('ethics')}
              className={`px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 ${
                view === 'ethics'
                  ? 'bg-gold/20 border border-gold text-gold font-bold shadow-xs'
                  : 'text-star-dim hover:text-white hover:bg-white/5'
              }`}
            >
              <span>⚖️</span> Interaktiv Etikk-Lab
            </button>
            <button
              onClick={() => setIsStoryGalleryOpen(true)}
              className="px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 text-gold-bright hover:text-white bg-gold/10 hover:bg-gold/20 border border-gold/40 shadow-xs font-bold"
              title={`Åpne de ${contentCounts.stories} dramatiserte filosofiske historiene med tale`}
            >
              <span>📖</span> {contentCounts.stories} Filosofiske Historier
            </button>
            <button
              onClick={() => setIsTourModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 text-star-dim hover:text-white hover:bg-white/5"
              title="Start en kuratert historisk idéreise"
            >
              <span>🧭</span> Guidede turer
            </button>
            <button
              onClick={() => setComparingIds(['sokrates', 'platon'])}
              className="px-3.5 py-1.5 rounded-full font-serif tracking-wider transition-all flex items-center gap-1.5 text-cyan-300 hover:text-white hover:bg-cyan-500/10 border border-cyan-400/30"
              title="Sammenlign to filosofer side om side"
            >
              <span>⚖️</span> Sammenlign to tenkere
            </button>
          </nav>
        )}
      </header>

      {/* Dagens filosof (vises elegant øverst i observatoriet) */}
      {isObservatoryView && (
        <div className="w-full mt-4">
          <DailyPhilosopher
            philosophers={philosophers}
            onOpenCard={openCard}
            onNavigateToRadar={showOnRadar}
          />
        </div>
      )}

      {/* Hovedinnhold: Radaren, 3D-Galaksen, Tidslinjen, Idénettet, Listevisning osv. */}
      <main className="my-4 w-full flex flex-col items-center justify-center">
        <Suspense fallback={<ViewFallback />}>
          {view === 'radar' ? (
            <RadarView
              philosophers={philosophers}
              onOpenCard={openCard}
              onStartCompare={(id) => setComparingIds([id])}
              onNavigateToTimeline={() => changeView('timeline')}
              onNavigateToList={() => changeView('list')}
              focusPhilosopherId={focusedRadarId || currentTourStop?.philosopherId}
            />
          ) : view === 'galaxy' ? (
            <Galaxy3DView
              philosophers={philosophers}
              onOpenCard={openCard}
              onNavigateToRadar={showOnRadar}
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
              onNavigateToRadar={() => changeView('radar')}
            />
          ) : view === 'exphil' ? (
            <ExphilHub
              philosophers={philosophers}
              onOpenCard={openCard}
              onComparePhilosophers={(ids) => setComparingIds(ids)}
              onNavigateToRadar={showOnRadar}
              activeTab={exphilTab}
              onTabChange={setExphilTab}
            />
          ) : view === 'quiz' ? (
            <QuizView
              philosophers={philosophers}
              onOpenCard={openCard}
              onNavigateToRadar={showOnRadar}
            />
          ) : view === 'ethics' ? (
            <EthicsLabView
              philosophers={philosophers}
              onOpenPhilosopherCard={openCard}
              onNavigateToExphilHub={() => changeView('exphil')}
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
            changeView('timeline');
          }}
          onNavigateToExphilHub={() => {
            closeCard();
            changeView('exphil');
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

      {/* Filosofiske historier (Story-galleri modal) */}
      {isStoryGalleryOpen && (
        <Suspense fallback={null}>
          <StoryGalleryModal
            onSelectStory={(story) => {
              setIsStoryGalleryOpen(false);
              setActiveStory(story);
            }}
            onClose={() => setIsStoryGalleryOpen(false)}
          />
        </Suspense>
      )}

      {/* StoryModal (når en historie spilles av direkte fra galleri eller toppmeny) */}
      {activeStory && (
        <Suspense fallback={null}>
          <StoryModal
            philosopherId={activeStory.philosopherId}
            philosopherName={activeStory.philosopherName}
            experiment={activeStory.experiment}
            onClose={() => setActiveStory(null)}
            onExploreDeepDive={
              isKnownPhilosopherId(activeStory.philosopherId)
                ? () => {
                    const id = activeStory.philosopherId;
                    setActiveStory(null);
                    openCard(id);
                  }
                : undefined
            }
          />
        </Suspense>
      )}

      {/* Footer med status og snarveier */}
      <footer className="w-full max-w-2xl text-center py-6 text-xs text-star-dim border-t border-white/10 flex flex-col items-center gap-2">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-serif">
          <button
            onClick={() => changeView('exphil')}
            className="py-1.5 px-1 inline-flex items-center hover:text-gold transition-colors underline underline-offset-4 text-amber-300 font-bold"
          >
            🎓 Ex.phil Studie-hub
          </button>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => changeView('ethics')}
            className="py-1.5 px-1 inline-flex items-center hover:text-gold transition-colors underline underline-offset-4 text-cyan-300 font-bold"
          >
            ⚖️ Interaktiv Etikk-Lab
          </button>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => setIsStoryGalleryOpen(true)}
            className="py-1.5 px-1 inline-flex items-center hover:text-gold transition-colors underline underline-offset-4 text-gold font-bold"
          >
            📖 {contentCounts.stories} Historier
          </button>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => setIsTourModalOpen(true)}
            className="py-1.5 px-1 inline-flex items-center hover:text-gold transition-colors underline underline-offset-4"
          >
            🧭 Guidede turer
          </button>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => changeView('factcheck')}
            className="py-1.5 px-1 inline-flex items-center hover:text-gold transition-colors underline underline-offset-4"
          >
            🛡️ Faktasjekk & Kvalitet
          </button>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => changeView('about')}
            className="py-1.5 px-1 inline-flex items-center hover:text-gold transition-colors underline underline-offset-4"
          >
            ℹ️ Om Observatoriet & Metodikk
          </button>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => changeView('quiz')}
            className="py-1.5 px-1 inline-flex items-center hover:text-gold transition-colors underline underline-offset-4"
          >
            🎭 Hvilken filosof ligner du på?
          </button>
          <span aria-hidden="true">·</span>
          <a
            href="mailto:selvgaaende+filosofradar@gmail.com?subject=Henvendelse%20fra%20Filosofradaren"
            className="py-1.5 px-1 inline-flex items-center hover:text-gold transition-colors underline underline-offset-4"
            title="Send e-post til Filosofradaren"
          >
            ✉️ Kontakt (Molde)
          </a>
        </div>
        <p className="mt-1 text-[11px] text-star-dim">
          Filosofradaren · Et åpent observatorium over filosofiens historie · 100% åpen og personvernvennlig
        </p>
      </footer>
    </div>
  );
};

export default App;
