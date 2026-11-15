import React, { useState } from 'react';
import type { Philosopher } from '../../schemas/philosopher';
import {
  ETHICAL_DILEMMAS,
  ETHICAL_SCHOOL_META,
  calculateEthicsProfile,
} from './dilemmaData';
import type { DilemmaOption, EthicalSchool } from './types';
import { sound } from '../../lib/sound';

interface EthicsLabViewProps {
  philosophers: Philosopher[];
  onOpenPhilosopherCard: (id: string) => void;
  onNavigateToExphilHub?: () => void;
}

export const EthicsLabView: React.FC<EthicsLabViewProps> = ({
  philosophers,
  onOpenPhilosopherCard,
  onNavigateToExphilHub,
}) => {
  const [currentDilemmaIndex, setCurrentDilemmaIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [isShowingReaction, setIsShowingReaction] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const dilemma = ETHICAL_DILEMMAS[currentDilemmaIndex];
  const totalDilemmas = ETHICAL_DILEMMAS.length;
  const currentChoiceId = selectedChoices[dilemma.id];
  const currentChoice: DilemmaOption | undefined = dilemma.options.find(
    (o) => o.id === currentChoiceId,
  );

  const handleSelectOption = (optionId: string) => {
    sound.playStarSelect();
    setSelectedChoices((prev) => ({ ...prev, [dilemma.id]: optionId }));
    setIsShowingReaction(true);
  };

  const handleNextDilemma = () => {
    sound.playSupernovaBirth();
    setIsShowingReaction(false);
    if (currentDilemmaIndex < totalDilemmas - 1) {
      setCurrentDilemmaIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    sound.playStarSelect();
    setSelectedChoices({});
    setCurrentDilemmaIndex(0);
    setIsShowingReaction(false);
    setIsCompleted(false);
  };

  // Resultatberegning
  const ethicsProfile = React.useMemo(() => {
    return calculateEthicsProfile(selectedChoices);
  }, [selectedChoices]);

  // Finn matchende filosof i databasen for å vise bilde/lenke
  const twinPhilosopher = React.useMemo(() => {
    return philosophers.find((p) => p.id === ethicsProfile.philosopherTwinId);
  }, [philosophers, ethicsProfile.philosopherTwinId]);

  // Fullført visning: Moralkompass & Filosof-tvilling
  if (isCompleted) {
    const totalScoreSum = Object.values(ethicsProfile.scores).reduce((a, b) => a + b, 0) || 1;

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-serif uppercase tracking-widest mb-3">
            <span>⚖️</span> Etikk-Lab // Resultat
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">
            Ditt Etiske Moralkompass
          </h2>
          <p className="text-sm text-star-dim max-w-lg mx-auto mt-2 font-sans">
            Gjennom 6 moralske prøvelser har du avdekket hvilke prinsipper som veileder deg når det virkelig gjelder.
          </p>
        </div>

        {/* Filosofisk Tvilling-kort */}
        <div className="rounded-3xl border-2 border-gold/60 bg-gradient-to-b from-amber-950/40 via-cosmos-card to-cosmos/95 p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            {/* Avatar eller bilde */}
            {twinPhilosopher?.image ? (
              <img
                src={twinPhilosopher.image.file}
                alt={ethicsProfile.philosopherTwinName}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 border-gold shadow-xl shrink-0"
              />
            ) : (
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gold/20 border-2 border-gold flex items-center justify-center font-serif text-4xl text-gold shadow-xl shrink-0">
                ⚖️
              </div>
            )}

            <div className="space-y-3 text-center md:text-left flex-1">
              <div className="inline-block text-xs font-serif tracking-widest uppercase text-gold px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30">
                Din Filosofiske Tvilling
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {ethicsProfile.philosopherTwinName}
              </h3>
              <div className="text-xs sm:text-sm font-serif font-semibold text-gold-bright italic">
                «{ethicsProfile.twinTitle}»
              </div>
              <p className="text-xs sm:text-sm text-star-white font-sans leading-relaxed">
                {ethicsProfile.twinDescription}
              </p>

              <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                <button
                  onClick={() => onOpenPhilosopherCard(ethicsProfile.philosopherTwinId)}
                  className="px-4 py-2 rounded-xl bg-gold text-cosmos font-serif font-bold text-xs hover:bg-gold-bright transition-all shadow-md flex items-center gap-2 hover:scale-[1.02]"
                >
                  <span>✦</span> Utforsk {ethicsProfile.philosopherTwinName} i Radaren
                </button>
                {onNavigateToExphilHub && (
                  <button
                    onClick={onNavigateToExphilHub}
                    className="px-4 py-2 rounded-xl bg-cosmos border border-gold/40 text-gold font-serif text-xs hover:border-gold hover:bg-gold/10 transition-all flex items-center gap-1.5"
                  >
                    <span>⚔️</span> Test teorien i Ex.phil-dueller
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Moralsk fordeling / stolper */}
        <div className="rounded-2xl border border-white/15 bg-cosmos-card/80 p-6 sm:p-8 shadow-xl space-y-5 mb-8">
          <h4 className="text-sm font-serif font-bold uppercase tracking-wider text-gold flex items-center gap-2">
            <span>📊</span> Etisk Skole-fordeling i dine valg:
          </h4>

          <div className="space-y-4">
            {(Object.keys(ETHICAL_SCHOOL_META) as EthicalSchool[]).map((school) => {
              const meta = ETHICAL_SCHOOL_META[school];
              const score = ethicsProfile.scores[school];
              const percent = Math.round((score / totalScoreSum) * 100);

              return (
                <div key={school} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-star-white flex items-center gap-2">
                      <span>{meta.icon}</span> {meta.nameNor}
                    </span>
                    <span className="font-mono text-star-dim">{percent}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-black/40 overflow-hidden border border-white/10">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: meta.color,
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-star-dim/80 font-sans italic">
                    {meta.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Handlinger */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-xl bg-cosmos-card border border-white/20 text-star-dim hover:text-white hover:border-white/40 text-xs font-serif transition-colors flex items-center gap-2"
          >
            <span>↺</span> Ta Etikk-Lab på nytt
          </button>
        </div>
      </div>
    );
  }

  // Pågående dilemma-visning
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Fremdriftslinje */}
      <div className="flex items-center justify-between text-xs font-serif text-star-dim mb-3">
        <span className="text-gold font-bold flex items-center gap-1.5">
          <span>⚖️</span> INTERAKTIV ETIKK-LAB
        </span>
        <span className="font-mono">
          Dilemma {currentDilemmaIndex + 1} av {totalDilemmas}
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-6">
        <div
          className="h-full bg-gold transition-all duration-300 rounded-full"
          style={{ width: `${((currentDilemmaIndex + 1) / totalDilemmas) * 100}%` }}
        />
      </div>

      {/* Dilemma-kort */}
      <div className="rounded-3xl border border-gold/40 bg-gradient-to-b from-cosmos-card to-cosmos/95 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-[11px] font-serif uppercase tracking-wider mb-2">
              <span>{dilemma.icon}</span> {dilemma.category}
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
              {dilemma.title}
            </h2>
            <div className="text-xs text-star-dim font-serif mt-0.5">
              {dilemma.subtitle}
            </div>
          </div>
        </div>

        {/* Valgfritt bilde */}
        {dilemma.image && (
          <div className="h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-white/10 relative">
            <img
              src={dilemma.image}
              alt={dilemma.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cosmos-card via-transparent to-transparent opacity-80" />
          </div>
        )}

        {/* Situasjonsbeskrivelse */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
          <p className="text-xs sm:text-sm text-star-white font-sans leading-relaxed">
            {dilemma.scenario}
          </p>
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-serif text-star-dim mr-1">Involverte parter:</span>
            {dilemma.stakeholders.map((sh, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-amber-200/90 font-mono"
              >
                {sh}
              </span>
            ))}
          </div>
        </div>

        {/* Handlingsvalg */}
        <div className="space-y-3">
          <div className="text-xs font-serif font-bold uppercase tracking-wider text-gold">
            Hva velger du?
          </div>
          <div className="grid grid-cols-1 gap-3">
            {dilemma.options.map((opt) => {
              const isSelected = currentChoiceId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all flex flex-col justify-between group ${
                    isSelected
                      ? 'border-gold bg-gold/20 shadow-[0_0_20px_rgba(246,200,95,0.25)]'
                      : 'border-white/15 bg-cosmos/80 hover:border-gold/50 hover:bg-gold/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <span className="font-serif font-bold text-sm sm:text-base text-white group-hover:text-gold transition-colors">
                      {opt.title}
                    </span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-xs transition-colors ${
                        isSelected
                          ? 'border-gold bg-gold text-cosmos'
                          : 'border-white/30 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                  </div>
                  <p className="text-xs text-star-white/90 font-sans leading-relaxed mb-2 font-medium">
                    {opt.actionText}
                  </p>
                  <p className="text-[11px] text-star-dim font-sans">
                    {opt.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sanntids filosofiske reaksjoner ved valg */}
        {isShowingReaction && currentChoice && (
          <div className="pt-4 border-t border-white/10 space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-serif font-bold uppercase tracking-wider text-gold flex items-center gap-2">
                <span>🏛️</span> Filosofenes dom over ditt valg:
              </h3>
              <span className="text-[11px] text-star-dim font-mono">
                {currentChoice.reactions.length} reaksjoner
              </span>
            </div>

            <div className="space-y-3">
              {currentChoice.reactions.map((reaction, idx) => {
                const isAgree = reaction.stance === 'agree';
                const isDisagree = reaction.stance === 'disagree';

                return (
                  <div
                    key={idx}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                      isAgree
                        ? 'border-emerald-500/40 bg-emerald-950/20'
                        : isDisagree
                        ? 'border-rose-500/40 bg-rose-950/20'
                        : 'border-cyan-500/40 bg-cyan-950/20'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">
                          {isAgree ? '🟢' : isDisagree ? '🔴' : '🔵'}
                        </span>
                        <span className="font-serif font-bold text-xs text-white">
                          {reaction.philosopherName}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-serif uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          isAgree
                            ? 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10'
                            : isDisagree
                            ? 'text-rose-300 border-rose-500/30 bg-rose-500/10'
                            : 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10'
                        }`}
                      >
                        {reaction.verdict}
                      </span>
                    </div>

                    <p className="text-xs text-star-white font-sans leading-relaxed mb-2">
                      {reaction.comment}
                    </p>

                    <div className="text-[10px] font-mono text-star-dim flex items-center gap-1.5">
                      <span className="text-gold">✦ Pensum-knagg:</span> {reaction.exphilConcept}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ex.phil eksamen takeaway */}
            <div className="p-3.5 rounded-xl bg-gold/10 border border-gold/30 text-xs text-amber-100 font-sans shadow-sm">
              <div className="font-serif font-bold text-gold uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
                <span>💡</span> Hva lærer vi av dette dilemmaet til eksamen?
              </div>
              <p className="leading-relaxed">{dilemma.examContext}</p>
            </div>

            {/* Neste knapp */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextDilemma}
                className="px-6 py-2.5 rounded-xl bg-gold text-cosmos font-serif font-bold text-xs hover:bg-gold-bright transition-all shadow-lg flex items-center gap-2 hover:scale-[1.02]"
              >
                {currentDilemmaIndex < totalDilemmas - 1 ? (
                  <>
                    <span>Neste dilemma</span> <span>→</span>
                  </>
                ) : (
                  <>
                    <span>Se ditt Etiske Moralkompass</span> <span>★</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
