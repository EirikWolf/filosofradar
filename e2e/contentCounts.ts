import fs from 'node:fs';

/** Tallene byggeskriptet skrev, så røyktestene ikke har dem skrevet inn for hånd. */
export const contentCounts = JSON.parse(
  fs.readFileSync(new URL('../src/generated/contentCounts.json', import.meta.url), 'utf8'),
) as { philosophers: number; traditions: number; stories: number };
