import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';
import { countContent, fillContentCounts } from '../src/lib/siteCounts';
import philosophersData from '../src/generated/philosophers.json';
import contentCounts from '../src/generated/contentCounts.json';
import type { Philosopher } from '../src/schemas/philosopher';

// Beskrivelsen for søkemotorer, delingsforhåndsvisning og manifestet sa «80 filosofer,
// 9 tradisjoner» skrevet inn for hånd. Tallene fylles nå inn ved bygg, fra de samme
// dataene som appen bruker (ARK-06).

const philosophers = philosophersData as Philosopher[];
const read = (file: string) => fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8');

describe('countContent', () => {
  it('teller filosofene og tradisjonene som er i bruk', () => {
    const counts = countContent([
      { tradition: 'greek-roman' },
      { tradition: 'greek-roman' },
      { tradition: 'nordic' },
    ]);
    expect(counts).toEqual({ philosophers: 3, traditions: 2 });
  });

  it('gir de samme tallene som byggeskriptet skrev', () => {
    expect(countContent(philosophers)).toEqual({
      philosophers: contentCounts.philosophers,
      traditions: contentCounts.traditions,
    });
  });
});

describe('fillContentCounts', () => {
  const counts = { philosophers: 81, traditions: 10 };

  it('fyller inn tallene', () => {
    expect(fillContentCounts('%PHILOSOPHER_COUNT% filosofer, %TRADITION_COUNT% tradisjoner', counts)).toBe(
      '81 filosofer, 10 tradisjoner',
    );
  });

  it('stopper bygget når en plassholder ikke er kjent', () => {
    expect(() => fillContentCounts('%SCHOOL_COUNT% skoler', counts)).toThrow(/SCHOOL_COUNT/);
  });
});

describe('Malene for index.html og manifestet', () => {
  const files = ['index.html', 'src/site/manifest.webmanifest'];

  it.each(files)('%s har ingen tall for filosofer eller tradisjoner skrevet inn for hånd', (file) => {
    expect(read(file)).not.toMatch(/\d+\s+(filosofer|(globale\s+)?tradisjoner)/);
  });

  it.each(files)('%s bruker plassholderne', (file) => {
    expect(read(file)).toContain('%PHILOSOPHER_COUNT% filosofer');
    expect(read(file)).toMatch(/%TRADITION_COUNT% (globale )?tradisjoner/);
  });

  it('manifestet ligger ikke i public/, der Vite kopierer filer urørt', () => {
    expect(fs.existsSync(path.resolve(__dirname, '../public/manifest.webmanifest'))).toBe(false);
  });
});
