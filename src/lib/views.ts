// Visningene i appen og adressene deres (ARK-03). Før sto visningslisten fem steder:
// typen, hvitelisten for ?v=, to gruppesjekker og sitemap. En ny visning som ble
// glemt ett av stedene, virket ved klikk, men ikke fra en delt lenke.

export type ViewGroup = 'observatory' | 'experience' | 'exphil' | 'info';

interface ViewDefinition {
  id: string;
  group: ViewGroup;
  /** Med i sitemap.xml, med søkemotorens prioritet og forventet endringstakt. */
  sitemap?: { priority: string; changefreq: 'weekly' | 'monthly' };
}

/** Rekkefølgen er rekkefølgen i menyen og i sitemap. */
export const VIEWS = [
  { id: 'radar', group: 'observatory', sitemap: { priority: '0.9', changefreq: 'weekly' } },
  { id: 'galaxy', group: 'observatory' },
  { id: 'timeline', group: 'observatory', sitemap: { priority: '0.8', changefreq: 'weekly' } },
  { id: 'network', group: 'observatory' },
  { id: 'list', group: 'observatory', sitemap: { priority: '0.8', changefreq: 'weekly' } },
  { id: 'quiz', group: 'experience', sitemap: { priority: '0.8', changefreq: 'monthly' } },
  { id: 'exphil', group: 'exphil', sitemap: { priority: '0.8', changefreq: 'monthly' } },
  { id: 'ethics', group: 'experience', sitemap: { priority: '0.8', changefreq: 'monthly' } },
  { id: 'about', group: 'info', sitemap: { priority: '0.6', changefreq: 'monthly' } },
  { id: 'factcheck', group: 'info' },
] as const satisfies readonly ViewDefinition[];

export type ViewMode = (typeof VIEWS)[number]['id'];

const groupOf = new Map<string, ViewGroup>(VIEWS.map((v) => [v.id, v.group]));

/** Om en verdi fra adressen (?v=) er en visning appen har. */
export function isViewMode(value: string | null): value is ViewMode {
  return value !== null && groupOf.has(value);
}

/** Radaren, galaksen, tidslinjen, idénettverket og lista: de som deler menyen øverst. */
export function isObservatoryView(view: ViewMode): boolean {
  return groupOf.get(view) === 'observatory';
}

/** Quizen og etikklaben. */
export function isExperienceView(view: ViewMode): boolean {
  return groupOf.get(view) === 'experience';
}

/** Visningene som skal stå i sitemap.xml, i menyrekkefølge. */
export function sitemapViews(): Array<{ id: ViewMode; priority: string; changefreq: string }> {
  return VIEWS.flatMap((v) => ('sitemap' in v ? [{ id: v.id, ...v.sitemap }] : []));
}

/**
 * Adressen etter en navigering. `view` setter visningen (radaren har ingen ?v=), og
 * `card` åpner (ID) eller lukker (null) filosofkortet. Felt som ikke er oppgitt, står
 * som de var, og andre parametre beholdes.
 */
export function urlFor(currentUrl: string, change: { view?: ViewMode; card?: string | null }): string {
  const url = new URL(currentUrl);
  if (change.view !== undefined) {
    if (change.view === 'radar') url.searchParams.delete('v');
    else url.searchParams.set('v', change.view);
  }
  if (change.card !== undefined) {
    if (change.card === null) url.searchParams.delete('f');
    else url.searchParams.set('f', change.card);
  }
  return url.toString();
}
