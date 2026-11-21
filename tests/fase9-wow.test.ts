import { describe, it, expect } from 'vitest';
import { sound } from '../src/lib/sound';

// 3D-galaksens matte testes i tests/galaxy.test.ts, og «Dagens filosof» i tests/daily.test.ts.
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
});
