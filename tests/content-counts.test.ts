import { describe, it, expect } from 'vitest';
import contentCounts from '../src/generated/contentCounts.json';
import { BESPOKE_STORIES } from '../src/features/story/storyData';

// ARK-06: byggeskriptet teller fortellingene, så menyen kan vise tallet uten å laste
// fortellingsdataene på forsiden.
describe('Avledede tall fra byggeskriptet', () => {
  it('antallet fortellinger er det samme som i dataene', () => {
    expect(contentCounts.stories).toBe(Object.keys(BESPOKE_STORIES).length);
    expect(contentCounts.stories).toBeGreaterThan(0);
  });
});
