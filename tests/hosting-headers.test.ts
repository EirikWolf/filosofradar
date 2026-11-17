import { describe, it, expect } from 'vitest';
import firebaseConfig from '../firebase.json';

// YTE-03 (revisjon 2026-11-17): illustrasjonene ble servert med no-store, så hvert
// nytt besøk lastet dem ned på nytt. Testen regner ut hvilken Cache-Control en sti
// får, slik Firebase gjør det: alle regler som treffer gjelder, og for samme header
// vinner den siste.

type HeaderRule = { source: string; headers: { key: string; value: string }[] };
const rules = firebaseConfig.hosting.headers as HeaderRule[];

const escapeRe = (s: string) => s.replace(/[.+^${}()|[\]\\]/g, '\\$&');

/** Firebase-glob («**», «*», «@(a|b)») til regex. */
function globToRegExp(glob: string): RegExp {
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*' && glob[i + 1] === '*') {
      re += '.*';
      i++;
      if (glob[i + 1] === '/') i++;
    } else if (c === '*') {
      re += '[^/]*';
    } else if (c === '@' && glob[i + 1] === '(') {
      const end = glob.indexOf(')', i);
      re += `(?:${glob.slice(i + 2, end).split('|').map(escapeRe).join('|')})`;
      i = end;
    } else {
      re += escapeRe(c);
    }
  }
  return new RegExp(`^${re}$`);
}

function cacheControlFor(path: string): string | undefined {
  const p = path.replace(/^\//, '');
  let value: string | undefined;
  for (const rule of rules) {
    if (globToRegExp(rule.source).test(p)) {
      const h = rule.headers.find((x) => x.key.toLowerCase() === 'cache-control');
      if (h) value = h.value;
    }
  }
  return value;
}

describe('Cache-Control i firebase.json (YTE-03)', () => {
  it('HTML caches ikke, så en ny versjon slår gjennom med en gang', () => {
    expect(cacheControlFor('/index.html')).toMatch(/no-cache/);
  });

  it('hashede filer i assets/ caches i et år', () => {
    expect(cacheControlFor('/assets/index-v2-AbC123.js')).toMatch(/immutable/);
    expect(cacheControlFor('/assets/index-v2-AbC123.css')).toMatch(/immutable/);
  });

  it.each(['/images/hooks/sokrates-geometrien.webp', '/favicon.svg', '/og-preview.png', '/og-preview.jpg'])(
    '%s kan caches i nettleseren (ikke no-store)',
    (path) => {
      const value = cacheControlFor(path);
      expect(value).not.toMatch(/no-store/);
      expect(value).toMatch(/max-age=604800/);
    },
  );
});
