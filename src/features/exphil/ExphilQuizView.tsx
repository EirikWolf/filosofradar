import React, { useState } from 'react';
import { EXPHIL_QUIZ_QUESTIONS } from './exphilData';
import { sound } from '../../lib/sound';

interface ExphilQuizViewProps {
  onOpenPhilosopherCard?: (id: string) => void;
}

export const ExphilQuizView: React.FC<ExphilQuizViewProps> = ({
  onOpenPhilosopherCard,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const activeQuestion = EXPHIL_QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(idx);
    setHasAnswered(true);

    if (idx === activeQuestion.correctIndex) {
      setScore((s) => s + 1);
      sound.playStarSelect();
    } else {
      sound.playTimeTick();
    }
  };

  const handleNext = () => {
    if (currentIdx < EXPHIL_QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
      sound.playSupernovaBirth();
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / EXPHIL_QUIZ_QUESTIONS.length) * 100);
    return (
      <div className="w-full max-w-xl mx-auto p-6 sm:p-8 bg-cosmos-card border border-gold/40 rounded-3xl text-center shadow-2xl space-y-5 animate-in fade-in">
        <span className="text-4xl block">🎓</span>
        <h3 className="text-2xl font-serif font-bold text-star-white">
          Eksamens-drillen fullført!
        </h3>
        <p className="text-sm text-star-dim font-sans">
          Du fikk <strong className="text-gold text-lg">{score}</strong> av {EXPHIL_QUIZ_QUESTIONS.length} riktige ({percentage}%).
        </p>

        <div className="p-4 rounded-2xl bg-cosmos border border-white/10 text-xs font-serif text-star-white leading-relaxed">
          {percentage >= 80 ? (
            <span className="text-emerald-300">
              🌟 Strålende! Du har krystallklar forståelse av sentrale ex.phil-begreper og resonnementer. Du ligger godt an til toppkarakter!
            </span>
          ) : percentage >= 50 ? (
            <span className="text-amber-300">
              👍 Godt fundament! Gå gjerne gjennom Flashcards og Eksamensduellene for å tette hullene i begrepsapparatet.
            </span>
          ) : (
            <span className="text-cyan-300">
              💡 God øving! Ex.phil-spørsmål har ofte lure distraktorer. Bruk begrunnelsene aktivt for å lære nøyaktig hva sensor ser etter.
            </span>
          )}
        </div>

        <button
          onClick={handleRestart}
          className="px-6 py-2.5 rounded-full bg-gold text-cosmos font-serif font-bold text-xs hover:bg-gold-bright transition-all shadow-[0_0_12px_rgba(246,200,95,0.4)]"
        >
          ↻ Prøv eksamens-drillen på nytt
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
      {/* Toppinfo */}
      <div className="text-center">
        <h2 className="text-2xl font-serif font-bold text-star-white flex items-center justify-center gap-2">
          <span>📝</span> Eksamens-drillen
        </h2>
        <p className="text-xs text-star-dim font-sans mt-1">
          Flervalgsspørsmål tilpasset universitetenes prøveeksamener (UiO / NTNU / UiB).
        </p>
      </div>

      {/* Spørsmålskort */}
      <div className="bg-cosmos-card border border-gold/30 rounded-3xl p-5 sm:p-7 shadow-xl space-y-5">
        {/* Fremdrift og pilar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-serif">
          <span className="text-gold font-bold">
            Spørsmål {currentIdx + 1} av {EXPHIL_QUIZ_QUESTIONS.length}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-cosmos border border-white/15 text-star-dim uppercase text-[10px]">
            {activeQuestion.pillar === 'etikk' ? 'Normativ etikk' : activeQuestion.pillar === 'erkjennelse' ? 'Erkjennelsesteori' : 'Menneskesyn'}
          </span>
        </div>

        {/* Spørsmålstekst */}
        <h3 className="text-base sm:text-lg font-serif font-bold text-star-white leading-relaxed">
          {activeQuestion.question}
        </h3>

        {/* Alternativer */}
        <div className="space-y-2.5">
          {activeQuestion.options.map((option, idx) => {
            let style = 'bg-cosmos/70 border-white/10 text-star-dim hover:border-white/30 hover:text-white';
            if (hasAnswered) {
              if (idx === activeQuestion.correctIndex) {
                style = 'bg-emerald-950/60 border-emerald-400 text-emerald-200 font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]';
              } else if (idx === selectedAnswer) {
                style = 'bg-red-950/60 border-red-400 text-red-200 font-bold';
              } else {
                style = 'bg-cosmos/40 border-white/5 text-star-dim/50 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={hasAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs font-sans transition-all flex items-start gap-3 ${style}`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 font-serif font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-relaxed">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Forklaring / Sensors fasit */}
        {hasAnswered && (
          <div className="p-4 rounded-2xl bg-cosmos border border-gold/30 animate-in fade-in space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-gold">
              <span>💡</span> Sensors begrunnelse:
            </div>
            <p className="text-xs text-star-white font-sans leading-relaxed">
              {activeQuestion.explanation}
            </p>

            {activeQuestion.relatedPhilosopherId && onOpenPhilosopherCard && (
              <div className="pt-2 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => {
                    if (activeQuestion.relatedPhilosopherId) {
                      onOpenPhilosopherCard(activeQuestion.relatedPhilosopherId);
                    }
                  }}
                  className="text-gold text-xs font-serif hover:underline"
                >
                  Se filosofkort for {activeQuestion.relatedPhilosopherId} ↗
                </button>
              </div>
            )}
          </div>
        )}

        {/* Neste knapp */}
        {hasAnswered && (
          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-gold text-cosmos font-serif font-bold text-xs hover:bg-gold-bright transition-all shadow-[0_0_10px_rgba(246,200,95,0.3)] flex items-center gap-1.5"
            >
              <span>{currentIdx < EXPHIL_QUIZ_QUESTIONS.length - 1 ? 'Neste spørsmål →' : 'Fullfør og se resultat 🎉'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
