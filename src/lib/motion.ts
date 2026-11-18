/**
 * Om brukeren har bedt om redusert bevegelse i systeminnstillingene.
 * CSS-overstyringen i index.css stopper CSS-animasjoner, men ikke animasjoner som
 * tegnes med JavaScript (canvas), så de må spørre selv.
 */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;
}
