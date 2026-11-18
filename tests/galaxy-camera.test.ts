import { describe, it, expect } from 'vitest';
import { stepGalaxyCamera, type GalaxyCamera } from '../src/lib/galaxyCamera';

// YTE-07: 3D-galaksen skal bare tegne nye bilder mens kameraet beveger seg.
// stepGalaxyCamera flytter kameraet ett bilde og sier om det trengs flere.

function camera(overrides: Partial<GalaxyCamera> = {}): GalaxyCamera {
  return {
    yaw: 0.45,
    pitch: 0.55,
    distance: 680,
    targetYaw: 0.45,
    targetPitch: 0.55,
    targetDistance: 680,
    ...overrides,
  };
}

// Kjører kameraet til det står stille, med en grense så en feil gir rødt i stedet for å henge.
function runUntilSettled(cam: GalaxyCamera): number {
  let frames = 0;
  while (stepGalaxyCamera(cam, false)) {
    frames++;
    if (frames > 1000) throw new Error('kameraet stoppet aldri');
  }
  return frames;
}

describe('stepGalaxyCamera', () => {
  it('trenger ikke flere bilder når kameraet står på målet og ikke roterer', () => {
    const cam = camera();
    expect(stepGalaxyCamera(cam, false)).toBe(false);
  });

  it('trenger flere bilder så lenge autorotasjonen er på', () => {
    const cam = camera();
    expect(stepGalaxyCamera(cam, true)).toBe(true);
    expect(cam.targetYaw).toBeGreaterThan(0.45);
  });

  it('glir mot målet og stopper til slutt når rotasjonen er av', () => {
    const cam = camera({ targetYaw: 1.45, targetDistance: 900 });
    const frames = runUntilSettled(cam);
    // Glir over flere bilder, ikke et hopp
    expect(frames).toBeGreaterThan(10);
    // Står nøyaktig på målet etterpå, så siste bilde er riktig
    expect(cam.yaw).toBe(1.45);
    expect(cam.distance).toBe(900);
    expect(stepGalaxyCamera(cam, false)).toBe(false);
  });

  it('holder vippingen innenfor grensene så galaksen ikke snus opp ned', () => {
    const cam = camera({ targetPitch: 5 });
    runUntilSettled(cam);
    expect(cam.pitch).toBeLessThanOrEqual(1.3);
    expect(cam.targetPitch).toBeLessThanOrEqual(1.3);
  });
});
