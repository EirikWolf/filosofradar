import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceX,
  forceY,
  type Simulation,
} from 'd3-force';
import type { Philosopher } from '../../schemas/philosopher';
import { getNetworkData, getLongestLineage, type NetworkNode, type NetworkLink } from '../../lib/influence';
import { getTraditionMeta } from '../../lib/traditions';
import { formatLifeSpan, formatYear } from '../../lib/years';

interface NetworkViewProps {
  philosophers: Philosopher[];
  onOpenCard?: (id: string) => void;
  onNavigateToRadar?: () => void;
}

export const NetworkView: React.FC<NetworkViewProps> = ({
  philosophers,
  onOpenCard,
  onNavigateToRadar,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 900,
    height: 600,
  });

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [highlightLineage, setHighlightLineage] = useState<boolean>(false);
  const [timeForce, setTimeForce] = useState<number>(0.22); // 0 = fritt, 0.4 = streng tidsrekkefølge

  // Hent grafdata
  const { nodes: rawNodes, links: rawLinks } = useMemo(() => {
    return getNetworkData(philosophers);
  }, [philosophers]);

  // Finn den lengste idéslekten
  const longestLineage = useMemo(() => {
    return getLongestLineage(philosophers);
  }, [philosophers]);

  const lineageSet = useMemo(() => {
    return new Set(longestLineage.path);
  }, [longestLineage]);

  // Lokale noder og kanter for D3-simuleringen
  const [simNodes, setSimNodes] = useState<NetworkNode[]>([]);
  const [simLinks, setSimLinks] = useState<NetworkLink[]>([]);

  // Responsiv størrelse
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: Math.max(340, containerRef.current.clientWidth),
          height: Math.max(500, window.innerHeight - 260),
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Kjør D3-force simuleringen
  const simulationRef = useRef<Simulation<NetworkNode, NetworkLink> | null>(null);

  useEffect(() => {
    const width = dimensions.width;
    const height = dimensions.height;

    // Klon noder og kanter så vi ikke muterer memo-verdiene
    const nodes: NetworkNode[] = rawNodes.map((d) => ({ ...d }));
    const links: NetworkLink[] = rawLinks.map((d) => ({ ...d }));

    // Tidsakse-skala: maper årstall (-600 til 2000) til X (100 til width - 100)
    const minYear = -650;
    const maxYear = 2025;
    const paddingX = Math.min(120, width * 0.1);
    const getTargetX = (year: number) => {
      const frac = (year - minYear) / (maxYear - minYear);
      return paddingX + frac * (width - 2 * paddingX);
    };

    const simulation = forceSimulation<NetworkNode>(nodes)
      .force(
        'link',
        forceLink<NetworkNode, NetworkLink>(links)
          .id((d) => d.id)
          .distance(95),
      )
      .force('charge', forceManyBody().strength(-280))
      .force('center', forceCenter(width / 2, height / 2).strength(0.05))
      .force(
        'x',
        forceX<NetworkNode>((d) => getTargetX(d.bornYear)).strength(timeForce),
      )
      .force('y', forceY(height / 2).strength(0.12));

    simulation.on('tick', () => {
      setSimNodes([...nodes]);
      setSimLinks([...links]);
    });

    simulationRef.current = simulation;

    return () => {
      simulation.stop();
    };
  }, [rawNodes, rawLinks, dimensions, timeForce]);

  // Drag-and-drop håndtering
  const draggingNodeRef = useRef<NetworkNode | null>(null);

  const handlePointerDown = (node: NetworkNode, e: React.PointerEvent) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    draggingNodeRef.current = node;
    node.fx = node.x;
    node.fy = node.y;
    if (simulationRef.current) {
      simulationRef.current.alphaTarget(0.3).restart();
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingNodeRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    draggingNodeRef.current.fx = x;
    draggingNodeRef.current.fy = y;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggingNodeRef.current) return;
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {
      // Ignorer
    }
    draggingNodeRef.current.fx = null;
    draggingNodeRef.current.fy = null;
    draggingNodeRef.current = null;
    if (simulationRef.current) {
      simulationRef.current.alphaTarget(0);
    }
  };

  // Aktiv node (hovered eller selected)
  const activeId = hoveredId || selectedId;

  // Finn noder koblet til aktiv node
  const connectedIds = useMemo(() => {
    if (!activeId) return new Set<string>();
    const set = new Set<string>([activeId]);
    for (const link of rawLinks) {
      if (link.sourceId === activeId) set.add(link.targetId);
      if (link.targetId === activeId) set.add(link.sourceId);
    }
    return set;
  }, [activeId, rawLinks]);

  return (
    <div className="w-full flex flex-col items-center gap-4 select-none">
      {/* Kontrollpanel */}
      <div className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-cosmos-card/85 border border-white/10 rounded-2xl backdrop-blur shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="text-sm font-serif font-bold text-gold flex items-center gap-1.5">
            <span>🕸️</span> Idénettverket ({rawLinks.length} påvirkningslenker)
          </span>
          <span className="text-xs text-star-dim hidden sm:inline">
            · Dra i nodene med musa for å utforske tankekreftene!
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Knapp for å fremheve den lengste idéslekten */}
          <button
            onClick={() => setHighlightLineage(!highlightLineage)}
            className={`px-3 py-1.5 rounded-full text-xs font-serif transition-all flex items-center gap-1.5 ${
              highlightLineage
                ? 'bg-gold text-cosmos font-bold shadow-[0_0_12px_rgba(246,200,95,0.6)]'
                : 'border border-gold/40 text-gold hover:bg-gold/15'
            }`}
          >
            <span>👑</span> {highlightLineage ? 'Skjul lengste idéslekt' : `Lengste idéslekt (${longestLineage.length} ledd)`}
          </button>

          {/* Tidsakse kraft-bryter */}
          <div className="flex items-center gap-2 text-xs border border-white/15 bg-cosmos/80 px-3 py-1 rounded-full">
            <span className="text-star-dim font-serif">Tidsflyt (venstre → høyre):</span>
            <button
              onClick={() => setTimeForce(timeForce > 0.1 ? 0.05 : 0.35)}
              className="text-gold font-bold hover:underline"
            >
              {timeForce > 0.1 ? 'Organisk tidsorden' : 'Fri klynge'}
            </button>
          </div>

          {onNavigateToRadar && (
            <button
              onClick={onNavigateToRadar}
              className="text-xs text-star-dim hover:text-white font-serif px-2 py-1"
            >
              ✦ Tilbake til radaren
            </button>
          )}
        </div>
      </div>

      {/* Info-stripe om lengste idéslekt */}
      {highlightLineage && (
        <div className="w-full max-w-5xl px-4 py-2 bg-gold/10 border border-gold/40 rounded-xl text-xs flex flex-wrap items-center gap-2 animate-in fade-in">
          <span className="font-serif font-bold text-gold">🏆 Historiens lengste tanke-stafett:</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {longestLineage.path.map((id, idx) => {
              const p = philosophers.find((item) => item.id === id);
              return (
                <React.Fragment key={id}>
                  {idx > 0 && <span className="text-gold-bright">→</span>}
                  <button
                    onClick={() => onOpenCard?.(id)}
                    className="px-2 py-0.5 rounded bg-cosmos border border-gold/40 text-star-white hover:border-gold font-serif"
                  >
                    {p?.name ?? id}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* D3 SVG Graf Lerret */}
      <div
        ref={containerRef}
        className="w-full max-w-5xl relative rounded-2xl bg-cosmos-card/90 border border-gold/30 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: dimensions.height }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <svg
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full"
        >
          <defs>
            {/* Pil-markør for påvirkningsretning */}
            <marker
              id="arrow-head"
              viewBox="0 -5 10 10"
              refX="18"
              refY="0"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M0,-4L8,0L0,4" fill="rgba(246, 200, 95, 0.7)" />
            </marker>
            <marker
              id="arrow-head-active"
              viewBox="0 -5 10 10"
              refX="18"
              refY="0"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0,-4L8,0L0,4" fill="#67e8f9" />
            </marker>
          </defs>

          {/* Tidslinje bakgrunns-gradient langs X */}
          <line
            x1="40"
            y1={dimensions.height - 30}
            x2={dimensions.width - 40}
            y2={dimensions.height - 30}
            stroke="rgba(147, 197, 253, 0.2)"
            strokeDasharray="4 4"
          />
          <text
            x="45"
            y={dimensions.height - 15}
            fill="rgba(147, 197, 253, 0.5)"
            fontSize="10"
            className="font-serif"
          >
            Antikken (ca. 600 f.Kr.)
          </text>
          <text
            x={dimensions.width - 45}
            y={dimensions.height - 15}
            textAnchor="end"
            fill="rgba(147, 197, 253, 0.5)"
            fontSize="10"
            className="font-serif"
          >
            Moderne tid (2000-tallet) →
          </text>

          {/* 1. Kantlaget (Påvirkningslenker) */}
          <g className="links">
            {simLinks.map((link, idx) => {
              const sourceNode = link.source as NetworkNode;
              const targetNode = link.target as NetworkNode;
              if (!sourceNode.x || !sourceNode.y || !targetNode.x || !targetNode.y) return null;

              const isLinkActive =
                activeId && (link.sourceId === activeId || link.targetId === activeId);

              const isLineageLink =
                highlightLineage &&
                lineageSet.has(link.sourceId) &&
                lineageSet.has(link.targetId);

              let stroke = 'rgba(147, 197, 253, 0.2)';
              let strokeWidth = 1.2;
              let opacity = 0.45;

              if (isLineageLink) {
                stroke = '#f6c85f';
                strokeWidth = 3;
                opacity = 0.95;
              } else if (isLinkActive) {
                stroke = '#67e8f9';
                strokeWidth = 2.5;
                opacity = 0.9;
              } else if (activeId && !isLinkActive) {
                opacity = 0.08;
              }

              return (
                <line
                  key={idx}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  opacity={opacity}
                  markerEnd={isLinkActive ? 'url(#arrow-head-active)' : 'url(#arrow-head)'}
                  className="transition-opacity duration-300"
                />
              );
            })}
          </g>

          {/* 2. Nodelaget (Filosof-stjerner) */}
          <g className="nodes">
            {simNodes.map((node) => {
              if (node.x == null || node.y == null) return null;

              const meta = getTraditionMeta(node.tradition);
              const isNodeHovered = hoveredId === node.id;
              const isNodeSelected = selectedId === node.id;
              const isNodeConnected = connectedIds.has(node.id);
              const isLineageNode = highlightLineage && lineageSet.has(node.id);

              let opacity = 1;
              if (activeId && !isNodeConnected) {
                opacity = 0.2;
              }

              // Radius basert på påvirkningskraft (antall koblinger)
              const baseRadius = 8 + Math.min(12, node.connectionCount * 1.8);
              const radius = isNodeHovered || isNodeSelected ? baseRadius * 1.3 : baseRadius;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  opacity={opacity}
                  className="cursor-pointer transition-opacity duration-300 group"
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => {
                    setSelectedId(selectedId === node.id ? null : node.id);
                    onOpenCard?.(node.id);
                  }}
                  onPointerDown={(e) => handlePointerDown(node, e)}
                >
                  {/* Ytre glød hvis i fokus eller del av lengste slekt */}
                  {(isLineageNode || isNodeHovered || isNodeSelected) && (
                    <circle
                      r={radius * 1.8}
                      fill="none"
                      stroke={isLineageNode ? '#f6c85f' : '#67e8f9'}
                      strokeWidth="2"
                      strokeDasharray="3 2"
                      className="animate-spin pointer-events-none"
                      style={{ animationDuration: '6s' }}
                    />
                  )}

                  {/* Aura */}
                  <circle
                    r={radius * 1.4}
                    fill={meta.color}
                    opacity="0.25"
                    className="transition-transform group-hover:scale-125"
                  />

                  {/* Hovednode */}
                  <circle
                    r={radius}
                    fill={isLineageNode ? '#f6c85f' : '#ffffff'}
                    stroke={meta.color}
                    strokeWidth={isNodeHovered ? 3 : 2}
                    className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                  />

                  {/* Antall koblinger-badge i sentrum av noden */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#040714"
                    fontSize="9"
                    fontWeight="bold"
                    className="font-mono pointer-events-none"
                  >
                    {node.connectionCount}
                  </text>

                  {/* Navnelapp */}
                  <text
                    y={radius + 13}
                    textAnchor="middle"
                    fill={isLineageNode ? '#f6c85f' : '#ffffff'}
                    fontSize="11"
                    fontWeight={isNodeHovered || isLineageNode ? 'bold' : 'normal'}
                    className="font-serif pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hurtig-tooltip nederst til venstre når en filosof holdes peker over */}
        {activeId && (
          <div className="absolute bottom-4 left-4 p-3 bg-cosmos/90 border border-gold/40 rounded-xl shadow-xl backdrop-blur text-xs max-w-sm pointer-events-none animate-in fade-in">
            {(() => {
              const p = philosophers.find((item) => item.id === activeId);
              if (!p) return null;
              return (
                <div>
                  <div className="flex items-center gap-1.5 font-serif font-bold text-gold text-sm">
                    <span>✦</span> {p.name}
                    <span className="text-[11px] font-normal text-star-dim">
                      ({formatYear(p.born?.year ?? p.floruit?.from ?? 0)})
                    </span>
                  </div>
                  <p className="text-star-dim text-[11px] mt-0.5">
                    {formatLifeSpan(p)} · {getTraditionMeta(p.tradition).name}
                  </p>
                  <p className="text-star-white/90 text-[11px] mt-1 italic">
                    «{p.keyIdeas[0]?.title}: {p.keyIdeas[0]?.text.slice(0, 100)}...»
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-cyan-glow font-serif">
                    <span>← Påvirket av: {p.influencedBy.length}</span>
                    <span>→ Inspirerte: {p.influences?.length ?? 0}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
