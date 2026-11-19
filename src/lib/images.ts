/**
 * Bredden på illustrasjonsvarianten som brukes i kort og galleri (YTE-05).
 *
 * Illustrasjonene er 1024–1280 px brede, men vises høyst ca. 460 CSS-px brede.
 * Målt behov er høyst 918 bildepunkter (nettbrett, DPR 2) og ca. 850 på mobil
 * med DPR 3, så 960 px dekker alle skjermer 1:1 og er 61 % mindre enn originalene.
 * Fullskjermvisninger (historiene, etikklaben) bruker fortsatt originalen.
 */
export const CARD_IMAGE_WIDTH = 960;

const HOOK_IMAGE = /^(\/images\/hooks\/.+)\.webp$/;

/** Gir 960 px-varianten av en illustrasjon. Andre bilder returneres uendret. */
export function cardImage(src: string): string {
  const match = HOOK_IMAGE.exec(src);
  return match ? `${match[1]}-${CARD_IMAGE_WIDTH}w.webp` : src;
}
