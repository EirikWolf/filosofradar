import { computeRadarLayout } from '../src/lib/layout';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';

const philosophers = philosophersData as Philosopher[];
const points = computeRadarLayout(philosophers);
const sokrates = points.find((p) => p.id === 'sokrates');

if (!sokrates) {
  console.error('Fant ikke Sokrates i layoutet!');
  process.exit(1);
}

console.log('\n🏛️ SOKRATES PÅ FILOSOFRADAREN:');
console.log('──────────────────────────────────────');
console.log(`Navn:             ${sokrates.philosopher.name} (${sokrates.philosopher.nameOriginal})`);
console.log(`Født:             ca. 470 f.Kr.`);
console.log(`Tradisjon:        ${sokrates.tradition}`);
console.log(`Avstand (radius): ${sokrates.radius.toFixed(1)} px fra sentrum`);
console.log(`Retning (vinkel): ${sokrates.angleDeg.toFixed(1)}° (sør-øst)`);
console.log('──────────────────────────────────────');
console.log(`📍 Skjerm-koordinater:`);
console.log(`   x = ${Math.round(sokrates.x)} px`);
console.log(`   y = ${Math.round(sokrates.y)} px`);
console.log('──────────────────────────────────────');
console.log('✅ Helt likt som regnestykket vårt!\n');
