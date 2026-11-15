/**
 * FORTELLERSTEMME FOR STORY-MODUS (Web Speech API)
 *
 * Bruker nettleserens innebygde talesyntese med norsk språkstøtte (nb-NO).
 * Sikret mot kjente Chromium/Safari/Windows bugs:
 * 1. Garbage collection av utterance midt i setningen
 * 2. Asynkron cancel() krasj ved slide-overganger
 * 3. Chrome pause-frys etter 15 sekunder
 * 4. Asynkron innlasting av stemmelister (voiceschanged)
 */

const activeUtterances = new Set<SpeechSynthesisUtterance>();

class StorySpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isVoiceActive: boolean = false;
  private keepAliveTimer: number | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();

      // Lytt til voiceschanged for å fange opp stemmer som lastes asynkront
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
      if (typeof window.speechSynthesis.addEventListener === 'function') {
        window.speechSynthesis.addEventListener('voiceschanged', () => this.initVoices());
      }

      // Hent lagret innstilling
      try {
        const saved = localStorage.getItem('filosofradar_story_voice');
        this.isVoiceActive = saved === 'true';
      } catch {
        this.isVoiceActive = false;
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    // 1. Finn norske stemmer (nb, no, nn, norsk, norwegian, bokmål)
    const norwegianVoices = voices.filter((v) => {
      const l = (v.lang || '').toLowerCase().replace(/_/g, '-');
      const n = (v.name || '').toLowerCase();
      return (
        l.startsWith('nb') ||
        l.startsWith('no') ||
        l.startsWith('nn') ||
        n.includes('norsk') ||
        n.includes('norwegian') ||
        n.includes('bokmål')
      );
    });

    // 2. Foretrekk naturlige/OneCore stemmer (f.eks. Jon, Iselin, Nora, Neural, Natural)
    const preferred = norwegianVoices.find((v) => {
      const n = v.name.toLowerCase();
      return (
        n.includes('jon') ||
        n.includes('iselin') ||
        n.includes('natural') ||
        n.includes('neural') ||
        n.includes('nora') ||
        n.includes('google')
      );
    });

    if (preferred) {
      this.selectedVoice = preferred;
    } else if (norwegianVoices.length > 0) {
      this.selectedVoice = norwegianVoices[0];
    } else {
      // 3. Fallback: skandinavisk eller standardstemme
      const scandi = voices.find((v) => {
        const l = (v.lang || '').toLowerCase();
        return l.startsWith('da') || l.startsWith('sv');
      });
      this.selectedVoice = scandi || voices.find((v) => v.default) || voices[0] || null;
    }
  }

  public get isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public get enabled(): boolean {
    return this.isVoiceActive;
  }

  public toggle(): boolean {
    this.isVoiceActive = !this.isVoiceActive;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('filosofradar_story_voice', String(this.isVoiceActive));
      } catch {
        // Ignorer
      }
    }
    if (!this.isVoiceActive) {
      this.stop();
    }
    return this.isVoiceActive;
  }

  public get currentVoiceName(): string {
    return this.selectedVoice?.name || 'Standard norsk stemme';
  }

  public get isSpeaking(): boolean {
    return this.currentUtterance !== null;
  }

  /**
   * Leser opp teksten for gjeldende slide.
   */
  public speak(text: string, onEnd?: () => void, onStart?: () => void): void {
    if (!this.synth || !this.isVoiceActive) return;

    // Hvis forrige ytring fortsatt spiller (f.eks. brukeren klikket manuelt til neste slide),
    // må vi avbryte. Hvis den derimot er ferdig på naturlig vis, trenger vi ikke cancel()!
    const isCurrentlySpeaking = this.synth.speaking || this.synth.pending;
    if (isCurrentlySpeaking) {
      try {
        this.synth.cancel();
      } catch {
        // Ignorer
      }
    }

    // Chromium-fiks: Hvis vi måtte avbryte, må vi gi nettleserens lyd-IPC 60ms til å tømme køen,
    // ellers sletter det asynkrone cancel-signalet den nye talen vi akkurat la til!
    const startDelay = isCurrentlySpeaking ? 70 : 10;

    setTimeout(() => {
      if (!this.synth || !this.isVoiceActive) return;

      if (!this.selectedVoice) {
        this.initVoices();
      }

      // Chrome vekking
      try {
        if (this.synth.paused) {
          this.synth.resume();
        }
      } catch {
        // Ignorer
      }

      const utterance = new SpeechSynthesisUtterance(text);

      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
        utterance.lang = this.selectedVoice.lang || 'nb-NO';
      } else {
        utterance.lang = 'nb-NO';
      }

      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      activeUtterances.add(utterance);
      this.currentUtterance = utterance;

      let hasFired = false;
      const complete = () => {
        if (hasFired) return;
        hasFired = true;
        this.stopKeepAlive();
        activeUtterances.delete(utterance);
        if (this.currentUtterance === utterance) {
          this.currentUtterance = null;
        }
        if (onEnd) {
          onEnd();
        }
      };

      utterance.onstart = () => {
        if (onStart) {
          onStart();
        }
      };

      utterance.onend = () => {
        complete();
      };

      utterance.onerror = (e) => {
        this.stopKeepAlive();
        activeUtterances.delete(utterance);
        if (this.currentUtterance === utterance) {
          this.currentUtterance = null;
        }
        // Hvis avbrutt av brukeren, ikke kall onEnd
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          console.warn('SpeechSynthesis error:', e.error);
          complete(); // Sikre fremdrift selv ved uventet feil
        }
      };

      try {
        this.synth.speak(utterance);
        this.startKeepAlive();
      } catch (err) {
        console.warn('Kunne ikke starte tale:', err);
        complete();
      }
    }, startDelay);
  }

  /**
   * Chrome keep-alive: forhindrer at Chromium pauser lange ytringer etter 15 sekunder
   */
  private startKeepAlive() {
    this.stopKeepAlive();
    if (typeof window === 'undefined') return;
    this.keepAliveTimer = window.setInterval(() => {
      if (this.synth && this.synth.speaking && !this.synth.paused) {
        try {
          this.synth.pause();
          this.synth.resume();
        } catch {
          // Ignorer
        }
      }
    }, 12000);
  }

  private stopKeepAlive() {
    if (this.keepAliveTimer !== null) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  public pause(): void {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      try {
        this.synth.pause();
      } catch {
        // Ignorer
      }
    }
  }

  public resume(): void {
    if (this.synth && this.synth.paused) {
      try {
        this.synth.resume();
      } catch {
        // Ignorer
      }
    }
  }

  public stop(): void {
    this.stopKeepAlive();
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // Ignorer
      }
    }
    activeUtterances.clear();
    this.currentUtterance = null;
  }
}

export const storySpeech = new StorySpeechEngine();
