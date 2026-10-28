import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import type { Philosopher, TraditionId } from '../../schemas/philosopher';
import { TRADITION_SECTOR_ORDER, getSectorAngles } from '../../lib/polar';
import { getTraditionMeta, TRADITIONS } from '../../lib/traditions';
import { formatLifeSpan } from '../../lib/years';
import { sound } from '../../lib/sound';
import { EXPHIL_PHILOSOPHER_IDS } from '../exphil/exphilData';

interface Galaxy3DViewProps {
  philosophers: Philosopher[];
  onOpenCard: (id: string) => void;
  onNavigateToRadar?: (id?: string) => void;
  focusPhilosopherId?: string | null;
}

interface Star3D {
  id: string;
  philosopher: Philosopher;
  x: number;
  y: number;
  z: number;
  color: string;
  traditionName: string;
  birthYear: number;
}

interface ProjectedStar extends Star3D {
  screenX: number;
  screenY: number;
  screenZ: number; // For Z-buffering (dybdesortering)
  screenRadius: number;
  alpha: number;
  visible: boolean;
}

interface DustParticle {
  x: number;
  y: number;
  z: number;
  size: number;
  brightness: number;
  speed: number;
}

export const Galaxy3DView: React.FC<Galaxy3DViewProps> = ({
  philosophers,
  onOpenCard,
  onNavigateToRadar,
  focusPhilosopherId,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter- og utvalgstilstander
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedTradition, setSelectedTradition] = useState<string>('all');
  const [onlyExphil, setOnlyExphil] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

  // Oppdater valgt stjerne ved ekstern fokusering (f.eks. guidet tur)
  useEffect(() => {
    if (focusPhilosopherId) {
      setSelectedId(focusPhilosopherId);
    }
  }, [focusPhilosopherId]);

  // Kameraorientering og zoom
  const cameraRef = useRef({
    yaw: 0.45, // Rotasjon rundt Y-aksen (vannrett)
    pitch: 0.55, // Rotasjon rundt X-aksen (vipping / fugleperspektiv)
    distance: 680, // Avstand fra galaksesenteret
    targetYaw: 0.45,
    targetPitch: 0.55,
    targetDistance: 680,
  });

  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Forhåndsberegn 3D-koordinater for alle filosofer i galaksen
  const stars3D = useMemo<Star3D[]>(() => {
    // Sektorvinkler for tradisjonene
    const sectorAnglesMap = new Map<TraditionId, { midAngle: number }>();
    TRADITION_SECTOR_ORDER.forEach((tid) => {
      const angles = getSectorAngles(tid);
      sectorAnglesMap.set(tid, { midAngle: angles.midAngle });
    });

    return philosophers.map((p) => {
      const meta = getTraditionMeta(p.tradition);
      const angles = sectorAnglesMap.get(p.tradition) || { midAngle: 0 };

      // Radius basert på kronologi:
      // Eldste filosofer (~800 f.Kr.) i den lysende galaksekjernen (~85 enheter)
      // Moderne filosofer (1900-2025) i de ytre spiralarmene (~340 enheter)
      const birth = p.born?.year ?? p.floruit?.from ?? -400;
      const normalizedYear = Math.max(0, Math.min(1, (birth - -800) / (2025 - -800)));
      const radius = 80 + Math.pow(normalizedYear, 0.85) * 260;

      // Spiralvridning: Galaksen roterer svakt utover som Melkeveien
      const spiralTwist = normalizedYear * 1.8;
      const baseAngleRad = (angles.midAngle * Math.PI) / 180;
      const theta = baseAngleRad + spiralTwist;

      // X og Z i galakseplanet
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      // Y (høyde over/under skiven): Enkelte tradisjoner og individer bølger svakt i 3D
      // Gir ekte kosmisk tredimensjonal dybde
      const seed = Math.sin(birth * 13.37);
      const y = seed * 38;

      return {
        id: p.id,
        philosopher: p,
        x,
        y,
        z,
        color: meta.color,
        traditionName: meta.name,
        birthYear: birth,
      };
    });
  }, [philosophers]);

  // Bakgrunnsstøv og fjerne stjerner (3D kosmos)
  const dustParticles = useMemo<DustParticle[]>(() => {
    const particles: DustParticle[] = [];
    for (let i = 0; i < 180; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      const dist = 300 + Math.random() * 450;
      particles.push({
        x: Math.cos(phi) * Math.cos(theta) * dist,
        y: Math.sin(phi) * dist * 0.45,
        z: Math.cos(phi) * Math.sin(theta) * dist,
        size: 0.8 + Math.random() * 1.6,
        brightness: 0.2 + Math.random() * 0.6,
        speed: 0.001 + Math.random() * 0.002,
      });
    }
    return particles;
  }, []);

  // Kart for raskt oppslag
  const starsMap = useMemo(() => {
    const map = new Map<string, Star3D>();
    stars3D.forEach((s) => map.set(s.id, s));
    return map;
  }, [stars3D]);

  // Den valgte stjernen
  const activeStar = useMemo(() => {
    const id = hoveredId || selectedId;
    return id ? starsMap.get(id) || null : null;
  }, [hoveredId, selectedId, starsMap]);

  // Hovedrenderløkke på Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      // Håndter Retina / High DPI skjermer
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Tøm lerretet med dyp kosmisk gradient
      ctx.fillStyle = '#040714';
      ctx.fillRect(0, 0, width, height);

      // Sentrum av skjermen
      const cx = width / 2;
      const cy = height / 2;

      // Myk kamerasmoothing (lerp)
      const cam = cameraRef.current;
      if (isAutoRotating && !isDraggingRef.current) {
        cam.targetYaw += 0.0022; // Sakte kosmisk galakserotasjon
      }
      cam.yaw += (cam.targetYaw - cam.yaw) * 0.1;
      cam.pitch += (cam.targetPitch - cam.pitch) * 0.1;
      cam.distance += (cam.targetDistance - cam.distance) * 0.1;

      // Klem pitch for å unngå å snu galaksen opp ned
      cam.pitch = Math.max(-1.3, Math.min(1.3, cam.pitch));

      const cosYaw = Math.cos(cam.yaw);
      const sinYaw = Math.sin(cam.yaw);
      const cosPitch = Math.cos(cam.pitch);
      const sinPitch = Math.sin(cam.pitch);

      // Perspektiv-konstant
      const fov = 600;

      // 3D-projiseringsfunksjon
      const project = (px: number, py: number, pz: number) => {
        // 1. Yaw (rotasjon rundt Y-akse)
        const x1 = px * cosYaw - pz * sinYaw;
        const z1 = px * sinYaw + pz * cosYaw;

        // 2. Pitch (rotasjon rundt X-akse)
        const y2 = py * cosPitch - z1 * sinPitch;
        const z2 = py * sinPitch + z1 * cosPitch;

        // 3. Perspektivprojeksjon
        const depth = cam.distance + z2;
        if (depth <= 20) {
          return { screenX: 0, screenY: 0, screenZ: -9999, scale: 0, visible: false };
        }

        const scale = fov / depth;
        return {
          screenX: cx + x1 * scale,
          screenY: cy + y2 * scale,
          screenZ: z2,
          scale,
          visible: true,
        };
      };

      // 1. Tegn den glødende galaksekjernen i sentrum (Akse-alderen)
      const coreProj = project(0, 0, 0);
      if (coreProj.visible) {
        const coreGradient = ctx.createRadialGradient(
          coreProj.screenX,
          coreProj.screenY,
          2,
          coreProj.screenX,
          coreProj.screenY,
          110 * coreProj.scale,
        );
        coreGradient.addColorStop(0, 'rgba(255, 245, 200, 0.45)');
        coreGradient.addColorStop(0.3, 'rgba(246, 200, 95, 0.2)');
        coreGradient.addColorStop(0.7, 'rgba(103, 232, 249, 0.08)');
        coreGradient.addColorStop(1, 'rgba(4, 7, 20, 0)');

        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(coreProj.screenX, coreProj.screenY, 110 * coreProj.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Tegn fjerne bakgrunnsstjerner
      dustParticles.forEach((p) => {
        const proj = project(p.x, p.y, p.z);
        if (!proj.visible) return;
        const radius = p.size * proj.scale;
        ctx.fillStyle = `rgba(226, 232, 240, ${p.brightness * 0.7})`;
        ctx.beginPath();
        ctx.arc(proj.screenX, proj.screenY, Math.max(0.5, radius), 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Projiser og sorter alle filosofstjerner (Z-buffer for perfekt 3D-overlapping)
      const projectedStars: ProjectedStar[] = stars3D
        .map((s) => {
          const proj = project(s.x, s.y, s.z);
          const isExphilMatch = !onlyExphil || EXPHIL_PHILOSOPHER_IDS.has(s.id);
          const isFilterMatch =
            (selectedTradition === 'all' || s.philosopher.tradition === selectedTradition) && isExphilMatch;

          return {
            ...s,
            screenX: proj.screenX,
            screenY: proj.screenY,
            screenZ: proj.screenZ,
            screenRadius: Math.max(2.2, 5 * proj.scale),
            alpha: isFilterMatch ? 1 : 0.12,
            visible: proj.visible,
          };
        })
        .filter((s) => s.visible)
        .sort((a, b) => b.screenZ - a.screenZ); // Bakerst først

      // 4. Tegn 3D-konstellasjonslinjer for påvirkningsbånd
      ctx.lineWidth = 1.2;
      stars3D.forEach((source) => {
        const sourceProj = project(source.x, source.y, source.z);
        if (!sourceProj.visible) return;

        const isSourceActive =
          activeStar && (activeStar.id === source.id || activeStar.philosopher.influencedBy.includes(source.id));

        source.philosopher.influencedBy.forEach((ancestorId) => {
          const ancestor = starsMap.get(ancestorId);
          if (!ancestor) return;
          const ancProj = project(ancestor.x, ancestor.y, ancestor.z);
          if (!ancProj.visible) return;

          const isDirectLink =
            activeStar && (activeStar.id === source.id || activeStar.id === ancestor.id);

          ctx.beginPath();
          ctx.moveTo(ancProj.screenX, ancProj.screenY);

          // Beregn en mild bue i 3D-rommet
          const midX = (ancestor.x + source.x) / 2;
          const midY = (ancestor.y + source.y) / 2 + 25; // Bue oppover i 3D
          const midZ = (ancestor.z + source.z) / 2;
          const midProj = project(midX, midY, midZ);

          if (midProj.visible) {
            ctx.quadraticCurveTo(
              midProj.screenX,
              midProj.screenY,
              sourceProj.screenX,
              sourceProj.screenY,
            );
          } else {
            ctx.lineTo(sourceProj.screenX, sourceProj.screenY);
          }

          if (isDirectLink) {
            ctx.strokeStyle = '#f6c85f';
            ctx.lineWidth = 2.4;
            ctx.shadowColor = '#f6c85f';
            ctx.shadowBlur = 10;
          } else if (isSourceActive) {
            ctx.strokeStyle = 'rgba(103, 232, 249, 0.45)';
            ctx.lineWidth = 1.4;
            ctx.shadowBlur = 0;
          } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 0.8;
            ctx.shadowBlur = 0;
          }

          ctx.stroke();
          ctx.shadowBlur = 0;
        });
      });

      // 5. Tegn filosofstjernene med glødende korona
      projectedStars.forEach((star) => {
        const isHovered = hoveredId === star.id;
        const isSelected = selectedId === star.id;
        const isHighlighted = isHovered || isSelected;

        const r = isHighlighted ? star.screenRadius * 1.8 : star.screenRadius;

        // Glød rundt stjernen
        if (isHighlighted || star.alpha > 0.5) {
          const glowGrad = ctx.createRadialGradient(
            star.screenX,
            star.screenY,
            0,
            star.screenX,
            star.screenY,
            r * 3.5,
          );
          glowGrad.addColorStop(0, star.color);
          glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(star.screenX, star.screenY, r * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Stjernens faste kjerne
        ctx.fillStyle = isHighlighted ? '#ffffff' : star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.screenX, star.screenY, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Stjernens navn i 3D dersom markert eller stor nok
        if (isHighlighted || (star.screenRadius > 4.2 && star.alpha > 0.5)) {
          ctx.font = isHighlighted
            ? 'bold 13px "Cinzel", "Times New Roman", serif'
            : '10px "Inter", sans-serif';
          ctx.fillStyle = isHighlighted ? '#f6c85f' : 'rgba(240, 244, 255, 0.85)';
          ctx.textAlign = 'center';
          ctx.shadowColor = '#000000';
          ctx.shadowBlur = 4;
          ctx.fillText(star.philosopher.name, star.screenX, star.screenY - r - 4);
          ctx.shadowBlur = 0;
        }
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [stars3D, dustParticles, starsMap, selectedTradition, onlyExphil, hoveredId, selectedId, isAutoRotating, activeStar]);

  // Håndter mus- og berøringsinteraksjon for 3D-rotering og zooming
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDraggingRef.current) {
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };

      const cam = cameraRef.current;
      cam.targetYaw += dx * 0.007;
      cam.targetPitch -= dy * 0.007;
    } else {
      // Sjekk om musen treffer en stjerne for hover-effekt
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let foundId: string | null = null;
      const cx = canvas.clientWidth / 2;
      const cy = canvas.clientHeight / 2;
      const cam = cameraRef.current;
      const cosYaw = Math.cos(cam.yaw);
      const sinYaw = Math.sin(cam.yaw);
      const cosPitch = Math.cos(cam.pitch);
      const sinPitch = Math.sin(cam.pitch);
      const fov = 600;

      for (const s of stars3D) {
        const x1 = s.x * cosYaw - s.z * sinYaw;
        const z1 = s.x * sinYaw + s.z * cosYaw;
        const y2 = s.y * cosPitch - z1 * sinPitch;
        const z2 = s.y * sinPitch + z1 * cosPitch;
        const depth = cam.distance + z2;
        if (depth <= 20) continue;

        const scale = fov / depth;
        const sx = cx + x1 * scale;
        const sy = cy + y2 * scale;
        const dist = Math.hypot(mouseX - sx, mouseY - sy);

        if (dist < 14) {
          foundId = s.id;
          break;
        }
      }

      setHoveredId(foundId);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const cam = cameraRef.current;
    cam.targetDistance = Math.max(300, Math.min(1200, cam.targetDistance + e.deltaY * 0.6));
  };

  const handleClick = () => {
    if (hoveredId) {
      sound.playStarSelect();
      setSelectedId(selectedId === hoveredId ? null : hoveredId);
    }
  };

  const resetCamera = useCallback(() => {
    const cam = cameraRef.current;
    cam.targetYaw = 0.45;
    cam.targetPitch = 0.55;
    cam.targetDistance = 680;
  }, []);

  const selectedPhilosopher = selectedId ? starsMap.get(selectedId)?.philosopher : null;

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
      {/* Kontrollpanel øverst */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 px-4 py-3 mb-2 bg-cosmos-card/80 border border-white/10 rounded-2xl backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-sm font-serif font-bold text-gold flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-glow animate-pulse" />
            3D-GALAKSEN
          </span>
          <span className="text-xs text-star-dim hidden sm:inline">
            Dra for å rotere · Rull for å zoome
          </span>
        </div>

        {/* Tradisjonsfilter */}
        <div className="flex items-center gap-2">
          <select
            value={selectedTradition}
            onChange={(e) => setSelectedTradition(e.target.value)}
            className="bg-cosmos border border-white/15 rounded-xl px-3 py-1.5 text-xs text-star-white focus:outline-none focus:border-gold font-sans"
          >
            <option value="all">Alle tradisjoner (80)</option>
            {TRADITION_SECTOR_ORDER.map((tid) => (
              <option key={tid} value={tid}>
                {TRADITIONS[tid].name}
              </option>
            ))}
          </select>

          {/* Ex.phil hurtigfilter */}
          <button
            onClick={() => setOnlyExphil((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif border transition-all flex items-center gap-1.5 ${
              onlyExphil
                ? 'bg-gold text-cosmos font-bold border-gold shadow-[0_0_10px_rgba(246,200,95,0.4)]'
                : 'bg-cosmos border-white/15 text-star-dim hover:text-white hover:border-gold/40'
            }`}
            title="Vis kun filosofer på Examen philosophicum-pensum"
          >
            <span>🎓</span> {onlyExphil ? 'Kun Ex.phil' : 'Ex.phil'}
          </button>

          {/* Autorasjon av/på */}
          <button
            onClick={() => setIsAutoRotating((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif border transition-all ${
              isAutoRotating
                ? 'bg-gold/15 border-gold text-gold font-bold'
                : 'bg-cosmos border-white/15 text-star-dim hover:text-white'
            }`}
            title="Skru av/på kontinuerlig galakserotasjon"
          >
            {isAutoRotating ? '⏸ Stopp spinn' : '▶ Roter'}
          </button>

          {/* Nullstill synsvinkel */}
          <button
            onClick={resetCamera}
            className="px-3 py-1.5 rounded-xl text-xs font-serif bg-cosmos border border-white/15 text-star-dim hover:text-white hover:border-gold/40 transition-all"
            title="Gjenopprett standard kamerasynsvinkel"
          >
            ↺ Nullstill
          </button>
        </div>
      </div>

      {/* 3D Canvas Vindu */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[640px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(4,7,20,0.9)] bg-cosmos select-none cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onClick={handleClick}
          className="w-full h-full block"
        />

        {/* Hover-tooltip */}
        {hoveredId && starsMap.get(hoveredId) && (
          <div className="absolute top-4 left-4 pointer-events-none bg-cosmos-card/95 border border-gold/40 rounded-xl p-3 backdrop-blur-md shadow-xl text-xs max-w-xs animate-fadeIn">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: starsMap.get(hoveredId)!.color }}
              />
              <strong className="text-white font-serif text-sm">
                {starsMap.get(hoveredId)!.philosopher.name}
              </strong>
            </div>
            <div className="text-star-dim mt-0.5">
              {starsMap.get(hoveredId)!.traditionName} ·{' '}
              {formatLifeSpan(starsMap.get(hoveredId)!.philosopher)}
            </div>
            <div className="text-gold-bright/90 italic font-serif mt-1">
              Klikk for å utforske stjernen
            </div>
          </div>
        )}

        {/* Hurtigkort for valgt stjerne nederst på 3D-skjermen */}
        {selectedPhilosopher && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-cosmos-card/95 border border-gold/50 rounded-2xl p-4 backdrop-blur-md shadow-2xl animate-slideUp z-10">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-serif tracking-widest text-gold font-bold">
                  ✦ Valgt i galaksen
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-0.5">
                  {selectedPhilosopher.name}
                </h3>
                <div className="text-xs text-star-dim">
                  {getTraditionMeta(selectedPhilosopher.tradition).name} ·{' '}
                  {formatLifeSpan(selectedPhilosopher)}
                </div>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="text-star-dim hover:text-white p-1 text-xs"
              >
                ✕
              </button>
            </div>

            {selectedPhilosopher.quote && (
              <p className="text-xs text-gold-bright/90 font-serif italic mt-2 line-clamp-2">
                «{selectedPhilosopher.quote.text}»
              </p>
            )}

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
              <button
                onClick={() => onOpenCard(selectedPhilosopher.id)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-gold hover:bg-gold-bright text-cosmos font-serif font-bold text-xs shadow-md transition-all text-center"
              >
                📖 Åpne filosofkort
              </button>
              {onNavigateToRadar && (
                <button
                  onClick={() => onNavigateToRadar(selectedPhilosopher.id)}
                  className="py-1.5 px-3 rounded-xl bg-cosmos border border-white/20 hover:border-gold text-star-white font-serif text-xs transition-all"
                  title="Finn stjernen på den 2D-radaren"
                >
                  ✦ Se på radaren
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
