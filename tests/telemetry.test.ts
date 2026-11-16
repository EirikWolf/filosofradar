import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { trackPageView, trackEvent } from '../src/lib/telemetry';

describe('GoatCounter telemetri', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    (globalThis as unknown as { window: unknown }).window = {
      location: {
        pathname: '/',
        search: '',
      },
    };
    (globalThis as unknown as { document: unknown }).document = {
      title: 'Filosofradaren',
    };
  });

  afterEach(() => {
    delete (globalThis as unknown as { window?: unknown }).window;
    delete (globalThis as unknown as { document?: unknown }).document;
  });

  it('kaller goatcounter.count med oppgitt path og tittel ved trackPageView', () => {
    const mockCount = vi.fn();
    (window as unknown as { goatcounter: unknown }).goatcounter = { count: mockCount };

    trackPageView('/?v=quiz', 'Quiz – Filosofradaren');

    expect(mockCount).toHaveBeenCalledWith({
      path: '/?v=quiz',
      title: 'Quiz – Filosofradaren',
      event: false,
    });
  });

  it('bruker window.location og document.title som fallback hvis ingen parametre sendes', () => {
    const mockCount = vi.fn();
    (window as unknown as { goatcounter: unknown }).goatcounter = { count: mockCount };

    trackPageView();

    expect(mockCount).toHaveBeenCalledWith(
      expect.objectContaining({
        path: '/',
        event: false,
      }),
    );
  });

  it('håndterer trygt at window.goatcounter mangler uten å kaste feil', () => {
    (window as unknown as { goatcounter: unknown }).goatcounter = undefined;

    expect(() => trackPageView('/?v=exphil')).not.toThrow();
    expect(() => trackEvent('quiz-fullfort')).not.toThrow();
  });

  it('håndterer trygt at window overhodet ikke finnes (f.eks. Node/SSR)', () => {
    delete (globalThis as unknown as { window?: unknown }).window;

    expect(() => trackPageView('/?v=exphil')).not.toThrow();
    expect(() => trackEvent('quiz-fullfort')).not.toThrow();
  });

  it('registrerer hendelse (event: true) med trackEvent', () => {
    const mockCount = vi.fn();
    (window as unknown as { goatcounter: unknown }).goatcounter = { count: mockCount };

    trackEvent('quiz-fullfort', 'Filosofi-quiz fullført');

    expect(mockCount).toHaveBeenCalledWith({
      path: 'quiz-fullfort',
      title: 'Filosofi-quiz fullført',
      event: true,
    });
  });
});
