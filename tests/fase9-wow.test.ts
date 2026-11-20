import { describe, it, expect } from 'vitest';
import { sound } from '../src/lib/sound';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';

const philosophers = philosophersData as Philosopher[];

// 3D-galaksens matte testes i tests/galaxy.test.ts.
describe('Fase 9: Kosmiske elementer & Ekstra Wow', () => {
  describe('Web Audio Synth (sound.ts)', () => {
    it('kan toggle lyd av og på trygt uten nettleserfeil', () => {
      const initial = sound.enabled;
      const toggled = sound.toggle();
      expect(toggled).toBe(!initial);
      // Toggle tilbake
      const reverted = sound.toggle();
      expect(reverted).toBe(initial);
    });

    it('tåler at lydeffekter kalles i node/test-miljø uten å kaste unhandled exceptions', () => {
      expect(() => {
        sound.playSupernovaBirth();
        sound.playStarSelect();
        sound.playTimeTick();
        sound.startAmbientDrone();
        sound.stopAmbientDrone();
      }).not.toThrow();
    });
  });

  // Regner med en kopi av formelen i DailyPhilosopher, ikke med komponenten.
  // TST-09 flytter logikken til src/lib og erstatter denne testen.
  describe('Dagens filosof beregning', () => {
    it('velger en gyldig filosof deterministisk basert på dag', () => {
      expect(philosophers.length).toBe(80);
      const dayOfYear = 42;
      const chosen = philosophers[dayOfYear % philosophers.length];
      expect(chosen).toBeDefined();
      expect(chosen.name).toBeTruthy();
      expect(chosen.tradition).toBeTruthy();
    });
  });
});
