import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// Disse testene leser kildeteksten, ikke oppførselen (TST-01). De fanger at noe
// slettes, men ikke at det havner på feil sted eller slutter å virke. Oppførselen
// testes her:
//   UU-01 fokusfelle i dialoger      tests/dialog-focus.test.tsx
//   UU-02 Enter/Mellomrom på knapper  tests/flashcards-keyboard.test.tsx
//   UU-04 Tab-rekkefølge på radaren   tests/radar-keyboard.test.tsx
//   Søkerangeringen                  tests/search.test.ts
// UU-10 (ruting med ?v= og ?f=) har ennå ingen oppførselstest.

describe('UU-rettinger som sjekkes i kildeteksten', () => {
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

  it('[UU-10 & Hjem-knapp] App.tsx har ruting via URL searchParams (?v= og ?f=) og handleGoHome', () => {
    const appPath = path.resolve(__dirname, '../src/App.tsx');
    const appCode = fs.readFileSync(appPath, 'utf-8');
    expect(appCode).toContain('handleGoHome');
    expect(appCode).toContain("url.searchParams.set('v', nextView)");
    expect(appCode).toContain("params.get('v')");
    expect(appCode).toContain('popstate');
  });
});
