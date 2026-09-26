import type { Philosopher, TraditionId } from '../schemas/philosopher';

export interface NetworkNode {
  id: string;
  name: string;
  bornYear: number;
  tradition: TraditionId;
  connectionCount: number;
  philosopher: Philosopher;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface NetworkLink {
  source: string | NetworkNode;
  target: string | NetworkNode;
  sourceId: string;
  targetId: string;
}

export interface LineageResult {
  path: string[];
  philosophers: Philosopher[];
  length: number;
}

/**
 * Henter alle direkte og indirekte forgjengere (hvem som påvirket filosofen bakover i tid).
 */
export function getAncestors(
  id: string,
  philosophersMap: Map<string, Philosopher>,
  maxDepth = 8,
): string[] {
  const visited = new Set<string>();
  const queue: { id: string; depth: number }[] = [{ id, depth: 0 }];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.depth >= maxDepth) continue;

    const p = philosophersMap.get(current.id);
    if (!p) continue;

    for (const parentId of p.influencedBy) {
      if (!visited.has(parentId)) {
        visited.add(parentId);
        queue.push({ id: parentId, depth: current.depth + 1 });
      }
    }
  }

  return Array.from(visited);
}

/**
 * Henter alle direkte og indirekte etterfølgere (hvem filosofen inspirerte fremover i tid).
 */
export function getDescendants(
  id: string,
  philosophersMap: Map<string, Philosopher>,
  maxDepth = 8,
): string[] {
  const visited = new Set<string>();
  const queue: { id: string; depth: number }[] = [{ id, depth: 0 }];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.depth >= maxDepth) continue;

    const p = philosophersMap.get(current.id);
    if (!p || !p.influences) continue;

    for (const childId of p.influences) {
      if (!visited.has(childId)) {
        visited.add(childId);
        queue.push({ id: childId, depth: current.depth + 1 });
      }
    }
  }

  return Array.from(visited);
}

/**
 * Finner den lengste sammenhengende idéslekten (påvirkningskjeden) i hele datasettet.
 * Eksempel: Sokrates -> Platon -> Aristoteles -> Descartes -> Kant -> ...
 */
export function getLongestLineage(philosophers: Philosopher[]): LineageResult {
  const map = new Map<string, Philosopher>();
  for (const p of philosophers) {
    map.set(p.id, p);
  }

  // Memoization av lengste sti fra hver node
  const memo = new Map<string, string[]>();

  function dfs(currentId: string): string[] {
    if (memo.has(currentId)) {
      return memo.get(currentId)!;
    }

    const currentP = map.get(currentId);
    if (!currentP || !currentP.influences || currentP.influences.length === 0) {
      const single = [currentId];
      memo.set(currentId, single);
      return single;
    }

    let longestSubPath: string[] = [];
    for (const childId of currentP.influences) {
      const sub = dfs(childId);
      if (sub.length > longestSubPath.length) {
        longestSubPath = sub;
      }
    }

    const fullPath = [currentId, ...longestSubPath];
    memo.set(currentId, fullPath);
    return fullPath;
  }

  let bestPath: string[] = [];
  for (const p of philosophers) {
    const path = dfs(p.id);
    if (path.length > bestPath.length) {
      bestPath = path;
    }
  }

  return {
    path: bestPath,
    philosophers: bestPath.map((id) => map.get(id)!).filter(Boolean),
    length: bestPath.length,
  };
}

/**
 * Forbereder nodeliste og kantliste for graf- og nettverksvisning (f.eks. d3-force).
 */
export function getNetworkData(philosophers: Philosopher[]): {
  nodes: NetworkNode[];
  links: NetworkLink[];
} {
  const connectionCounts = new Map<string, number>();

  for (const p of philosophers) {
    const inc = p.influencedBy.length + (p.influences?.length ?? 0);
    connectionCounts.set(p.id, inc);
  }

  const nodes: NetworkNode[] = philosophers.map((p) => ({
    id: p.id,
    name: p.name,
    bornYear: p.born?.year ?? p.floruit?.from ?? -400,
    tradition: p.tradition,
    connectionCount: connectionCounts.get(p.id) ?? 0,
    philosopher: p,
  }));

  const links: NetworkLink[] = [];
  const existingSet = new Set<string>();

  for (const p of philosophers) {
    for (const sourceId of p.influencedBy) {
      const key = `${sourceId}->${p.id}`;
      if (!existingSet.has(key)) {
        existingSet.add(key);
        links.push({
          source: sourceId,
          target: p.id,
          sourceId,
          targetId: p.id,
        });
      }
    }
  }

  return { nodes, links };
}
