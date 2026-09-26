import React, { useState, useMemo } from 'react';
import type { Philosopher, ThemeId } from '../../schemas/philosopher';
import type { QuizQuestion } from '../../schemas/quiz';
import quizQuestionsData from '../../generated/quizQuestions.json';
import { calculateUserThemeScores, findTopMatches, type QuizMatch } from '../../lib/similarity';
import { ThemeRadar } from '../../components/ThemeRadar';
import { exportQuizResultAsPng } from '../../lib/quizExport';
import { getThemeMeta } from '../../lib/themes';

const questions = quizQuestionsData as QuizQuestion[];

interface QuizViewProps {
  philosophers: Philosopher[];
  onOpenCard: (id: string) => void;
  onNavigateToRadar: (highlightId?: string) => void;
}

const ANSWER_OPTIONS = [
  { value: 1, label: 'Helt uenig', short: '1', emoji: '✕', color: 'hover:border-rose-400/50 hover:bg-rose-950/20' },
  { value: 2, label: 'Litt uenig', short: '2', emoji: '–', color: 'hover:border-amber-400/50 hover:bg-amber-950/20' },
  { value: 3, label: 'Nøytral', short: '3', emoji: '•', color: 'hover:border-slate-400/50 hover:bg-slate-800/30' },
  { value: 4, label: 'Litt enig', short: '4', emoji: '+', color: 'hover:border-cyan-400/50 hover:bg-cyan-950/20' },
  { value: 5, label: 'Helt enig', short: '5', emoji: '✓', color: 'hover:border-gold hover:bg-gold/20' },
];

