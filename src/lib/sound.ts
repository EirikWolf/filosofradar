/**
 * KOSMISK LYDLANDSKAP (Web Audio API)
 *
 * 💡 Forklaring for nybegynnere:
 * I stedet for å laste ned tunge lydfiler over nettet, bruker vi en innebygd
 * «lydsynthesizer» i nettleseren! Vi lager ekte lydbølger (sinus- og sagtanntoner)
 * direkte med matematikk, akkurat som et elektronisk piano.
 *
 * Ingen eksterne filer, null forsinkelse, 100% lokalt og personvernvennlig.
 */

class CosmicSoundEngine {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = false;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  constructor() {
    // Sjekk om brukeren tidligere har skrudd på lyd
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('filosofradar_sound');
      this.isEnabled = saved === 'true';
    }
  }

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public get enabled(): boolean {
    return this.isEnabled;
  }

  public toggle(): boolean {
    this.isEnabled = !this.isEnabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('filosofradar_sound', String(this.isEnabled));
    }
    if (this.isEnabled) {
      this.initCtx();
      this.startAmbientDrone();
      this.playStarSelect();
    } else {
      this.stopAmbientDrone();
    }
    return this.isEnabled;
  }

  /**
   * Spiller en harmonisk akkord / krystallklokke når en stjerne fødes (Supernova i tidsmaskinen).
   */
  public playSupernovaBirth() {
    if (!this.isEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const freqs = [528, 660, 792, 1056]; // Harmonisk ren kvint/oktav
    const now = ctx.currentTime;

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), now + idx * 0.04 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 0.85);
    });
  }

  /**
   * Spiller et mykt, delikat harpe-pling når man klikker på eller velger en stjerne.
   */
  public playStarSelect() {
    if (!this.isEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, now); // A5
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.25); // Myk glidning ned

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  }

  /**
   * Spiller en diskret kosmisk puls når tiden tikker fremover i tidsmaskinen.
   */
  public playTimeTick() {
    if (!this.isEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(329.63, now); // E4

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  /**
   * Starter en dyp, rolig kosmisk bakgrunnsdur (55 Hz A1) som gir en ekte observatorium-stemning.
   */
  public startAmbientDrone() {
    if (!this.isEnabled) return;
    const ctx = this.initCtx();
    if (!ctx || this.droneOsc) return;

    const now = ctx.currentTime;
    this.droneOsc = ctx.createOscillator();
    this.droneGain = ctx.createGain();

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);

    this.droneOsc.type = 'sine';
    this.droneOsc.frequency.setValueAtTime(55, now); // A1

    this.droneGain.gain.setValueAtTime(0, now);
    this.droneGain.gain.linearRampToValueAtTime(0.04, now + 2.0); // Myk 2s fade-in

    this.droneOsc.connect(filter);
    filter.connect(this.droneGain);
    this.droneGain.connect(ctx.destination);

    this.droneOsc.start(now);
  }

  /**
   * Stopper bakgrunnsduren med myk fade-out.
   */
  public stopAmbientDrone() {
    if (this.droneOsc && this.droneGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.droneGain.gain.linearRampToValueAtTime(0, now + 0.8);
      setTimeout(() => {
        try {
          this.droneOsc?.stop();
          this.droneOsc?.disconnect();
          this.droneOsc = null;
          this.droneGain = null;
        } catch {
          // Ignorer dersom allerede stoppet
        }
      }, 850);
    }
  }
}

export const sound = new CosmicSoundEngine();
