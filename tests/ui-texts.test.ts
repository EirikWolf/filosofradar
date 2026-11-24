import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { nb } from '../src/i18n/nb';

// B-020: UI-tekster som står for samme ting flere steder, samles i src/i18n/nb.ts. Testen
// finner faste tekster (JSX-tekst, aria-label, title, placeholder) som står i to eller
// flere filer. Maler med tall ser den ikke; de er samlet i nb.ts for hånd.

// Like ord som betyr ulike ting. Hvert unntak har en grunn.
const SAME_WORD_DIFFERENT_THING: Record<string, string> = {
  Wikidata: 'egennavn på kilden, ikke en UI-tekst',
  'Tema:': 'Ex.phil-pilar i kortet, temafilter på radaren',
  Nullstill: 'nullstiller søk i listen, filtre på tidslinjen og synsvinkel i galaksen',
};

const SRC = path.resolve(__dirname, '../src');

function tsxFiles(): string[] {
  return fs
    .readdirSync(SRC, { recursive: true, encoding: 'utf8' })
    .filter((f) => f.endsWith('.tsx') && !f.startsWith('generated'));
}

function fixedTexts(source: string): Set<string> {
  const texts = new Set<string>();
  for (const m of source.matchAll(/>\s*([^<>{}\n]*[A-Za-zÆØÅæøå][^<>{}\n]{2,}?)\s*</g)) texts.add(m[1].trim());
  for (const m of source.matchAll(/(?:aria-label|title|placeholder)="([^"]{3,})"/g)) texts.add(m[1].trim());
  return new Set([...texts].filter((t) => t.length >= 4));
}

describe('Gjentatte UI-tekster (B-020)', () => {
  it('står i src/i18n/nb.ts, ikke i flere filer', () => {
    const files = tsxFiles();
    // Vakt mot et tomt filter: uten filer ville testen vært grønn av feil grunn.
    expect(files.length).toBeGreaterThan(25);
    const seenIn = new Map<string, string[]>();
    for (const f of files) {
      for (const text of fixedTexts(fs.readFileSync(path.join(SRC, f), 'utf8'))) {
        seenIn.set(text, [...(seenIn.get(text) ?? []), path.basename(f)]);
      }
    }
    expect(seenIn.size).toBeGreaterThan(200);
    const repeated = [...seenIn]
      .filter(([text, where]) => where.length > 1 && !(text in SAME_WORD_DIFFERENT_THING))
      .map(([text, where]) => `«${text}» i ${where.join(', ')}`);
    expect(repeated).toEqual([]);
  });

  it('unntakene finnes fortsatt, ellers skal de ut av lista', () => {
    const all = tsxFiles().map((f) => fs.readFileSync(path.join(SRC, f), 'utf8'));
    for (const text of Object.keys(SAME_WORD_DIFFERENT_THING)) {
      expect(all.filter((s) => fixedTexts(s).has(text)).length, text).toBeGreaterThan(1);
    }
  });
});

describe('nb', () => {
  it('bøyer «filosof funnet» etter antallet', () => {
    expect(nb.philosophersFound(1)).toBe('1 filosof funnet');
    expect(nb.philosophersFound(0)).toBe('0 filosofer funnet');
    expect(nb.philosophersFound(12)).toBe('12 filosofer funnet');
  });

  it('setter tallene inn i malene', () => {
    expect(nb.all(80)).toBe('Alle (80)');
    expect(nb.allTraditions(3)).toBe('Alle tradisjoner (3)');
    expect(nb.questionOf(2, 12)).toBe('Spørsmål 2 av 12');
    expect(nb.stories(32)).toBe('32 Filosofiske Historier');
  });
});