export const QuizView: React.FC<QuizViewProps> = ({
  philosophers,
  onOpenCard,
  onNavigateToRadar,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeCompareId, setActiveCompareId] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Beregn brukerens dynamiske temaskårer i sanntid
  const userScores = useMemo(() => {
    return calculateUserThemeScores(answers, questions);
  }, [answers]);

  // Beregn toppmatcher
  const topMatches: QuizMatch[] = useMemo(() => {
    if (answeredCount === 0) return [];
    return findTopMatches(userScores, philosophers, 3);
  }, [userScores, philosophers, answeredCount]);

  const activePhilosopherMatch = useMemo(() => {
    if (topMatches.length === 0) return null;
    if (activeCompareId) {
      return topMatches.find((m) => m.philosopher.id === activeCompareId) || topMatches[0];
    }
    return topMatches[0];
  }, [topMatches, activeCompareId]);

  const handleSelectAnswer = (value: number) => {
    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    };
    setAnswers(nextAnswers);

    // Hvis dette var siste spørsmål, fullfør quizen
    if (currentIndex + 1 >= totalQuestions) {
      setIsCompleted(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    setActiveCompareId(null);
  };

  const handleDownload = async () => {
    if (topMatches.length === 0) return;
    setIsDownloading(true);
    try {
      await exportQuizResultAsPng({
        userScores,
        topMatch: topMatches[0],
        runnerUps: topMatches.slice(1),
      });
    } finally {
      setIsDownloading(false);
    }
  };

  // Liste over aktive temaer for nåværende spørsmål
  const currentThemes = currentQuestion
    ? (Object.keys(currentQuestion.themeWeights) as ThemeId[])
    : [];

  // ==========================================
  // RESULTAT-SKJERM
  // ==========================================
  if (isCompleted && topMatches.length > 0) {
    const winner = topMatches[0];
    const comparePhil = activePhilosopherMatch?.philosopher || winner.philosopher;

    return (
      <div className="w-full max-w-4xl flex flex-col items-center gap-6 animate-fadeIn text-star-white px-2 sm:px-4">
        {/* Banner med stjernestøv */}
        <div className="text-center mt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs uppercase tracking-widest font-serif mb-2">
            <span>✨</span> Observatoriet har talt
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-wide">
            Du ligner mest på{' '}
            <span className="text-gold underline decoration-gold/40 underline-offset-8">
              {winner.philosopher.name}
            </span>
            !
          </h2>
          <p className="text-star-dim text-sm sm:text-base mt-2 max-w-xl mx-auto italic font-serif">
            «{winner.explanation}»
          </p>
        </div>

        {/* Hovedvisning: Sammenligningsradar og vinnerprofil */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Venstre: Temaradar med overlagret bruker vs vinner */}
          <div className="lg:col-span-6 bg-cosmos-card/90 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md flex flex-col items-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-3 left-4 text-xs font-serif text-star-dim">
              ✦ Din temaprofil overlagret med tenkeren
            </div>

            {/* Velg hvilken av topp 3 som skal overlagres */}
            <div className="flex items-center gap-2 mt-6 mb-2">
              {topMatches.map((m, idx) => {
                const isSelected = (activePhilosopherMatch?.philosopher.id || winner.philosopher.id) === m.philosopher.id;
                return (
                  <button
                    key={m.philosopher.id}
                    onClick={() => setActiveCompareId(m.philosopher.id)}
                    className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
                      isSelected
                        ? 'bg-cyan-950/80 border border-cyan-400 text-cyan-glow font-bold shadow-[0_0_8px_rgba(103,232,249,0.4)]'
                        : 'border border-white/10 text-star-dim hover:text-white'
                    }`}
                  >
                    #{idx + 1} {m.philosopher.name} ({m.percentage}%)
                  </button>
                );
              })}
            </div>

            <div className="py-2">
              <ThemeRadar
                philosophers={[
                  { id: 'user', name: 'Deg', themes: userScores },
                  comparePhil,
                ]}
                colors={['#f6c85f', '#67e8f9']}
                size={280}
                showLegend={true}
              />
            </div>

            <p className="text-xs text-star-dim text-center mt-2">
              Gult område viser dine verdier. Cyan område viser {comparePhil.name}.
            </p>
          </div>

          {/* Høyre: Topp 3 liste og detaljer */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <h3 className="text-sm font-serif uppercase tracking-wider text-gold flex items-center gap-2">
              <span>🏆</span> Dine 3 nærmeste filosofer:
            </h3>

            {topMatches.map((match, idx) => {
              const isWinner = idx === 0;
              return (
                <div
                  key={match.philosopher.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isWinner
                      ? 'bg-cosmos-card/95 border-gold/50 shadow-[0_0_15px_rgba(246,200,95,0.15)]'
                      : 'bg-cosmos-card/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-serif font-bold ${
                          isWinner
                            ? 'bg-gold text-cosmos'
                            : 'bg-white/10 text-star-white'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-serif font-bold text-base text-white">
                          {match.philosopher.name}
                        </h4>
                        <span className="text-xs text-star-dim capitalize">
                          {match.philosopher.tradition} · {match.philosopher.born?.year ? (match.philosopher.born.year < 0 ? `${Math.abs(match.philosopher.born.year)} f.Kr.` : `${match.philosopher.born.year}`) : 'Ukjent tid'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-serif font-bold text-cyan-glow">
                        {match.percentage}%
                      </span>
                      <div className="text-[10px] text-star-dim uppercase tracking-wider">
                        Likhet
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 font-sans line-clamp-2">
                    {match.philosopher.themeNotes}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => onOpenCard(match.philosopher.id)}
                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-xs text-gold border border-gold/30 transition-all font-serif"
                    >
                      Les filosofkort ↗
                    </button>
                    <button
                      onClick={() => onNavigateToRadar(match.philosopher.id)}
                      className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-xs text-cyan-glow border border-cyan-400/30 transition-all font-serif"
                    >
                      Finn på stjernekartet ✦
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Handlingsknapper */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-6 py-3 rounded-full bg-gold hover:bg-gold-light text-cosmos font-serif font-bold text-sm tracking-wide transition-all shadow-[0_0_15px_rgba(246,200,95,0.4)] flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <span>📥</span> {isDownloading ? 'Genererer bilde...' : 'Last ned bildet ditt (PNG)'}
          </button>

          <button
            onClick={handleRestart}
            className="px-5 py-3 rounded-full border border-white/20 bg-cosmos-card/80 hover:bg-white/10 text-white font-serif text-sm tracking-wide transition-all flex items-center gap-2 active:scale-95"
          >
            <span>🔄</span> Ta quizen på nytt
          </button>
        </div>

        <p className="text-xs text-star-dim/70 text-center max-w-md pb-4">
          🔒 100% anonymt. Svarene dine behandles utelukkende lokalt i nettleseren din og lagres aldri på noen server.
        </p>
      </div>
    );
  }

  // ==========================================
  // SPØRSMÅLSSKJERM (MED SANNTIDS RADAR-VEKST)
  // ==========================================
  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-6 animate-fadeIn text-star-white px-2 sm:px-4">
      {/* Topplinje med progresjon */}
      <div className="w-full max-w-xl flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-serif text-star-dim">
          <span>
            Spørsmål {currentIndex + 1} av {totalQuestions}
          </span>
          <span className="text-gold font-bold">{progressPercent}% fullført</span>
        </div>

        {/* Progresjonslinje */}
        <div className="w-full h-1.5 bg-cosmos-card border border-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-glow to-gold transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(246,200,95,0.6)]"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Grid med spørsmålet og den voksende temaradaren */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Venstre: Spørsmålskortet */}
        <div className="md:col-span-7 bg-cosmos-card/95 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between min-h-[380px]">
          <div>
            {/* Tema-merkelapper for spørsmålet */}
            <div className="flex flex-wrap gap-2 mb-4">
              {currentThemes.map((tid) => {
                const meta = getThemeMeta(tid);
                return (
                  <span
                    key={tid}
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-serif uppercase tracking-wider bg-gold/10 text-gold border border-gold/30"
                  >
                    ✦ {meta.name}
                  </span>
                );
              })}
            </div>

            {/* Spørsmålstekst */}
            <h2 className="text-xl sm:text-2xl font-serif text-white leading-relaxed font-semibold">
              «{currentQuestion.question}»
            </h2>

            {/* Hjelpetekst / filosofisk kontekst */}
            {currentQuestion.context && (
              <p className="text-star-dim text-sm mt-3 font-sans leading-normal">
                {currentQuestion.context}
              </p>
            )}
          </div>

          {/* De 5 svarknappene («helt uenig» til «helt enig») */}
          <div className="mt-8 flex flex-col gap-2">
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {ANSWER_OPTIONS.map((opt) => {
                const isSelected = currentAnswer === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectAnswer(opt.value)}
                    className={`py-3 px-1 sm:px-2 rounded-xl flex flex-col items-center justify-center gap-1 border transition-all ${
                      isSelected
                        ? 'bg-gold text-cosmos border-gold font-bold shadow-[0_0_12px_rgba(246,200,95,0.7)] scale-105'
                        : `bg-cosmos/80 border-white/10 text-star-white ${opt.color}`
                    } active:scale-95`}
                  >
                    <span className="text-base sm:text-lg">{opt.emoji}</span>
                    <span className="text-[10px] sm:text-xs text-center font-serif leading-tight">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Forrige-knapp */}
            <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/5">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="text-xs font-serif text-star-dim hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
              >
                <span>←</span> Forrige spørsmål
              </button>

              {answeredCount > 0 && (
                <button
                  onClick={() => setIsCompleted(true)}
                  className="text-xs font-serif text-gold hover:text-gold-light transition-all flex items-center gap-1 underline underline-offset-4"
                >
                  Se foreløpig resultat ({answeredCount}/12) →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Høyre: Brukerens voksende temaradar ✨ */}
        <div className="md:col-span-5 bg-cosmos-card/80 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-xl flex flex-col items-center">
          <div className="text-center mb-2">
            <span className="text-xs font-serif text-gold uppercase tracking-widest block">
              ✦ Din voksende temaprofil
            </span>
            <p className="text-[11px] text-star-dim mt-0.5">
              Radaren vokser utover for hvert svar du avgir
            </p>
          </div>

          <div className="py-2">
            <ThemeRadar
              philosophers={[{ id: 'user', name: 'Deg', themes: userScores }]}
              colors={['#f6c85f']}
              size={240}
              showLegend={false}
            />
          </div>

          {/* Foreløpig topp-match hvis minst 2 spørsmål er besvart */}
          {topMatches.length > 0 && answeredCount >= 2 ? (
            <div className="mt-2 text-center text-xs font-serif bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-cyan-glow">
              Ligner foreløpig mest på: <strong className="text-white">{topMatches[0].philosopher.name}</strong> ({topMatches[0].percentage}%)
            </div>
          ) : (
            <div className="mt-2 text-center text-xs font-serif text-star-dim">
              Svar på spørsmålene for å vekke stjernebildet ditt til liv!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
