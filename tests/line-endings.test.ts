import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

// ARK-04: et regex-skript satte inn linjer i deepDiveData.ts og etterlot \r\r\r\n og
// tomme linjer med mellomrom. .gitattributes gjør CRLF om til LF, men en løs \r (uten
// \n etter) er innhold for git og ville overlevd. Den er kjennetegnet på skaden.

const ROOT = path.resolve(__dirname, '..');
const DIRS = ['src', 'tests', 'scripts', 'content', 'docs', 'e2e'];
const TEXT = /\.(ts|tsx|js|cjs|mjs|json|md|css|html|yml|yaml)$/;

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === 'generated' ? [] : walk(full);
    return TEXT.test(entry.name) ? [full] : [];
  });
}

describe('Linjeslutt', () => {
  const files = DIRS.flatMap((d) => walk(path.join(ROOT, d)));

  it('finner kildefilene', () => {
    // Vakt mot et tomt filter: et tomt resultat skal ikke gi grønt.
    expect(files.length).toBeGreaterThan(100);
  });

  it('har ingen løse \r (uten \n etter) i noen tekstfil', () => {
    const broken = files
      .filter((f) => /\r(?!\n)/.test(fs.readFileSync(f, 'utf8')))
      .map((f) => path.relative(ROOT, f));
    expect(broken).toEqual([]);
  });

  it('har .gitattributes med LF for tekst', () => {
    expect(fs.readFileSync(path.join(ROOT, '.gitattributes'), 'utf8')).toMatch(/^\* text=auto eol=lf$/m);
  });
});
