/**
 * Innholdet i filosofkortet (dypdykk og Ex.phil-boksen) ligger i egne biter som
 * lastes sent. Kortet og forhåndslastingen bruker de samme lasterne, så en bit
 * hentes bare én gang.
 */
export const loadDeepDiveSection = () => import('../deepdive/DeepDiveSection');
export const loadExphilCardExamBox = () => import('../exphil/ExphilCardExamBox');

/** Start hentingen før kortet åpnes. Trygt å kalle mange ganger. */
let preloadStarted = false;

export function preloadCardContent(): void {
  if (preloadStarted) return;
  preloadStarted = true;
  // Feil ignoreres her; kortet prøver igjen og viser feilen selv når det åpnes.
  loadDeepDiveSection().catch(() => {
    preloadStarted = false;
  });
  loadExphilCardExamBox().catch(() => {
    preloadStarted = false;
  });
}
