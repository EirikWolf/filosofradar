import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PhilosopherSchema, type PhilosopherInput, type Philosopher } from '../src/schemas/philosopher';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.resolve(__dirname, '../content/philosophers');
const OUTPUT_DIR = path.resolve(__dirname, '../src/generated');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'philosophers.json');

const isValidateOnly = process.argv.includes('--validate-only');

function run() {
  console.log('🔍 Validerer innhold i content/philosophers/ ...');

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`❌ Mappen finnes ikke: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.json'));

  if (files.length === 0) {
    console.warn('⚠️ Ingen filosof-filer funnet.');
    process.exit(0);
  }

  const rawPhilosophers: PhilosopherInput[] = [];
  const idMap = new Map<string, PhilosopherInput>();
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const expectedId = path.basename(file, '.json');

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const json = JSON.parse(content);
      const parsed = PhilosopherSchema.safeParse(json);

      if (!parsed.success) {
        errors.push(`[${file}] Valideringsfeil:\n${parsed.error.issues.map((e) => `  - ${e.path.join('.')}: ${e.message}`).join('\n')}`);
        continue;
      }

      const p = parsed.data;

      if (p.id !== expectedId) {
        errors.push(`[${file}] ID "${p.id}" stemmer ikke med filnavnet "${expectedId}.json"`);
      }

      if (idMap.has(p.id)) {
        errors.push(`[${file}] Duplikat ID: "${p.id}" er allerede i bruk`);
      }

      idMap.set(p.id, p);
      rawPhilosophers.push(p);

      // Advarsler (ikke feil)
      if (!p.reviewed) {
        warnings.push(`[${p.id}] Ikke godkjent ennå (reviewed: false)`);
      }
      if (!p.image) {
        warnings.push(`[${p.id}] Mangler bilde`);
      }
      const hasNoWiki = p.links.some((l) => l.url.includes('no.wikipedia.org'));
      if (!hasNoWiki) {
        warnings.push(`[${p.id}] Mangler norsk Wikipedia-lenke`);
      }
    } catch (err) {
      errors.push(`[${file}] Ugyldig JSON-format: ${String(err)}`);
    }
  }

  // Sjekk relasjoner mellom filosofene (influencedBy)
  for (const p of rawPhilosophers) {
    for (const inflId of p.influencedBy) {
      const influencer = idMap.get(inflId);
      if (!influencer) {
        errors.push(`[${p.id}] "influencedBy" peker til ukjent filosof-ID "${inflId}"`);
      } else {
        // Sjekk at påvirkeren er eldre enn den påvirkede
        const pYear = p.born?.year ?? p.floruit?.from ?? 0;
        const inflYear = influencer.born?.year ?? influencer.floruit?.from ?? 0;
        if (inflYear > pYear) {
          errors.push(
            `[${p.id}] Påvirker "${inflId}" (${inflYear}) er født ETTER ${p.id} (${pYear})!`,
          );
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error('\n❌ Følgende feil må rettes:');
    for (const e of errors) {
      console.error(e);
    }
    process.exit(1);
  }

  // Beregn omvendte relasjoner (hvem filosofen påvirket)
  const influencesMap = new Map<string, string[]>();
  for (const p of rawPhilosophers) {
    influencesMap.set(p.id, []);
  }

  for (const p of rawPhilosophers) {
    for (const inflId of p.influencedBy) {
      influencesMap.get(inflId)?.push(p.id);
    }
  }

  const finalPhilosophers: Philosopher[] = rawPhilosophers.map((p) => ({
    ...p,
    influences: influencesMap.get(p.id) || [],
  }));

  // Statistikk
  const traditionCounts: Record<string, number> = {};
  const genderCounts: Record<string, number> = {};
  let reviewedCount = 0;

  for (const p of finalPhilosophers) {
    traditionCounts[p.tradition] = (traditionCounts[p.tradition] || 0) + 1;
    const g = p.gender || 'uspesifisert';
    genderCounts[g] = (genderCounts[g] || 0) + 1;
    if (p.reviewed) reviewedCount++;
  }

  console.log(`\n✅ Alle ${finalPhilosophers.length} filosofer er gyldige!`);
  console.log(`📊 Statistikk:`);
  console.log(`  - Totalt: ${finalPhilosophers.length} (Gjennomlest: ${reviewedCount}/${finalPhilosophers.length})`);
  console.log(`  - Tradisjoner:`, traditionCounts);
  console.log(`  - Kjønnsfordeling:`, genderCounts);

  if (warnings.length > 0 && !isValidateOnly) {
    console.log(`\n💡 ${warnings.length} redaksjonelle merknader (f.eks. reviewed: false)`);
  }

  if (isValidateOnly) {
    console.log('✨ Validering fullført uten feil!');
    return;
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalPhilosophers, null, 2), 'utf-8');
  console.log(`📦 Bygget og lagret: ${OUTPUT_FILE}`);
}

run();
