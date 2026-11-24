import fs from 'node:fs';
import path from 'node:path';
import { describe, it, expect, vi } from 'vitest';
import { loadOrReload, RELOAD_GUARD_KEY, RELOAD_GUARD_MS, type ReloadEnv } from '../src/lib/chunkReload';

// US-006: en visning som ikke kan lastes (gammel fil etter en ny publisering), skal gi
// én ny innlasting av siden, ikke reservesiden. Vakten hindrer en evig løkke.

function env(overrides: Partial<ReloadEnv> = {}): ReloadEnv & { stored: Map<string, string> } {
  const stored = new Map<string, string>();
  return {
    stored,
    getItem: (key) => stored.get(key) ?? null,
    setItem: (key, value) => {
      stored.set(key, value);
    },
    reload: vi.fn(),
    now: () => 1_000_000,
    isOnline: () => true,
    ...overrides,
  };
}

const failing = () => Promise.reject(new TypeError('Failed to fetch dynamically imported module'));

/** Et løfte som aldri avgjøres, avgjøres ikke innen neste runde i hendelsesløkken. */
async function settlesSoon(promise: Promise<unknown>): Promise<boolean> {
  let settled = false;
  promise.then(
    () => (settled = true),
    () => (settled = true),
  );
  await new Promise((resolve) => setTimeout(resolve, 0));
  return settled;
}

describe('loadOrReload', () => {
  it('gir modulen videre når den lastes', async () => {
    const e = env();
    await expect(loadOrReload(() => Promise.resolve('modul'), e)).resolves.toBe('modul');
    expect(e.reload).not.toHaveBeenCalled();
    expect(e.stored.size).toBe(0);
  });

  it('laster siden på nytt én gang når modulen ikke kan hentes', async () => {
    const e = env();
    const result = loadOrReload(failing, e);
    // Løftet blir stående, så Suspense viser ventetilstanden til siden er lastet på nytt.
    expect(await settlesSoon(result)).toBe(false);
    expect(e.reload).toHaveBeenCalledTimes(1);
    expect(e.stored.get(RELOAD_GUARD_KEY)).toBe('1000000');
  });

  it('viser feilen i stedet for å laste på nytt igjen like etter en ny innlasting', async () => {
    const e = env({ now: () => 1_000_000 + RELOAD_GUARD_MS - 1 });
    e.stored.set(RELOAD_GUARD_KEY, '1000000');
    await expect(loadOrReload(failing, e)).rejects.toThrow('Failed to fetch dynamically imported module');
    expect(e.reload).not.toHaveBeenCalled();
  });

  it('laster på nytt igjen når forrige innlasting er lenge siden', async () => {
    const e = env({ now: () => 1_000_000 + RELOAD_GUARD_MS });
    e.stored.set(RELOAD_GUARD_KEY, '1000000');
    expect(await settlesSoon(loadOrReload(failing, e))).toBe(false);
    expect(e.reload).toHaveBeenCalledTimes(1);
  });

  it('laster ikke på nytt uten nett, for da ville eleven fått nettleserens feilside', async () => {
    const e = env({ isOnline: () => false });
    await expect(loadOrReload(failing, e)).rejects.toThrow();
    expect(e.reload).not.toHaveBeenCalled();
  });

  it('laster ikke på nytt når vakten ikke kan lagres, for da kunne den gått i løkke', async () => {
    const e = env({
      setItem: () => {
        throw new Error('SecurityError');
      },
    });
    await expect(loadOrReload(failing, e)).rejects.toThrow('Failed to fetch dynamically imported module');
    expect(e.reload).not.toHaveBeenCalled();
  });
});

describe('Visninger i egne filer', () => {
  // En ny visning med React.lazy direkte ville fått reservesiden etter neste publisering.
  it('lastes med lazyView, ikke React.lazy', () => {
    const srcDir = path.resolve(__dirname, '../src');
    const files = fs
      .readdirSync(srcDir, { recursive: true, encoding: 'utf8' })
      .filter((f) => /\.tsx?$/.test(f) && !f.startsWith('generated'));
    expect(files.length).toBeGreaterThan(50);
    const offenders = files.filter((f) => {
      if (f.replace(/\\/g, '/') === 'components/lazyView.ts') return false;
      return /\b(React\.)?lazy\(/.test(fs.readFileSync(path.join(srcDir, f), 'utf8'));
    });
    expect(offenders).toEqual([]);
  });
});
