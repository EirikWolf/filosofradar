import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_DIR = path.resolve(__dirname, '../content/philosophers');

interface PhilosopherData {
  id: string;
  name: string;
  wikidata: string;
  born?: { year: number; approx?: boolean };
  died?: { year: number; approx?: boolean };
}

interface WikidataTime {
  time?: string;
}

interface WikidataClaim {
  mainsnak?: {
    datavalue?: {
      value?: WikidataTime;
    };
  };
}

function parseWikidataYear(timeStr?: string): number | null {
  if (!timeStr) return null;
  // Format: "+1912-01-27T00:00:00Z" eller "-0469-00-00T00:00:00Z"
  const match = timeStr.match(/^([+-])(\d+)/);
  if (!match) return null;
  const sign = match[1] === '-' ? -1 : 1;
  const year = parseInt(match[2], 10);
  return sign * year;
}

async function verifyWikidata() {
  console.log('🌐 Sjekker årstall mot Wikidata (SPARQL / EntityData API) ...\n');

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json'));
  const philosophers: PhilosopherData[] = [];

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    philosophers.push(data);
  }

  let checked = 0;
  let matches = 0;
  let discrepancies = 0;

  for (const p of philosophers) {
    if (!p.wikidata) {
      console.log(`⚠️ ${p.name} (${p.id}): Mangler Wikidata Q-nummer`);
      continue;
    }

    try {
      const url = `https://www.wikidata.org/wiki/Special:EntityData/${p.wikidata}.json`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Filosofradaren/1.0 (https://github.com/filosofradar; contact@filosofradar.local)',
        },
      });

      if (!response.ok) {
        console.warn(`⚠️ ${p.name} (${p.wikidata}): Kunne ikke hente data (${response.status})`);
        continue;
      }

      const json = await response.json();
      const entity = json.entities?.[p.wikidata];
      if (!entity) {
        console.warn(`⚠️ ${p.name}: Entitet ikke funnet for ${p.wikidata}`);
        continue;
      }

      // P569 = fødselsdato, P570 = dødsdato
      const p569: WikidataClaim[] = entity.claims?.P569 || [];
      const p570: WikidataClaim[] = entity.claims?.P570 || [];

      const birthTime = p569[0]?.mainsnak?.datavalue?.value?.time;
      const deathTime = p570[0]?.mainsnak?.datavalue?.value?.time;

      const wikiBorn = parseWikidataYear(birthTime);
      const wikiDied = parseWikidataYear(deathTime);

      const localBorn = p.born?.year;
      const localDied = p.died?.year;

      const bornDiff = wikiBorn !== null && localBorn !== undefined && Math.abs(wikiBorn - localBorn) > 2;
      const diedDiff = wikiDied !== null && localDied !== undefined && Math.abs(wikiDied - localDied) > 2;

      checked++;

      if (bornDiff || diedDiff) {
        discrepancies++;
        console.log(`⚠️ AVVIK FOR: ${p.name} (${p.wikidata})`);
        if (bornDiff) {
          console.log(`   Født: Lokalt ${localBorn} vs. Wikidata ${wikiBorn}`);
        }
        if (diedDiff) {
          console.log(`   Død:  Lokalt ${localDied} vs. Wikidata ${wikiDied}`);
        }
      } else {
        matches++;
        console.log(`✓ ${p.name} (${p.wikidata}): Stemmer overens med Wikidata (Født: ${localBorn}, Død: ${localDied ?? 'ukjent'})`);
      }
    } catch (err) {
      console.warn(`⚠️ Feil ved sjekk av ${p.name}:`, err);
    }
  }

  console.log(`\n📊 Wikidata-rapport:`);
  console.log(`  - Sjekket: ${checked}/${philosophers.length}`);
  console.log(`  - Bekreftet: ${matches}`);
  console.log(`  - Avvik: ${discrepancies}`);
}

verifyWikidata();
