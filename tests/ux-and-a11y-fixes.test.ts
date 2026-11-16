import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';

const philosophers = philosophersData as Philosopher[];

describe('UX, Navigasjonslogikk og Tilgjengelighetsutbedringer (UU-01 til UU-10)', () => {
  it('[UU-09] index.html har spesifisert lang="nb"', () => {
    const htmlPath = path.resolve(__dirname, '../index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    expect(html).toMatch(/<html\s+lang="nb"/);
  });

  it('[UU-05] index.css har global overstyring for prefers-reduced-motion', () => {
    const cssPath = path.resolve(__dirname, '../src/index.css');
    const css = fs.readFileSync(cssPath, 'utf-8');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
    expect(css).toContain('animation-duration: 0.01ms !important');
    expect(css).toContain('transition-duration: 0.01ms !important');
  });

  it('[UU-04] Stjernene i radaren sorteres strengt kronologisk etter fødselsår', () => {
    const sorted = [...philosophers].sort((a, b) => {
      const aYear = a.born?.year ?? a.floruit?.from ?? 0;
      const bYear = b.born?.year ?? b.floruit?.from ?? 0;
      return aYear - bYear;
    });

    expect(sorted[0].id).toBe('ptahhotep');
    expect(sorted[1].id).toBe('gargi');

    // Sjekk monoton kronologisk rekkefølge for hele arrayet
    for (let i = 1; i < sorted.length; i++) {
      const prevYear = sorted[i - 1].born?.year ?? sorted[i - 1].floruit?.from ?? 0;
      const currYear = sorted[i].born?.year ?? sorted[i].floruit?.from ?? 0;
      expect(currYear).toBeGreaterThanOrEqual(prevYear);
    }
  });

  it('[Søk & Finn Sokrates] Søkematch-logikken prioriterer eksakt/prefiks navnetreff foran omtale i andres idéer', () => {
    const query = 'sokrates';
    const matches = philosophers
      .filter((p) => {
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesOrig = p.nameOriginal?.toLowerCase().includes(query);
        const matchesSchool = p.schools.some((s) => s.toLowerCase().includes(query));
        const matchesIdea = p.keyIdeas.some(
          (k) => k.title.toLowerCase().includes(query) || k.text.toLowerCase().includes(query)
        );
        return matchesName || matchesOrig || matchesSchool || matchesIdea;
      })
      .sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        if (aName === query) return -1;
        if (bName === query) return 1;
        if (aName.startsWith(query) && !bName.startsWith(query)) return -1;
        if (!aName.startsWith(query) && bName.startsWith(query)) return 1;
        const aYear = a.born?.year ?? a.floruit?.from ?? 0;
        const bYear = b.born?.year ?? b.floruit?.from ?? 0;
        return aYear - bYear;
      });

    expect(matches.length).toBeGreaterThanOrEqual(1);
    expect(matches[0].id).toBe('sokrates');
    expect(matches[0].name).toBe('Sokrates');
  });

  it('[Søk & Finn Idéer] Søkematch finner Platon ved "hulelignelsen"', () => {
    const query = 'hulelignelsen';
    const matches = philosophers.filter((p) =>
      p.keyIdeas.some((k) => k.title.toLowerCase().includes(query) || k.text.toLowerCase().includes(query))
    );
    expect(matches.length).toBeGreaterThanOrEqual(1);
    expect(matches.some((p) => p.id === 'platon')).toBe(true);
  });

  it('[UU-06] text-star-dim/70 opasitet er fjernet fra kildekoden for optimal kontrast', () => {
    const filesToCheck = [
      '../src/App.tsx',
      '../src/features/list/PhilosopherList.tsx',
      '../src/features/quiz/QuizView.tsx',
      '../src/features/timeline/TimelineView.tsx',
      '../src/features/tours/TourPlayer.tsx',
      '../src/features/tours/TourSelectModal.tsx',
    ];

    for (const f of filesToCheck) {
      const filePath = path.resolve(__dirname, f);
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).not.toContain('text-star-dim/70');
    }
  });

  it('[UU-03] RadarView og PhilosopherList inneholder tilgjengelige aria-labels på skjemafelter', () => {
    const radarPath = path.resolve(__dirname, '../src/features/radar/RadarView.tsx');
    const radarCode = fs.readFileSync(radarPath, 'utf-8');
    expect(radarCode).toContain('aria-label="Søk etter filosof eller idé"');
    expect(radarCode).toContain('aria-label="Filtrer etter tradisjon"');
    expect(radarCode).toContain('aria-label="Filtrer etter tema"');

    const listPath = path.resolve(__dirname, '../src/features/list/PhilosopherList.tsx');
    const listCode = fs.readFileSync(listPath, 'utf-8');
    expect(listCode).toContain('aria-label="Søk etter filosof, idé, retning eller verdensdel"');
  });

  // [UU-01] Fokusfellen i PhilosopherCard testes nå på oppførsel, ikke kildekode,
  // sammen med de andre dialogene i tests/dialog-focus.test.tsx (HEL-02).

  it('[UU-02] ExphilFlashcardsView blokkerer ikke Enter/Mellomrom på knapper og lenker', () => {
    const flashcardsPath = path.resolve(__dirname, '../src/features/exphil/ExphilFlashcardsView.tsx');
    const flashcardsCode = fs.readFileSync(flashcardsPath, 'utf-8');
    expect(flashcardsCode).toContain("target.tagName === 'BUTTON'");
    expect(flashcardsCode).toContain("target.tagName === 'A'");
  });

  it('[UU-10 & Hjem-knapp] App.tsx har ruting via URL searchParams (?v= og ?f=) og handleGoHome', () => {
    const appPath = path.resolve(__dirname, '../src/App.tsx');
    const appCode = fs.readFileSync(appPath, 'utf-8');
    expect(appCode).toContain('handleGoHome');
    expect(appCode).toContain("url.searchParams.set('v', nextView)");
    expect(appCode).toContain("params.get('v')");
    expect(appCode).toContain('popstate');
  });
});
