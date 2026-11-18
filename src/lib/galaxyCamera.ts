/** Kameraet i 3D-galaksen: nåværende orientering og målet det glir mot. */
export interface GalaxyCamera {
  /** Rotasjon rundt Y-aksen (vannrett), radianer. */
  yaw: number;
  /** Rotasjon rundt X-aksen (vipping / fugleperspektiv), radianer. */
  pitch: number;
  /** Avstand fra galaksesenteret. */
  distance: number;
  targetYaw: number;
  targetPitch: number;
  targetDistance: number;
}

/** Sakte kosmisk galakserotasjon, radianer per bilde. */
export const AUTO_ROTATE_STEP = 0.0022;
/** Andel av avstanden til målet kameraet flytter seg per bilde (myk glidning). */
const SMOOTHING = 0.1;
/** Grense for vipping, så galaksen ikke snus opp ned. */
const PITCH_LIMIT = 1.3;
/**
 * Avstand til målet der kameraet regnes som framme og settes rett på målet.
 * 0,0001 rad i vinkel og 0,01 i avstand er under en tiendedels piksel på skjermen.
 */
const SETTLED_ANGLE = 1e-4;
const SETTLED_DISTANCE = 1e-2;

const clampPitch = (pitch: number) => Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, pitch));

/**
 * Flytter kameraet ett bilde mot målet og svarer om det trengs flere bilder.
 *
 * Galaksen tegnet tidligere 60 bilder i sekundet så lenge visningen var åpen, også
 * når ingenting beveget seg (YTE-07). Når kameraet er framme og autorotasjonen er av,
 * settes det nøyaktig på målet og funksjonen svarer `false`, så tegneløkka kan stoppe.
 */
export function stepGalaxyCamera(cam: GalaxyCamera, autoRotate: boolean): boolean {
  if (autoRotate) {
    cam.targetYaw += AUTO_ROTATE_STEP;
  }
  cam.targetPitch = clampPitch(cam.targetPitch);

  cam.yaw += (cam.targetYaw - cam.yaw) * SMOOTHING;
  cam.pitch = clampPitch(cam.pitch + (cam.targetPitch - cam.pitch) * SMOOTHING);
  cam.distance += (cam.targetDistance - cam.distance) * SMOOTHING;

  const settled =
    Math.abs(cam.targetYaw - cam.yaw) < SETTLED_ANGLE &&
    Math.abs(cam.targetPitch - cam.pitch) < SETTLED_ANGLE &&
    Math.abs(cam.targetDistance - cam.distance) < SETTLED_DISTANCE;

  if (settled && !autoRotate) {
    cam.yaw = cam.targetYaw;
    cam.pitch = cam.targetPitch;
    cam.distance = cam.targetDistance;
    return false;
  }
  return true;
}
