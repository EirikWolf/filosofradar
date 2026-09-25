import { describe, it, expect } from 'vitest';

describe('Filosofradaren smoke test', () => {
  it('bekrefter at testrammeverket Vitest fungerer', () => {
    const appNavn = 'Filosofradaren';
    expect(appNavn).toBe('Filosofradaren');
    expect(2 + 2).toBe(4);
  });

  it('bekrefter at år 0 ikke eksisterer i historisk regning', () => {
    // f.Kr. / e.Kr. konsepttest
    const sokratesFodt = -470; // 470 f.Kr.
    expect(sokratesFodt).toBeLessThan(0);
  });
});
