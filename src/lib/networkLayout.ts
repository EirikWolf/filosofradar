import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceX,
  forceY,
  type Simulation,
} from 'd3-force';
import type { NetworkNode, NetworkLink } from './influence';
import { AXIS_END_YEAR, AXIS_START_YEAR } from './timeScale';

/**
 * Oppsettet for idénettverket (YTE-02).
 *
 * Simuleringen kjøres ferdig her, synkront, i stedet for å tegnes steg for steg.
 * Selve beregningen tar under 70 ms for 80 noder; det som kostet var at React tegnet
 * hele grafen på nytt i hvert av ca. 300 steg, som ga 15–24 fps i 5–15 s på mobil.
 * Visningen tegner det ferdige oppsettet én gang og lar CSS gli stjernene på plass.
 */

/** Tidsaksen: fødselsår i dette spennet fordeles fra venstre til høyre kant. */
const MIN_YEAR = AXIS_START_YEAR;
const MAX_YEAR = AXIS_END_YEAR;
const LINK_DISTANCE = 95;
const CHARGE_STRENGTH = -280;
const CENTER_STRENGTH = 0.05;
const Y_STRENGTH = 0.12;

export interface NetworkLayoutOptions {
  width: number;
  height: number;
  /** Hvor hardt nodene trekkes mot fødselsåret sitt på x-aksen (0 = fritt). */
  timeForce: number;
}

export interface NetworkLayout {
  /** Stoppet simulering. Brukes videre bare når en node dras. */
  simulation: Simulation<NetworkNode, NetworkLink>;
  nodes: NetworkNode[];
  links: NetworkLink[];
}

/** X-posisjonen et fødselsår trekkes mot. */
export function timeAxisX(year: number, width: number): number {
  const paddingX = Math.min(120, width * 0.1);
  const frac = (year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR);
  return paddingX + frac * (width - 2 * paddingX);
}

/**
 * Kjører simuleringen til den har roet seg og returnerer antall steg som ble kjørt.
 * Antallet regnes ut fra hvor langt alfa har igjen ned til alphaMin, slik d3 selv
 * ville stoppet, så den virker både første gang (ca. 300 steg) og etter en dragning.
 */
export function settleSimulation(simulation: Simulation<NetworkNode, NetworkLink>): number {
  simulation.stop();
  const alpha = simulation.alpha();
  const alphaMin = simulation.alphaMin();
  const target = simulation.alphaTarget();
  if (alpha <= alphaMin || target >= alphaMin) return 0;
  const ticks = Math.ceil(Math.log(alphaMin / alpha) / Math.log(1 - simulation.alphaDecay()));
  simulation.tick(ticks);
  return ticks;
}

/** Lager et ferdig utregnet oppsett. Rådataene muteres ikke. */
export function computeNetworkLayout(
  rawNodes: NetworkNode[],
  rawLinks: NetworkLink[],
  { width, height, timeForce }: NetworkLayoutOptions,
): NetworkLayout {
  const nodes: NetworkNode[] = rawNodes.map((d) => ({ ...d }));
  const links: NetworkLink[] = rawLinks.map((d) => ({ ...d }));

  const simulation = forceSimulation<NetworkNode>(nodes)
    .force(
      'link',
      forceLink<NetworkNode, NetworkLink>(links)
        .id((d) => d.id)
        .distance(LINK_DISTANCE),
    )
    .force('charge', forceManyBody().strength(CHARGE_STRENGTH))
    .force('center', forceCenter(width / 2, height / 2).strength(CENTER_STRENGTH))
    .force('x', forceX<NetworkNode>((d) => timeAxisX(d.bornYear, width)).strength(timeForce))
    .force('y', forceY(height / 2).strength(Y_STRENGTH))
    .stop();

  settleSimulation(simulation);
  return { simulation, nodes, links };
}
