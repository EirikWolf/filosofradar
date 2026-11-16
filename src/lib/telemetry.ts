/**
 * Personvernvennlig telemetri via GoatCounter (https://filosofradar.goatcounter.com)
 *
 * Egenskaper:
 * - 100% åpen og personvernvennlig: Ingen informasjonskapsler (cookies), ingen kryss-sporing.
 * - Ingen cookie-samtykkebanner kreves (GDPR/ePrivacy-kompatibel ut av esken).
 * - Sporer kun aggregerte besøkstall og henvisninger/geografi.
 * - Ignorerer automatisk localhost og utviklermiljøer.
 */

declare global {
  interface Window {
    goatcounter?: {
      count?: (vars?: {
        path?: string;
        title?: string;
        referrer?: string;
        event?: boolean;
      }) => void;
    };
  }
}

/**
 * Registrerer en sidevisning i GoatCounter dersom skriptet er lastet.
 * Kalles ved initialisering og navigasjon i SPA.
 */
export function trackPageView(path?: string, title?: string): void {
  if (typeof window === 'undefined') return;

  const resolvedPath = path ?? (window.location.pathname + window.location.search);
  const resolvedTitle =
    title ?? (typeof document !== 'undefined' ? document.title : undefined);

  try {
    if (window.goatcounter && typeof window.goatcounter.count === 'function') {
      window.goatcounter.count({
        path: resolvedPath,
        title: resolvedTitle,
        event: false,
      });
    }
  } catch (err) {
    // Stille feilhåndtering – telemetri skal aldri krasje appen
    console.debug('[GoatCounter] Kunne ikke sende sidevisning:', err);
  }
}

/**
 * Registrerer en spesiell interaksjonshendelse (f.eks. quiz fullført, tidsmaskin brukt).
 */
export function trackEvent(name: string, title?: string): void {
  if (typeof window === 'undefined') return;

  try {
    if (window.goatcounter && typeof window.goatcounter.count === 'function') {
      window.goatcounter.count({
        path: name,
        title: title ?? name,
        event: true,
      });
    }
  } catch (err) {
    console.debug('[GoatCounter] Kunne ikke sende hendelse:', err);
  }
}
