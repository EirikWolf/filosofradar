/**
 * Slår opp alle lenker til Nasjonalbiblioteket (nb.no/items/URN:…) i dypdykkene i NBs
 * åpne katalog-API, og skriver ut tittelen som står på posten. Feiler hvis en URN ikke
 * finnes. Kjøres for hånd med `npm run sjekk-lenker`, ikke i CI, så testene ikke blir
 * avhengige av nettet (ARK-05).
 *
 * Bakgrunn: lenken til Kants «Grunnlegging av moralens metafysikk» pekte på en URN
 * som ga 404, og historikken har oppdiktede URN-er (751e226). tests/links.test.ts
 * sjekker bare formatet. Les titlene i utskriften: en URN som finnes, kan fortsatt
 * peke på feil bok.
 */
import { PHILOSOPHER_DEEP_DIVES } from '../src/features/deepdive/deepDiveData';

const NB_URN = /^https:\/\/www\.nb\.no\/items\/(URN:NBN:[\w-]+)$/;
const CATALOG = 'https://api.nb.no/catalog/v1/items';

interface CatalogItem {
  metadata?: { title?: string; originInfo?: { issued?: string } };
  accessInfo?: { accessAllowedFrom?: string };
}

const links = Object.values(PHILOSOPHER_DEEP_DIVES).flatMap((dd) =>
  dd.majorWorks.flatMap((work) => {
    const urn = work.url?.match(NB_URN)?.[1];
    return urn ? [{ where: `${dd.philosopherId}: ${work.title}`, urn }] : [];
  }),
);

let missing = 0;
for (const { where, urn } of links) {
  const res = await fetch(`${CATALOG}?q=${encodeURIComponent(`urn:"${urn}"`)}`);
  if (!res.ok) {
    missing++;
    console.error(`FEIL  ${where}\n      ${urn}: katalogen svarte ${res.status}`);
    continue;
  }
  const items = ((await res.json()) as { _embedded?: { items?: CatalogItem[] } })._embedded?.items ?? [];
  const item = items[0];
  if (!item) {
    missing++;
    console.error(`FEIL  ${where}\n      ${urn}: finnes ikke i katalogen`);
    continue;
  }
  const { title = '?', originInfo } = item.metadata ?? {};
  console.log(`OK    ${where}\n      → «${title}» (${originInfo?.issued ?? 'år ukjent'}), tilgang: ${item.accessInfo?.accessAllowedFrom ?? '?'}`);
}

console.log(`\n${links.length - missing} av ${links.length} NB-lenker finnes i katalogen.`);
if (links.length === 0) {
  // Vakt mot et tomt filter: ingen lenker betyr at skriptet ikke fant dem, ikke at alt er i orden.
  console.error('Fant ingen NB-lenker i dypdykkene. Sjekk mønsteret.');
  process.exit(1);
}
if (missing > 0) process.exit(1);
