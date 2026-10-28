import React, { useState } from 'react';
import type { Philosopher } from '../../schemas/philosopher';
import { EXPHIL_PHILOSOPHER_IDS, EXPHIL_PROFILES } from './exphilData';
import { ExphilDuelsView } from './ExphilDuelsView';
import { ExphilFlashcardsView } from './ExphilFlashcardsView';
import { ExphilQuizView } from './ExphilQuizView';
import { sound } from '../../lib/sound';
import { formatLifeSpan } from '../../lib/years';

interface ExphilHubProps {
  philosophers: Philosopher[];
  onOpenCard: (id: string) => void;
  onComparePhilosophers: (ids: string[]) => void;
  onNavigateToRadar: (focusId?: string) => void;
}

type ExphilTab = 'duels' | 'flashcards' | 'quiz' | 'syllabus';

export const ExphilHub: React.FC<ExphilHubProps> = ({
  philosophers,
  onOpenCard,
  onComparePhilosophers,
  onNavigateToRadar,
}) => {
  const [activeTab, setActiveTab] = useState<ExphilTab>('duels');

  // Filtrer filosofene til de som er på ex.phil-pensum
  const exphilPhilosophers = philosophers.filter((p) => EXPHIL_PHILOSOPHER_IDS.has(p.id));

  const handleTabChange = (tab: ExphilTab) => {
    setActiveTab(tab);
    sound.playStarSelect();
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-6 px-2 sm:px-4 animate-in fade-in pb-12">
      {/* Banner / Header */}
      <div className="w-full text-center max-w-3xl py-4 border-b border-white/10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-serif uppercase tracking-widest shadow-lg mb-3">
          <span>🎓</span> Eksamensmestring for Examen Philosophicum
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-star-white drop-shadow-[0_0_25px_rgba(246,200,95,0.3)]">
          EX.PHIL STUDIE-HUB
        </h1>
        <p className="text-sm md:text-base text-star-dim font-sans mt-2 max-w-2xl mx-auto">
          Skreddersydd for studenter ved UiO, NTNU, UiB, UiT m.fl. Drøft de klassiske motsetningene, drill fagbegrepene og lær nøyaktig hva sensor ser etter på eksamensdagen.
        </p>

        {/* Tab-velger */}
        <nav className="flex flex-wrap items-center justify-center gap-2 mt-6 p-1.5 bg-cosmos-card/90 border border-white/10 rounded-full shadow-xl">
          <button
            onClick={() => handleTabChange('duels')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'duels'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.6)]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>⚔️</span> Eksamensdueller
          </button>
          <button
            onClick={() => handleTabChange('flashcards')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'flashcards'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.6)]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>🃏</span> Flashcards (Begrepsdrill)
          </button>
          <button
            onClick={() => handleTabChange('quiz')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'quiz'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.6)]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>📝</span> Eksamens-drill
          </button>
          <button
            onClick={() => handleTabChange('syllabus')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'syllabus'
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.6)]'
                : 'text-star-dim hover:text-white'
            }`}
          >
            <span>📚</span> Pensumliste ({exphilPhilosophers.length})
          </button>
        </nav>
      </div>

      {/* Aktiv modul */}
      <div className="w-full mt-2">
        {activeTab === 'duels' ? (
          <ExphilDuelsView
            onOpenPhilosopherCard={onOpenCard}
            onComparePhilosophers={onComparePhilosophers}
          />
        ) : activeTab === 'flashcards' ? (
          <ExphilFlashcardsView
            onOpenPhilosopherCard={onOpenCard}
          />
        ) : activeTab === 'quiz' ? (
          <ExphilQuizView
            onOpenPhilosopherCard={onOpenCard}
          />
        ) : (
          /* SYLLABUS-OVERSIKT */
          <div className="w-full max-w-5xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-cosmos-card border border-gold/30">
              <div>
                <h3 className="text-base font-serif font-bold text-star-white">
                  Kjernepensum: {exphilPhilosophers.length} sentrale tenkere
                </h3>
                <p className="text-xs text-star-dim font-sans mt-0.5">
                  Klikk på en filosof for å se full eksamensguide med sensors nøkkelord og typiske feller.
                </p>
              </div>
              <button
                onClick={() => onNavigateToRadar()}
                className="px-4 py-2 rounded-xl bg-gold/15 border border-gold text-gold font-serif text-xs font-bold hover:bg-gold hover:text-cosmos transition-all"
              >
                ✦ Se alle på Radaren
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {exphilPhilosophers.map((phil) => {
                const profile = EXPHIL_PROFILES[phil.id];
                return (
                  <div
                    key={phil.id}
                    className="p-4 rounded-2xl bg-cosmos-card border border-white/10 hover:border-gold/40 transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-[10px] font-serif uppercase tracking-wider text-gold">
                          {profile ? profile.subPillar : phil.tradition}
                        </span>
                        <span className="text-[10px] text-star-dim font-serif">
                          {formatLifeSpan(phil)}
                        </span>
                      </div>
                      <h4 className="text-base font-serif font-bold text-star-white group-hover:text-gold transition-colors">
                        {phil.name}
                      </h4>
                      <p className="text-xs text-star-dim font-sans line-clamp-2 mt-1">
                        {profile ? profile.coreTakeaway : phil.themeNotes}
                      </p>
                    </div>

                    {profile && profile.examKeywords.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {profile.examKeywords.slice(0, 3).map((kw, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gold-bright font-serif"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => onOpenCard(phil.id)}
                        className="text-xs font-serif font-bold text-gold hover:underline flex items-center gap-1"
                      >
                        🎓 Eksamensguide ↗
                      </button>
                      <button
                        onClick={() => onNavigateToRadar(phil.id)}
                        className="text-xs font-serif text-star-dim hover:text-white"
                        title="Finn på stjernekartet"
                      >
                        ✦ Radaren
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
