import { describe, it, expect } from 'vitest';
import { PHILOSOPHER_DEEP_DIVES } from '../src/features/deepdive/deepDiveData';

describe('Deep Dive Links Integrity', () => {
  it('should not contain hallucinated Barnetimen URN', () => {
    const raw = JSON.stringify(PHILOSOPHER_DEEP_DIVES);
    expect(raw).not.toContain('2008052104037');
  });

  it('should only have valid http/https URLs on majorWorks', () => {
    for (const dive of Object.values(PHILOSOPHER_DEEP_DIVES)) {
      for (const work of dive.majorWorks) {
        if (work.url) {
          expect(work.url).toMatch(/^https?:\/\//);
          expect(work.urlLabel).toBeDefined();
          expect(work.urlLabel?.length).toBeGreaterThan(3);
        }
      }
    }
  });

  it('should never place URLs on thoughtExperiments', () => {
    for (const dive of Object.values(PHILOSOPHER_DEEP_DIVES)) {
      if (dive.thoughtExperiments) {
        for (const te of dive.thoughtExperiments) {
          expect((te as unknown as { url?: string }).url).toBeUndefined();
          expect((te as unknown as { urlLabel?: string }).urlLabel).toBeUndefined();
        }
      }
    }
  });

  it('should have verified working URL for Arne Næss Økologi, samfunn og livsstil', () => {
    const naess = PHILOSOPHER_DEEP_DIVES['arne-naess'];
    expect(naess).toBeDefined();
    const ecoWork = naess.majorWorks.find(w => w.title.includes('Økologi'));
    expect(ecoWork).toBeDefined();
    expect(ecoWork?.url).toBe('https://www.nb.no/items/URN:NBN:no-nb_digibok_2007052500001');
  });

  it('should have verified working URL for Zapffe Om det tragiske', () => {
    const zapffe = PHILOSOPHER_DEEP_DIVES['zapffe'];
    expect(zapffe).toBeDefined();
    const tragicWork = zapffe.majorWorks.find(w => w.title.includes('Om det tragiske'));
    expect(tragicWork).toBeDefined();
    expect(tragicWork?.url).toBe('https://www.nb.no/items/URN:NBN:no-nb_digibok_2008061704041');
  });
});
