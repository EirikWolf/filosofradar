import { describe, it, expect } from 'vitest';
import { sound } from '../src/lib/sound';
import philosophersData from '../src/generated/philosophers.json';
import type { Philosopher } from '../src/schemas/philosopher';
import { TRADITION_SECTOR_ORDER, getSectorAngles } from '../src/lib/polar';
import { getTraditionMeta } from '../src/lib/traditions';

const philosophers = philosophersData as Philosopher[];

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

  describe('3D Galaksematematikk', () => {
    it('beregner gyldige, endelige 3D-koordinater for samtlige 80 filosofer', () => {
      const sectorAnglesMap = new Map();
      TRADITION_SECTOR_ORDER.forEach((tid) => {
        const angles = getSectorAngles(tid);
        sectorAnglesMap.set(tid, { midAngle: angles.midAngle });
      });

      const stars3D = philosophers.map((p) => {
        const meta = getTraditionMeta(p.tradition);
        const angles = sectorAnglesMap.get(p.tradition) || { midAngle: 0 };
        const birth = p.born?.year ?? p.floruit?.from ?? -400;
        const normalizedYear = Math.max(0, Math.min(1, (birth - -800) / (2025 - -800)));
        const radius = 80 + Math.pow(normalizedYear, 0.85) * 260;
        const spiralTwist = normalizedYear * 1.8;
        const baseAngleRad = (angles.midAngle * Math.PI) / 180;
        const theta = baseAngleRad + spiralTwist;

        const x = Math.cos(theta) * radius;
        const z = Math.sin(theta) * radius;
        const seed = Math.sin(birth * 13.37);
        const y = seed * 38;

        return { id: p.id, x, y, z, color: meta.color };
      });

      expect(stars3D.length).toBe(80);
      stars3D.forEach((s) => {
        expect(Number.isFinite(s.x)).toBe(true);
        expect(Number.isFinite(s.y)).toBe(true);
        expect(Number.isFinite(s.z)).toBe(true);
        const distFromCenter = Math.hypot(s.x, s.z);
        expect(distFromCenter).toBeGreaterThanOrEqual(75);
        expect(distFromCenter).toBeLessThanOrEqual(350);
      });
    });
  });
});
