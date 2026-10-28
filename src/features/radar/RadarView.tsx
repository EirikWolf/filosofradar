import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Philosopher, ThemeId } from '../../schemas/philosopher';
import { TRADITION_SECTOR_ORDER, getSectorAngles, polarToCartesian, radiusForYear } from '../../lib/polar';
import { computeRadarLayout, type RadarPoint } from '../../lib/layout';
import type { ScaleMode } from '../../lib/timeScale';
import { formatYear, formatLifeSpan, checkOverlap } from '../../lib/years';
import { getTraditionMeta } from '../../lib/traditions';
import { THEME_LIST } from '../../lib/themes';
import { sound } from '../../lib/sound';

const FEATURED_TOP_5 = new Set([
  'hypatia',
  'sokrates',
  'arne-naess',
  'buddha',
  'marcus-aurelius',
]);

interface RadarViewProps {
  philosophers: Philosopher[];
  onSelectPhilosopher?: (id: string) => void;
  onOpenCard?: (id: string) => void;
  onStartCompare?: (id: string) => void;
  onNavigateToTimeline?: () => void;
  onNavigateToList?: () => void;
}

export const RadarView: React.FC<RadarViewProps> = ({
  philosophers,
  onOpenCard,
  onStartCompare,
  onNavigateToTimeline,
  onNavigateToList,
}) => {
  // Radargeometri
  const cx = 400;
  const cy = 400;
  const minRadius = 55;
  const maxRadius = 345;

  // Visnings- og filter-tilstander
  const [scaleMode, setScaleMode] = useState<ScaleMode>('compressed');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedTradition, setSelectedTradition] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showScaleHelp, setShowScaleHelp] = useState<boolean>(false);

  // Sveipestråle-tilstander
  const [sweepSpeed, setSweepSpeed] = useState<number>(8);
  const [isSweepPaused, setIsSweepPaused] = useState<boolean>(false);

  // Tidsmaskin-tilstander
  const [isTimeMachineActive, setIsTimeMachineActive] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(2025);
  const [playSpeed, setPlaySpeed] = useState<number>(2); // 1x, 2x, 4x
  const [bornRecently, setBornRecently] = useState<Set<string>>(new Set());

  const lastAnimTimeRef = useRef<number | null>(null);
  const prevTimeRef = useRef<number>(currentTime);

  // Beregn deterministiske stjerneposisjoner
  const radarPoints = useMemo<RadarPoint[]>(() => {
    return computeRadarLayout(philosophers, {
      cx,
      cy,
      minRadius,
      maxRadius,
      scaleMode,
      minDistance: 14.5,
    });
  }, [philosophers, scaleMode]);

  // Kart over poeng etter id for rask oppslag
  const pointsMap = useMemo(() => {
    const map = new Map<string, RadarPoint>();
    for (const pt of radarPoints) {
      map.set(pt.id, pt);
    }
    return map;
  }, [radarPoints]);

  // Den valgte filosofen (eller den som holdes peker over)
  const activePoint = useMemo(() => {
    const id = hoveredId || selectedId;
    return id ? pointsMap.get(id) || null : null;
  }, [hoveredId, selectedId, pointsMap]);

  // Samtidige filosofer
  const contemporaryIds = useMemo(() => {
    if (!activePoint) return new Set<string>();
    const actStart = activePoint.birthYear;
    const actEnd = activePoint.deathYear ?? (actStart + 60);

    const ids = new Set<string>();
    for (const pt of radarPoints) {
      if (pt.id === activePoint.id) continue;
      const ptStart = pt.birthYear;
      const ptEnd = pt.deathYear ?? (ptStart + 60);
      if (checkOverlap({ start: actStart, end: actEnd }, { start: ptStart, end: ptEnd })) {
        ids.add(pt.id);
      }
    }
    return ids;
  }, [activePoint, radarPoints]);

  // Filtrering
  const matchingIds = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const ids = new Set<string>();

    for (const pt of radarPoints) {
      const p = pt.philosopher;
      // 1. Tradisjonsfilter
      if (selectedTradition !== 'all' && p.tradition !== selectedTradition) {
        continue;
      }
      // 2. Temafilter (tema >= 3 regnes som viktig for filosofen)
      if (selectedTheme !== 'all') {
        const themeVal = p.themes[selectedTheme as ThemeId] ?? 0;
        if (themeVal < 3) continue;
      }
      // 3. Tekstsøk (navn, opprinnelig navn, skoler, idéer)
      if (query) {
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesOrig = p.nameOriginal?.toLowerCase().includes(query);
        const matchesSchool = p.schools.some((s) => s.toLowerCase().includes(query));
        const matchesIdea = p.keyIdeas.some(
          (k) => k.title.toLowerCase().includes(query) || k.text.toLowerCase().includes(query),
        );
        if (!matchesName && !matchesOrig && !matchesSchool && !matchesIdea) {
          continue;
        }
      }
      ids.add(p.id);
    }
    return ids;
  }, [radarPoints, selectedTradition, selectedTheme, searchQuery]);

  // Tidsmaskin animasjonsløkke
  useEffect(() => {
    if (!isTimeMachineActive || !isPlaying) {
      lastAnimTimeRef.current = null;
      return;
    }

    let animFrameId: number;

    const tick = (now: number) => {
      if (lastAnimTimeRef.current == null) {
        lastAnimTimeRef.current = now;
      }
      const deltaSec = (now - lastAnimTimeRef.current) / 1000;
      lastAnimTimeRef.current = now;

      // År per sekund: 1x = 35 år/s, 2x = 80 år/s, 4x = 180 år/s
      const yearsPerSec = playSpeed === 1 ? 35 : playSpeed === 2 ? 80 : 180;
      const advanceYears = deltaSec * yearsPerSec;

      setCurrentTime((prev) => {
        const next = prev + advanceYears;
        if (next >= 2025) {
          setIsPlaying(false);
          return 2025;
        }
        return next;
      });

      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameId);
  }, [isTimeMachineActive, isPlaying, playSpeed]);

  // Sjekk hvem som blir "født" i tidsintervallet for å trigge supernova-puls
  useEffect(() => {
    if (!isTimeMachineActive) return;

    const fromYear = prevTimeRef.current;
    const toYear = currentTime;
    prevTimeRef.current = currentTime;

    if (toYear > fromYear) {
      const newlyBorn = new Set<string>();
      for (const pt of radarPoints) {
        if (pt.birthYear >= fromYear && pt.birthYear <= toYear) {
          newlyBorn.add(pt.id);
        }
      }

      if (newlyBorn.size > 0) {
        sound.playSupernovaBirth();
        setBornRecently((prev) => {
          const merged = new Set(prev);
          newlyBorn.forEach((id) => merged.add(id));
          return merged;
        });

        // Fjern supernova-glimt etter 1,4 sekunder
        const timer = setTimeout(() => {
          setBornRecently((prev) => {
            const next = new Set(prev);
            newlyBorn.forEach((id) => next.delete(id));
            return next;
          });
        }, 1400);

        return () => clearTimeout(timer);
      }
    }
  }, [currentTime, isTimeMachineActive, radarPoints]);

  // Årstall-ringer som skal tegnes
  const centuryRings = useMemo(() => {
    const majorYears = [-500, 1, 500, 1000, 1500, 2000];
    const minorYears: number[] = [];

    // F.Kr. århundrer
    for (let y = -600; y < 0; y += 100) {
      if (!majorYears.includes(y)) minorYears.push(y);
    }
    // E.Kr. århundrer
    for (let y = 100; y <= 2000; y += 100) {
      if (!majorYears.includes(y)) minorYears.push(y);
    }

    const majors = majorYears.map((y) => ({
      year: y,
      label: y === 1 ? 'År 1' : formatYear(y),
      radius: radiusForYear(y, scaleMode, minRadius, maxRadius),
      isMajor: true,
    }));

    const minors = minorYears.map((y) => ({
      year: y,
      label: '',
      radius: radiusForYear(y, scaleMode, minRadius, maxRadius),
      isMajor: false,
    }));

    return [...minors, ...majors];
  }, [scaleMode]);

  // Radius for tidsmaskinens ekspanderende ring
  const timeRingRadius = useMemo(() => {
    if (!isTimeMachineActive) return null;
    return radiusForYear(Math.min(2025, Math.max(-650, currentTime)), scaleMode, minRadius, maxRadius);
  }, [isTimeMachineActive, currentTime, scaleMode]);

  return (
    <div className="w-full flex flex-col items-center gap-6 select-none">
      {/* Topp-rad: Tidsmaskin / Skala / Filter-kontroller */}
      <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-cosmos-card/80 border border-white/10 rounded-2xl backdrop-blur shadow-2xl">
        {/* Tidsmaskin-bryter & status */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const next = !isTimeMachineActive;
              setIsTimeMachineActive(next);
              if (next) {
                setCurrentTime(-600);
                setIsPlaying(true);
              } else {
                setIsPlaying(false);
                setCurrentTime(2025);
              }
            }}
            className={`px-4 py-2 rounded-full text-xs font-serif tracking-wider transition-all flex items-center gap-2 ${
              isTimeMachineActive
                ? 'bg-cyan-glow/20 text-cyan-glow border border-cyan-glow shadow-[0_0_15px_rgba(103,232,249,0.35)]'
                : 'text-star-dim border border-white/10 hover:border-gold hover:text-white'
            }`}
          >
            <span>🌀</span> {isTimeMachineActive ? 'Tidsmaskin PÅ' : 'Aktiver Tidsmaskin'}
          </button>

          {isTimeMachineActive && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full border border-gold/40 bg-gold/10 text-gold flex items-center justify-center text-xs hover:bg-gold hover:text-cosmos transition-all shadow-md"
                title={isPlaying ? 'Pause' : 'Spill av'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <div className="flex items-center rounded-lg border border-white/10 bg-cosmos/60 text-xs overflow-hidden">
                {[1, 2, 4].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaySpeed(spd)}
                    className={`px-2 py-1 text-[11px] font-mono transition-colors ${
                      playSpeed === spd ? 'bg-gold text-cosmos font-bold' : 'text-star-dim hover:text-white'
                    }`}
                  >
                    {spd}×
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Visning av årstall i sentrum av kontrollinjen */}
        <div className="flex items-center gap-2 text-center">
          <span className="text-xs text-star-dim font-serif">Historisk tid:</span>
          <span className="font-serif text-lg md:text-xl font-bold text-gold drop-shadow-[0_0_10px_rgba(246,200,95,0.5)]">
            {isTimeMachineActive ? formatYear(Math.round(currentTime)) : 'Nåtid (alle epoker)'}
          </span>
        </div>

        {/* Skala-bryter med infoknapp */}
        <div className="flex items-center gap-2 relative">
          <div className="flex items-center rounded-full border border-white/15 bg-cosmos/80 p-0.5 text-xs">
            <button
              onClick={() => setScaleMode('compressed')}
              className={`px-3 py-1 rounded-full font-serif transition-all ${
                scaleMode === 'compressed'
                  ? 'bg-gold text-cosmos font-bold shadow-[0_0_10px_rgba(246,200,95,0.4)]'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              Komprimert
            </button>
            <button
              onClick={() => setScaleMode('linear')}
              className={`px-3 py-1 rounded-full font-serif transition-all ${
                scaleMode === 'linear'
                  ? 'bg-gold text-cosmos font-bold shadow-[0_0_10px_rgba(246,200,95,0.4)]'
                  : 'text-star-dim hover:text-white'
              }`}
            >
              Lineær
            </button>
          </div>

          <button
            onClick={() => setShowScaleHelp(!showScaleHelp)}
            className="w-6 h-6 rounded-full border border-white/20 text-star-dim text-xs flex items-center justify-center hover:text-gold hover:border-gold transition-colors"
            title="Hva betyr skalaen?"
          >
            ?
          </button>

          {/* Forklarings-boble for tidsskala */}
          {showScaleHelp && (
            <div className="absolute right-0 top-10 z-50 w-72 p-3 bg-cosmos-card border border-gold/40 rounded-xl shadow-2xl text-xs text-star-dim leading-relaxed font-sans animate-in fade-in zoom-in-95">
              <div className="flex justify-between items-center mb-1 text-gold font-serif font-bold">
                <span>Om tidsskalaene</span>
                <button onClick={() => setShowScaleHelp(false)} className="text-star-dim hover:text-white">✕</button>
              </div>
              <p className="mb-2">
                <strong>Komprimert skala:</strong> Forstørrer antikken (600 f.Kr.–500 e.Kr.) og moderne tid (1500–i dag) der flest filosofer virket, slik at de ikke klumper seg sammen.
              </p>
              <p>
                <strong>Lineær skala:</strong> Hvert århundre har nøyaktig samme avstand. Viser den enorme historiske avstanden i middelalderen!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tidsmaskin-glider når tidsmaskin er aktiv */}
      {isTimeMachineActive && (
        <div className="w-full max-w-4xl px-6 py-3 bg-cosmos-card/60 border border-cyan-glow/20 rounded-xl backdrop-blur flex items-center gap-4 animate-in fade-in">
          <span className="text-xs text-star-dim font-mono">650 f.Kr.</span>
          <input
            type="range"
            min={-650}
            max={2025}
            value={Math.round(currentTime)}
            onChange={(e) => {
              setCurrentTime(Number(e.target.value));
              setIsPlaying(false);
            }}
            className="flex-1 accent-cyan-glow cursor-pointer h-2 bg-cosmos-dark rounded-lg border border-cyan-glow/30"
          />
          <span className="text-xs text-star-dim font-mono">2025 e.Kr.</span>
        </div>
      )}

      {/* Filter-bar: Tradisjoner, Tema og Søk */}
      <div className="w-full max-w-4xl flex flex-wrap items-center gap-3 px-4 py-2 bg-cosmos-card/50 border border-white/5 rounded-xl text-xs">
        {/* Søkefelt */}
        <div className="relative flex-1 min-w-[180px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Søk på filosof eller idé..."
            className="w-full px-3 py-1.5 pl-8 rounded-lg bg-cosmos/80 border border-white/10 text-star-white placeholder-star-dim/50 focus:border-gold focus:outline-none"
          />
          <span className="absolute left-2.5 top-2 text-star-dim">🔍</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 text-star-dim hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Tradisjonsfilter */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
          <span className="text-star-dim font-serif mr-1">Tradisjon:</span>
          <select
            value={selectedTradition}
            onChange={(e) => setSelectedTradition(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-cosmos/80 border border-white/10 text-star-white focus:border-gold focus:outline-none font-serif text-xs"
          >
            <option value="all">Alle tradisjoner</option>
            {TRADITION_SECTOR_ORDER.map((tId) => (
              <option key={tId} value={tId}>
                {getTraditionMeta(tId).name}
              </option>
            ))}
          </select>
        </div>

        {/* Temafilter */}
        <div className="flex items-center gap-1.5">
          <span className="text-star-dim font-serif mr-1">Tema:</span>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-cosmos/80 border border-white/10 text-star-white focus:border-gold focus:outline-none font-serif text-xs"
          >
            <option value="all">Alle temaer</option>
            {THEME_LIST.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>

        {/* Nullstill filtre knapp hvis aktive */}
        {(selectedTradition !== 'all' || selectedTheme !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedTradition('all');
              setSelectedTheme('all');
              setSearchQuery('');
            }}
            className="px-2.5 py-1.5 rounded-lg text-gold hover:underline text-[11px] font-serif"
          >
            Nullstill filtre
          </button>
        )}
      </div>

      {/* Selve Radaren (SVG) */}
      <div className="relative w-full max-w-[680px] aspect-square flex items-center justify-center">
        {/* Roterende sveipestråle bakgrunn */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full overflow-hidden animate-sweep-beam"
          style={
            {
              '--sweep-duration': `${sweepSpeed}s`,
              animationPlayState: isSweepPaused || isPlaying ? 'paused' : 'running',
            } as React.CSSProperties
          }
        >
          {/* Myk stjernelys-hale (conic gradient) */}
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, rgba(103, 232, 249, 0.4) 0deg, rgba(246, 200, 95, 0.18) 18deg, rgba(103, 232, 249, 0.05) 42deg, transparent 65deg)`,
            }}
          />
          {/* Frontstråle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-1/2 bg-gradient-to-t from-gold-bright via-cyan-glow to-transparent shadow-[0_0_8px_#67e8f9]" />
        </div>

        <svg
          viewBox="0 0 800 800"
          className="w-full h-full drop-shadow-[0_0_50px_rgba(4,7,20,0.9)] overflow-visible"
        >
          <defs>
            {/* Kosmisk radialglød for sentrum */}
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f6c85f" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#f6c85f" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f6c85f" stopOpacity="0" />
            </radialGradient>

            {/* Ytre radargrense skygge */}
            <radialGradient id="radarOuterRing" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="#0b1433" stopOpacity="0" />
              <stop offset="97%" stopColor="#080e22" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#040714" stopOpacity="0.95" />
            </radialGradient>
          </defs>

          {/* Mørk kosmisk radar-bakgrunn */}
          <circle cx={cx} cy={cy} r={maxRadius + 35} fill="url(#radarOuterRing)" />

          {/* Sektor-linjer og tradisjonsetiketter */}
          {TRADITION_SECTOR_ORDER.map((tradition) => {
            const meta = getTraditionMeta(tradition);
            const sector = getSectorAngles(tradition);
            const pStart = polarToCartesian(cx, cy, minRadius, sector.startAngle);
            const pEnd = polarToCartesian(cx, cy, maxRadius + 10, sector.startAngle);
            const pLabel = polarToCartesian(cx, cy, maxRadius + 24, sector.midAngle);

            const isTradSelected = selectedTradition === tradition;

            return (
              <g key={tradition} className="transition-opacity duration-300">
                {/* Sektordeler-stråle */}
                <line
                  x1={pStart.x}
                  y1={pStart.y}
                  x2={pEnd.x}
                  y2={pEnd.y}
                  stroke={isTradSelected ? meta.color : 'rgba(147, 197, 253, 0.15)'}
                  strokeWidth={isTradSelected ? 1.5 : 0.8}
                  strokeDasharray="2 4"
                />

                {/* Tradisjonsnavn langs ytterkanten */}
                <text
                  x={pLabel.x}
                  y={pLabel.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isTradSelected ? meta.color : meta.color}
                  opacity={selectedTradition === 'all' || isTradSelected ? 0.85 : 0.25}
                  fontSize="10"
                  fontWeight={isTradSelected ? 'bold' : 'normal'}
                  className="font-serif cursor-pointer hover:opacity-100 transition-opacity"
                  onClick={() => setSelectedTradition(selectedTradition === tradition ? 'all' : tradition)}
                >
                  {meta.name}
                </text>
              </g>
            );
          })}

          {/* Konsentriske århundre- og epoke-ringer */}
          {centuryRings.map((ring, idx) => (
            <g key={idx}>
              <circle
                cx={cx}
                cy={cy}
                r={ring.radius}
                fill="none"
                stroke={ring.isMajor ? 'rgba(246, 200, 95, 0.25)' : 'rgba(147, 197, 253, 0.08)'}
                strokeWidth={ring.isMajor ? 1.2 : 0.7}
                strokeDasharray={ring.isMajor ? undefined : '2 4'}
              />
              {/* Årstall-merker på den vertikale Nord-aksen */}
              {ring.isMajor && ring.label && (
                <text
                  x={cx}
                  y={cy - ring.radius + 12}
                  textAnchor="middle"
                  fill="rgba(246, 200, 95, 0.75)"
                  fontSize="9.5"
                  fontWeight="bold"
                  className="font-serif pointer-events-none drop-shadow"
                >
                  {ring.label}
                </text>
              )}
            </g>
          ))}

          {/* Ur-stjerne og kompassrose i sentrum (ca. 650 f.Kr.) */}
          <circle cx={cx} cy={cy} r={minRadius} fill="url(#centerGlow)" className="pointer-events-none" />
          <circle cx={cx} cy={cy} r={4} fill="#f6c85f" className="filter drop-shadow-[0_0_8px_#f6c85f]" />
          <text
            x={cx}
            y={cy + 14}
            textAnchor="middle"
            fill="#f6c85f"
            fontSize="9"
            fontWeight="bold"
            className="font-serif pointer-events-none"
          >
            650 f.Kr.
          </text>

          {/* Tidsmaskinens ekspanderende ring */}
          {timeRingRadius != null && (
            <g className="pointer-events-none">
              <circle
                cx={cx}
                cy={cy}
                r={timeRingRadius}
                fill="none"
                stroke="#67e8f9"
                strokeWidth="2"
                strokeDasharray="4 3"
                className="filter drop-shadow-[0_0_12px_#67e8f9] animate-pulse"
              />
            </g>
          )}

          {/* Levetidsbue for valgt filosof (vises som en bue langs radien fra fødsel til død) */}
          {activePoint && activePoint.deathYear && (
            <g className="pointer-events-none">
              <line
                x1={polarToCartesian(cx, cy, activePoint.radius, activePoint.angleDeg).x}
                y1={polarToCartesian(cx, cy, activePoint.radius, activePoint.angleDeg).y}
                x2={
                  polarToCartesian(
                    cx,
                    cy,
                    radiusForYear(activePoint.deathYear, scaleMode, minRadius, maxRadius),
                    activePoint.angleDeg,
                  ).x
                }
                y2={
                  polarToCartesian(
                    cx,
                    cy,
                    radiusForYear(activePoint.deathYear, scaleMode, minRadius, maxRadius),
                    activePoint.angleDeg,
                  ).y
                }
                stroke="#f6c85f"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="filter drop-shadow-[0_0_6px_#f6c85f]"
              />
            </g>
          )}

          {/* Animerte konstellasjonsbuer for påvirkningsnettverk (Wow-funksjon) */}
          {activePoint && (
            <g className="pointer-events-none">
              {/* Forgjengere: gyllen glødende bue fra inspiratorer til denne filosofen */}
              {activePoint.philosopher.influencedBy.map((ancestorId) => {
                const anc = pointsMap.get(ancestorId);
                if (!anc) return null;
                const p1 = { x: anc.x, y: anc.y };
                const p2 = { x: activePoint.x, y: activePoint.y };
                const mx = (p1.x + p2.x) / 2;
                const my = (p1.y + p2.y) / 2;
                const qx = mx * 0.65 + cx * 0.35;
                const qy = my * 0.65 + cy * 0.35;

                return (
                  <g key={`anc-${ancestorId}`}>
                    <path
                      d={`M ${p1.x} ${p1.y} Q ${qx} ${qy} ${p2.x} ${p2.y}`}
                      fill="none"
                      stroke="#ffd79e"
                      strokeWidth="2.2"
                      strokeDasharray="4 3"
                      className="filter drop-shadow-[0_0_10px_#ffd79e] animate-pulse"
                      opacity="0.9"
                    />
                    <circle cx={p1.x} cy={p1.y} r="5" fill="#ffd79e" opacity="0.7" className="animate-ping" />
                  </g>
                );
              })}

              {/* Etterfølgere: cyan/gull glødende bue videre til hvem denne inspirerte */}
              {(activePoint.philosopher.influences ?? []).map((descendantId) => {
                const desc = pointsMap.get(descendantId);
                if (!desc) return null;
                const p1 = { x: activePoint.x, y: activePoint.y };
                const p2 = { x: desc.x, y: desc.y };
                const mx = (p1.x + p2.x) / 2;
                const my = (p1.y + p2.y) / 2;
                const qx = mx * 0.65 + cx * 0.35;
                const qy = my * 0.65 + cy * 0.35;

                return (
                  <g key={`desc-${descendantId}`}>
                    <path
                      d={`M ${p1.x} ${p1.y} Q ${qx} ${qy} ${p2.x} ${p2.y}`}
                      fill="none"
                      stroke="#67e8f9"
                      strokeWidth="2.2"
                      strokeDasharray="5 3"
                      className="filter drop-shadow-[0_0_10px_#67e8f9] animate-pulse"
                      opacity="0.9"
                    />
                    <circle cx={p2.x} cy={p2.y} r="5" fill="#67e8f9" opacity="0.7" className="animate-ping" />
                  </g>
                );
              })}
            </g>
          )}

          {/* Stjernelaget (alle 21+ filosofene) */}
          {radarPoints.map((pt) => {
            const p = pt.philosopher;
            const meta = getTraditionMeta(pt.tradition);

            const isMatches = matchingIds.has(pt.id);
            const isSelected = selectedId === pt.id;
            const isHovered = hoveredId === pt.id;
            const isContemporary = contemporaryIds.has(pt.id);
            const isBornSupernova = bornRecently.has(pt.id);

            // Tidsmaskin livsstatus
            let isAlive = true;
            let isUnborn = false;
            let isDeceased = false;

            if (isTimeMachineActive) {
              if (pt.birthYear > currentTime) {
                isUnborn = true;
                isAlive = false;
              } else if (pt.deathYear && pt.deathYear < currentTime) {
                isDeceased = true;
                isAlive = false;
              }
            }

            // Opasitet basert på filter og tidsmaskin
            let opacity = 1;
            if (!isMatches) {
              opacity = 0.12;
            } else if (isUnborn) {
              opacity = 0.04;
            } else if (isDeceased) {
              opacity = 0.5;
            } else if (activePoint && !isSelected && !isHovered && !isContemporary) {
              opacity = 0.35;
            }

            // Star size
            const isTopStar = FEATURED_TOP_5.has(p.id);
            const baseRadius = isTopStar ? 6 : 4.5;
            const starRadius = isSelected || isHovered ? baseRadius * 1.5 : baseRadius;

            return (
              <g
                key={pt.id}
                tabIndex={isUnborn ? -1 : 0}
                role="button"
                aria-label={`${p.name} (${formatLifeSpan(p)})`}
                transform={`translate(${pt.x}, ${pt.y})`}
                opacity={opacity}
                className={`cursor-pointer transition-opacity duration-300 focus:outline-none group`}
                onMouseEnter={() => setHoveredId(pt.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  sound.playStarSelect();
                  setSelectedId(selectedId === pt.id ? null : pt.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    sound.playStarSelect();
                    setSelectedId(selectedId === pt.id ? null : pt.id);
                  } else if (e.key === 'Escape') {
                    setSelectedId(null);
                    setHoveredId(null);
                  }
                }}
              >
                {/* Supernova-puls ved fødsel i tidsmaskinen */}
                {isBornSupernova && (
                  <circle
                    r="8"
                    fill="none"
                    stroke="#ffffff"
                    className="animate-supernova text-cyan-glow"
                  />
                )}

                {/* Diskret, rolig samtids-ring hvis samtidig med fokusert filosof (statisk) */}
                {isContemporary && (
                  <circle
                    r={starRadius * 1.9}
                    fill="none"
                    stroke="#f6c85f"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                    opacity="0.65"
                    className="pointer-events-none"
                  />
                )}

                {/* Ytre tradisjons-aura */}
                <circle
                  r={starRadius * 1.8}
                  fill={meta.color}
                  opacity={isAlive ? 0.35 : 0.15}
                  className="transition-transform group-hover:scale-125"
                />

                {/* Hovedstjerne */}
                <circle
                  r={starRadius}
                  fill={isSelected ? '#f6c85f' : '#ffffff'}
                  stroke={meta.color}
                  strokeWidth={isSelected ? 2 : 1}
                  className="filter drop-shadow-[0_0_6px_rgba(255,255,255,0.85)]"
                />

                {/* Navnelapp på radaren for utvalgte/stjernefilosofer eller ved hover */}
                {(isHovered || isSelected || (isTopStar && !activePoint && !isUnborn)) && (
                  <text
                    y={starRadius + 13}
                    textAnchor="middle"
                    fill={isSelected ? '#f6c85f' : '#ffffff'}
                    fontSize="10"
                    fontWeight={isSelected ? 'bold' : '500'}
                    className="font-serif pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    {p.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Kontroller for radarens sveipehastighet */}
      <div className="flex flex-wrap items-center justify-center gap-3 bg-cosmos-card/70 border border-white/10 rounded-full px-5 py-2 backdrop-blur shadow-lg">
        <span className="text-xs text-star-dim font-serif mr-1">Sveip-fart:</span>
        <button
          onClick={() => setSweepSpeed(14)}
          className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
            sweepSpeed === 14 ? 'bg-gold text-cosmos font-bold shadow-[0_0_8px_#f6c85f]' : 'text-star-dim hover:text-white'
          }`}
        >
          Rolig (14s)
        </button>
        <button
          onClick={() => setSweepSpeed(8)}
          className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
            sweepSpeed === 8 ? 'bg-gold text-cosmos font-bold shadow-[0_0_8px_#f6c85f]' : 'text-star-dim hover:text-white'
          }`}
        >
          Normal (8s)
        </button>
        <button
          onClick={() => setSweepSpeed(4)}
          className={`px-3 py-1 rounded-full text-xs font-serif transition-all ${
            sweepSpeed === 4 ? 'bg-gold text-cosmos font-bold shadow-[0_0_8px_#f6c85f]' : 'text-star-dim hover:text-white'
          }`}
        >
          Rask (4s)
        </button>
        <span className="w-[1px] h-4 bg-white/20 mx-1" />
        <button
          onClick={() => setIsSweepPaused(!isSweepPaused)}
          className="px-3 py-1 rounded-full text-xs font-serif border border-white/20 text-star-white hover:border-gold hover:text-gold transition-all"
        >
          {isSweepPaused ? '▶ Start sveip' : '⏸ Pause sveip'}
        </button>
      </div>

      {/* Filosofens Hurtigkort / Mini-observatorium (vises ved klikk eller hover) */}
      {activePoint && (
        <div className="w-full max-w-2xl p-5 bg-cosmos-card/95 border border-gold/40 rounded-2xl shadow-2xl backdrop-blur animate-in fade-in slide-in-from-bottom-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: getTraditionMeta(activePoint.tradition).color }}
                />
                <span className="text-xs uppercase font-serif tracking-widest text-star-dim">
                  {getTraditionMeta(activePoint.tradition).name}
                </span>
                {FEATURED_TOP_5.has(activePoint.philosopher.id) && (
                  <span className="text-gold text-xs">★ Utvalgt stjerne</span>
                )}
              </div>
              <h3 className="text-2xl font-serif font-bold text-star-white flex items-center gap-2">
                {activePoint.philosopher.name}
                {activePoint.philosopher.nameOriginal && (
                  <span className="text-sm font-normal text-star-dim">
                    ({activePoint.philosopher.nameOriginal})
                  </span>
                )}
              </h3>
              <p className="text-xs font-serif text-gold-bright mt-0.5">
                {formatLifeSpan(activePoint.philosopher)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {onOpenCard && (
                <button
                  onClick={() => onOpenCard(activePoint.philosopher.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-gold text-cosmos font-serif font-bold hover:bg-gold-bright text-xs transition-all shadow-[0_0_10px_rgba(246,200,95,0.4)] flex items-center gap-1"
                >
                  <span>📖</span> Åpne filosofkort
                </button>
              )}
              {onStartCompare && (
                <button
                  onClick={() => onStartCompare(activePoint.philosopher.id)}
                  className="px-3 py-1.5 rounded-lg border border-gold/40 text-gold hover:bg-gold/10 text-xs font-serif transition-colors flex items-center gap-1"
                >
                  <span>⚖️</span> Sammenlign
                </button>
              )}
              {onNavigateToTimeline && (
                <button
                  onClick={onNavigateToTimeline}
                  className="px-3 py-1.5 rounded-lg border border-white/20 hover:border-gold hover:text-gold text-xs font-serif transition-colors"
                >
                  ⏳ Tidslinje
                </button>
              )}
              {onNavigateToList && (
                <button
                  onClick={onNavigateToList}
                  className="px-3 py-1.5 rounded-lg border border-white/20 hover:border-gold hover:text-gold text-xs font-serif transition-colors"
                >
                  📋 Liste
                </button>
              )}
              {selectedId && (
                <button
                  onClick={() => setSelectedId(null)}
                  className="text-star-dim hover:text-white px-2 py-1 text-sm"
                  title="Lukk forhåndsvisning"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Kjerneidé eller sitat */}
          <div className="mt-4 text-xs text-star-dim leading-relaxed">
            {activePoint.philosopher.quote ? (
              <blockquote className="italic border-l-2 border-gold/50 pl-3 py-1 text-star-white/90">
                «{activePoint.philosopher.quote.text}»
                <footer className="text-[10px] text-star-dim not-italic mt-1">
                  — {activePoint.philosopher.quote.work}
                </footer>
              </blockquote>
            ) : (
              <p>{activePoint.philosopher.keyIdeas[0]?.text}</p>
            )}
          </div>

          {/* Samtidige filosofer som også lyser */}
          {contemporaryIds.size > 0 && (
            <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-serif text-gold">
                ✦ Levde samtidig ({contemporaryIds.size}):
              </span>
              {Array.from(contemporaryIds)
                .slice(0, 5)
                .map((id) => {
                  const comp = pointsMap.get(id);
                  if (!comp) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => setSelectedId(id)}
                      className="px-2 py-0.5 rounded-full bg-cosmos/80 border border-gold/30 text-star-white hover:border-gold text-[10px] font-serif transition-colors"
                    >
                      {comp.philosopher.name}
                    </button>
                  );
                })}
              {contemporaryIds.size > 5 && (
                <span className="text-[10px] text-star-dim">
                  +{contemporaryIds.size - 5} til
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
