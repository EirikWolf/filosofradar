import philosophersData from '../src/generated/philosophers.json';
import { calculateLifespan, formatLifeSpan } from '../src/lib/years';
import type { Philosopher } from '../src/schemas/philosopher';

const philosophers = philosophersData as Philosopher[];

interface PhilosopherAge {
  navn: string;
  alder: number;
  levetid: string;
}

const withAge: PhilosopherAge[] = [];

for (const p of philosophers) {
  if (p.born && p.died) {
    const age = calculateLifespan(p.born.year, p.died.year);
    withAge.push({
      navn: p.name,
      alder: age,
      levetid: formatLifeSpan({ born: p.born, died: p.died }),
    });
  }
}

withAge.sort((a, b) => b.alder - a.alder);

console.log('\n🏆 Topp 5 eldste filosofer på Filosofradaren:');
console.table(withAge.slice(0, 5));

if (withAge.length > 0) {
  console.log(`\n🥇 1. plass: ${withAge[0].navn} (${withAge[0].alder} år gammel!)`);
}
