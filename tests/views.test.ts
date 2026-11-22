import { describe, it, expect } from 'vitest';
import { VIEWS, isViewMode, isObservatoryView, isExperienceView, sitemapViews, urlFor } from '../src/lib/views';

// ARK-03: visningslisten sto fem steder. Nå er VIEWS den eneste, og resten avledes.

describe('VIEWS', () => {
  it('har unike ID-er og kjenner alle visningene appen har', () => {
    const ids = VIEWS.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect([...ids].sort()).toEqual(
      ['about', 'ethics', 'exphil', 'factcheck', 'galaxy', 'list', 'network', 'quiz', 'radar', 'timeline'],
    );
  });

  it('skiller gyldige og ukjente visninger', () => {
    expect(isViewMode('timeline')).toBe(true);
    expect(isViewMode('finnes-ikke')).toBe(false);
    expect(isViewMode(null)).toBe(false);
  });

  it('grupperer observatoriet og opplevelsene', () => {
    expect(VIEWS.filter((v) => isObservatoryView(v.id)).map((v) => v.id)).toEqual(
      ['radar', 'galaxy', 'timeline', 'network', 'list'],
    );
    expect(VIEWS.filter((v) => isExperienceView(v.id)).map((v) => v.id)).toEqual(['quiz', 'ethics']);
  });

  it('gir de samme visningene til sitemap som før', () => {
    expect(sitemapViews().map((v) => v.id)).toEqual(
      ['radar', 'timeline', 'list', 'quiz', 'exphil', 'ethics', 'about'],
    );
  });
});

describe('urlFor', () => {
  const base = 'https://filosofradar.web.app/';
  it('fjerner v for radaren og setter den for andre visninger', () => {
    expect(urlFor(`${base}?v=about`, { view: 'radar' })).toBe(base);
    expect(urlFor(base, { view: 'timeline' })).toBe(`${base}?v=timeline`);
  });

  it('setter og fjerner kortet uten å røre visningen', () => {
    expect(urlFor(`${base}?v=exphil`, { card: 'sokrates' })).toBe(`${base}?v=exphil&f=sokrates`);
    expect(urlFor(`${base}?v=exphil&f=sokrates`, { card: null })).toBe(`${base}?v=exphil`);
  });

  it('kan gjøre begge deler i én adresse', () => {
    expect(urlFor(`${base}?v=about&f=sokrates`, { view: 'radar', card: null })).toBe(base);
  });

  it('beholder andre parametre', () => {
    expect(urlFor(`${base}?utm=x`, { view: 'quiz' })).toBe(`${base}?utm=x&v=quiz`);
  });
});
