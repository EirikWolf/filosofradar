import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { getLongestLineage } from '../src/lib/influence';
import { formatYear } from '../src/lib/years';

const philosophers = philosophersData as Philosopher[];
const result = getLongestLineage(philosophers);

console.log('\n👑 HISTORIENS LENGSTE IDÉ-SLEKT (STAFETT):');
console.log('───────────────────────────────────────────────────────');
console.log(`Lengde: ${result.length} filosofer på rad som inspirerte hverandre!\n`);

result.philosophers.forEach((p, idx) => {
  const year = p.born?.year ?? p.floruit?.from ?? 0;
  const arrow = idx < result.philosophers.length - 1 ? '   │\n   ▼ inspirerte' : '';
  console.log(`[${idx + 1}] ${p.name.padEnd(24)} (f. ${formatYear(year)})`);
  if (arrow) console.log(arrow);
});

console.log('───────────────────────────────────────────────────────\n');
