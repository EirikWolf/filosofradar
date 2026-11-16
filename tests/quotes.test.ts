import { describe, it, expect } from 'vitest';
import { extractQuotedPhrases } from '../src/lib/quotes';

describe('extractQuotedPhrases', () => {
  it('finner tekst i «…» med minst tre ord og oppgir hvor den står', () => {
    const data = { sokrates: { text: 'Han sa: «ingen gjør galt med vilje», og gikk.' } };
    expect(extractQuotedPhrases(data, 'deepdive')).toEqual([
      { text: 'ingen gjør galt med vilje', path: 'deepdive.sokrates.text' },
    ]);
  });

  it('hopper over begreper på ett eller to ord', () => {
    const data = ['Begrepet «akrasia» og «ond tro» er ikke sitater.'];
    expect(extractQuotedPhrases(data, 'x')).toEqual([]);
  });

  it('finner flere sitater i samme tekst og går gjennom lister', () => {
    const data = { items: ['«Jeg tenker, altså er jeg» og «Gud er død»'] };
    expect(extractQuotedPhrases(data, 'x').map((q) => q.path)).toEqual(['x.items[0]', 'x.items[0]']);
    expect(extractQuotedPhrases(data, 'x').map((q) => q.text)).toEqual(['Jeg tenker, altså er jeg', 'Gud er død']);
  });

  it('normaliserer mellomrom slik at linjeskift ikke gir et nytt sitat', () => {
    const data = { t: '«Mennesket er\n  født fritt»' };
    expect(extractQuotedPhrases(data, 'x')[0].text).toBe('Mennesket er født fritt');
  });
});
