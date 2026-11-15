import React, { useState, useEffect, useMemo } from 'react';
import { getAllBespokeStories, type StorySummary } from './storyData';
import { PHILOSOPHER_DEEP_DIVES } from '../deepdive/deepDiveData';
import { EXPHIL_PHILOSOPHER_IDS } from '../exphil/exphilData';
import type { ThoughtExperiment } from '../deepdive/types';
import { sound } from '../../lib/sound';

interface StoryGalleryModalProps {
  onSelectStory: (story: {
    philosopherId: string;
    philosopherName: string;
    experiment: ThoughtExperiment;
  }) => void;
  onClose: () => void;
}

type CategoryFilter = 'all' | 'exphil' | 'ancient' | 'early-modern' | 'modern';

const ANCIENT_IDS = new Set([
  'sokrates',
  'platon',
  'aristoteles',
  'diogenes',
  'zhuangzi',
  'augustin',
  'aquinas',
  'ibn-sina',
]);

const EARLY_MODERN_IDS = new Set([
  'descartes',
  'spinoza',
  'locke',
  'hobbes',
  'hume',
  'rousseau',
  'kant',
  'wollstonecraft',
  'hegel',
]);

export const StoryGalleryModal: React.FC<StoryGalleryModalProps> = ({
  onSelectStory,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const allStories = useMemo(() => getAllBespokeStories(), []);

  // Tastatursnarvei: Escape lukker modalen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filteredStories = useMemo(() => {
    return allStories.filter((s) => {
      // Kategori-sjekk
      if (activeCategory === 'exphil') {
        if (!EXPHIL_PHILOSOPHER_IDS.has(s.philosopherId)) return false;
      } else if (activeCategory === 'ancient') {
        if (!ANCIENT_IDS.has(s.philosopherId)) return false;
      } else if (activeCategory === 'early-modern') {
        if (!EARLY_MODERN_IDS.has(s.philosopherId)) return false;
      } else if (activeCategory === 'modern') {
        if (ANCIENT_IDS.has(s.philosopherId) || EARLY_MODERN_IDS.has(s.philosopherId)) return false;
      }

      // Søkefilter
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        s.philosopherName.toLowerCase().includes(term) ||
        s.experimentTitle.toLowerCase().includes(term) ||
        s.headline.toLowerCase().includes(term) ||
        s.teaser.toLowerCase().includes(term)
      );
    });
  }, [allStories, activeCategory, searchTerm]);

  const handleLaunchStory = (summary: StorySummary) => {
    sound.playStarSelect();
    const deepDive = PHILOSOPHER_DEEP_DIVES[summary.philosopherId];
    const experiment = deepDive?.thoughtExperiments?.find(
      (te) => te.title.toLowerCase().includes(summary.experimentTitle.toLowerCase()) ||
              summary.experimentTitle.toLowerCase().includes(te.title.toLowerCase())
    ) || {
      title: summary.experimentTitle,
      description: summary.teaser,
      takeaway: summary.headline,
      image: summary.image,
      icon: summary.icon,
    };

    onSelectStory({
      philosopherId: summary.philosopherId,
      philosopherName: summary.philosopherName,
      experiment,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-cosmos-darkest/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${allStories.length} Filosofiske Historier (Story-modus)`}
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-cosmos-card/95 border border-gold/40 rounded-3xl shadow-2xl overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-white/10 bg-cosmos-card">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs uppercase tracking-widest font-serif mb-2">
              ✦ Opplevelser // Story-modus
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              {allStories.length} Filosofiske Historier
            </h2>
            <p className="text-xs sm:text-sm text-star-dim mt-1 max-w-2xl font-sans">
              Opplev historiens største tankeeksperimenter som levende, 4-delte historier med stemmeopplesning,
              visuelle knagger og eksamensrelevante poenger.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Lukk (Esc)"
            title="Lukk (Esc)"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-star-dim hover:text-white flex items-center justify-center text-lg transition-colors border border-white/10"
          >
            ✕
          </button>
        </div>

        {/* Filter- og søkelinje */}
        <div className="p-4 sm:px-6 bg-slate-900/60 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          {/* Kategori-piller */}
          <div className="flex flex-wrap gap-1.5 text-xs font-serif">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 rounded-full border transition-all ${
                activeCategory === 'all'
                  ? 'bg-gold text-cosmos font-bold border-gold shadow-sm'
                  : 'bg-cosmos-card/80 border-white/10 text-star-dim hover:text-white'
              }`}
            >
              Alle ({allStories.length})
            </button>
            <button
              onClick={() => setActiveCategory('exphil')}
              className={`px-3 py-1 rounded-full border transition-all ${
                activeCategory === 'exphil'
                  ? 'bg-amber-400 text-cosmos font-bold border-amber-400 shadow-sm'
                  : 'bg-cosmos-card/80 border-amber-400/30 text-amber-300 hover:bg-amber-400/10'
              }`}
            >
              🎓 Ex.phil pensum
            </button>
            <button
              onClick={() => setActiveCategory('ancient')}
              className={`px-3 py-1 rounded-full border transition-all ${
                activeCategory === 'ancient'
                  ? 'bg-gold text-cosmos font-bold border-gold shadow-sm'
                  : 'bg-cosmos-card/80 border-white/10 text-star-dim hover:text-white'
              }`}
            >
              🏺 Antikken & Middelalder
            </button>
            <button
              onClick={() => setActiveCategory('early-modern')}
              className={`px-3 py-1 rounded-full border transition-all ${
                activeCategory === 'early-modern'
                  ? 'bg-gold text-cosmos font-bold border-gold shadow-sm'
                  : 'bg-cosmos-card/80 border-white/10 text-star-dim hover:text-white'
              }`}
            >
              📜 Nytid & Opplysning
            </button>
            <button
              onClick={() => setActiveCategory('modern')}
              className={`px-3 py-1 rounded-full border transition-all ${
                activeCategory === 'modern'
                  ? 'bg-gold text-cosmos font-bold border-gold shadow-sm'
                  : 'bg-cosmos-card/80 border-white/10 text-star-dim hover:text-white'
              }`}
            >
              💡 Moderne tid
            </button>
          </div>

          {/* Søkefelt */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Søk i historier..."
              aria-label="Søk i historier"
              className="w-full px-3 py-1.5 text-xs bg-cosmos/80 border border-white/15 rounded-full text-white placeholder-star-dim/60 focus:outline-none focus:border-gold/60"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1.5 text-star-dim hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Historie-kort grid */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(92vh-220px)] space-y-4">
          {filteredStories.length === 0 ? (
            <div className="py-12 text-center text-star-dim font-serif text-sm">
              Ingen historier matcher søket ditt.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStories.map((story) => (
                <div
                  key={story.key}
                  onClick={() => handleLaunchStory(story)}
                  className="group relative flex flex-col justify-between bg-cosmos-card border border-white/10 hover:border-gold/50 rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-[0_0_20px_rgba(246,200,95,0.2)] hover:scale-[1.01] cursor-pointer"
                >
                  {/* Bilde-header */}
                  <div className="relative w-full h-36 bg-slate-950 overflow-hidden">
                    {story.image ? (
                      <img
                        src={story.image}
                        alt={story.experimentTitle}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-indigo-950 to-slate-900">
                        {story.icon || '📖'}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmos-card via-transparent to-black/30" />

                    {/* Filosof-merke */}
                    <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cosmos-darkest/90 border border-white/20 text-xs font-serif font-bold text-star-white shadow-md">
                      <span>{story.icon || '✦'}</span>
                      <span>{story.philosopherName}</span>
                    </div>

                    {/* Tale-merke */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[10px] text-cyan-300 font-sans shadow-sm">
                      <span>🔊</span> Tale
                    </div>
                  </div>

                  {/* Tekstinnhold */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-serif font-bold text-star-white group-hover:text-gold transition-colors leading-snug">
                        {story.experimentTitle}
                      </h3>
                      {story.subheadline && (
                        <p className="text-xs text-gold/80 italic font-serif mt-0.5">
                          {story.subheadline}
                        </p>
                      )}
                      <p className="text-xs text-star-dim font-sans mt-2 line-clamp-3 leading-relaxed">
                        {story.teaser}
                      </p>
                    </div>

                    {/* Bunnhandling */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-serif text-star-dim">
                        ⏱️ ~{story.totalDurationSeconds}s · 4 faser
                      </span>
                      <span className="font-serif font-bold text-gold group-hover:underline flex items-center gap-1">
                        ▶ Spill story
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
