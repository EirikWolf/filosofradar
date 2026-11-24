/**
 * Henter en visning som ligger i en egen fil, og laster siden på nytt én gang hvis
 * filen ikke kan hentes (US-006).
 *
 * Bakgrunn: en ny publisering erstatter alle filene. En fane som var åpen fra før, ber
 * da om et filnavn som ikke finnes lenger. Firebase Hosting svarte med index.html, og
 * hele appen ble byttet ut med reservesiden. En ny innlasting henter den nye
 * index.html med de nye filnavnene. Adressen bærer visningen og filosofkortet
 * (`?v=`, `?f=`), så eleven kommer tilbake til samme sted.
 */

export const RELOAD_GUARD_KEY = 'filosofradar:chunk-reload-at';
/** Feiler hentingen igjen innen dette vinduet etter en ny innlasting, vises feilen. */
export const RELOAD_GUARD_MS = 10_000;

export interface ReloadEnv {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  reload: () => void;
  now: () => number;
  isOnline: () => boolean;
}

const browserEnv = (): ReloadEnv => ({
  getItem: (key) => window.sessionStorage.getItem(key),
  setItem: (key, value) => window.sessionStorage.setItem(key, value),
  reload: () => window.location.reload(),
  now: () => Date.now(),
  isOnline: () => navigator.onLine,
});

/** Skriver vakten. Gir false når det ikke går, og da skal siden ikke lastes på nytt. */
function armGuard(env: ReloadEnv): boolean {
  try {
    const last = Number(env.getItem(RELOAD_GUARD_KEY));
    if (Number.isFinite(last) && last > 0 && env.now() - last < RELOAD_GUARD_MS) return false;
    env.setItem(RELOAD_GUARD_KEY, String(env.now()));
    return true;
  } catch {
    // Uten lagring kan vi ikke vite om vi nettopp lastet på nytt. Feilen vises heller
    // enn å risikere en evig løkke.
    return false;
  }
}

export function loadOrReload<T>(loader: () => Promise<T>, env: ReloadEnv = browserEnv()): Promise<T> {
  return loader().catch((error: unknown) => {
    // Uten nett ville en ny innlasting gitt nettleserens egen feilside.
    if (!env.isOnline() || !armGuard(env)) throw error;
    env.reload();
    // Står ubesvart, så Suspense viser ventetilstanden til siden er lastet på nytt.
    return new Promise<T>(() => {});
  });
}
