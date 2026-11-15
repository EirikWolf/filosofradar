/**
 * FORTELLERSTEMME FOR STORY-MODUS (Web Speech API)
 *
 * Bruker nettleserens innebygde talesyntese med norsk språkstøtte (nb-NO).
 * Gir naturlig opplesning av hvert kapittel i historiene uten forsinkelse
 * eller eksterne API-avhengigheter.
 */

class StorySpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isVoiceActive: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }

      // Sjekk om brukeren tidligere har slått på fortellerstemme
      const saved = localStorage.getItem('filosofradar_story_voice');
      this.isVoiceActive = saved === 'true';
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    // Finn norske stemmer (Bokmål, Nynorsk, Norsk)
    const norwegianVoices = voices.filter((v) => {
      const l = v.lang.toLowerCase();
      return l.startsWith('nb') || l.startsWith('no') || l.startsWith('nn');
    });

    // Ranger de beste stemmene (Neural/Natural/Iselin/Jon/Nora/Google)
    const preferred = norwegianVoices.find((v) => {
      const n = v.name.toLowerCase();
      return (
        n.includes('natural') ||
        n.includes('neural') ||
        n.includes('iselin') ||
        n.includes('jon') ||
        n.includes('nora') ||
        n.includes('google')
      );
    });

    this.selectedVoice = preferred || norwegianVoices[0] || null;
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
      localStorage.setItem('filosofradar_story_voice', String(this.isVoiceActive));
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
   * Leser opp en tekst med norsk uttale og kaller onEnd når opplesningen er fullført.
   */
  public speak(text: string, onEnd?: () => void): void {
    if (!this.synth || !this.isVoiceActive) return;

    // Avbryt eventuell pågående tale
    this.stop();

    if (!this.selectedVoice) {
      this.initVoices();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
      utterance.lang = this.selectedVoice.lang;
    } else {
      utterance.lang = 'nb-NO';
    }

    // Litt rolig, tydelig fortellertempo med god diksjon
    utterance.rate = 0.98;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) {
        onEnd();
      }
    };

    utterance.onerror = (e) => {
      // Hvis avbrutt med cancel(), er error vanligere 'canceled' - ikke feil
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('SpeechSynthesis advarsel:', e.error);
      }
      this.currentUtterance = null;
    };

    this.currentUtterance = utterance;

    try {
      this.synth.speak(utterance);
    } catch (err) {
      console.warn('Kunne ikke starte talesyntese:', err);
    }
  }

  /**
   * Pauser opplesningen (f.eks. når brukeren holder fingeren på skjermen)
   */
  public pause(): void {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      try {
        this.synth.pause();
      } catch {
        // Ignorer
      }
    }
  }

  /**
   * Gjenopptar opplesningen
   */
  public resume(): void {
    if (this.synth && this.synth.paused) {
      try {
        this.synth.resume();
      } catch {
        // Ignorer
      }
    }
  }

  /**
   * Stopper all opplesning umiddelbart
   */
  public stop(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // Ignorer
      }
      this.currentUtterance = null;
    }
  }
}

export const storySpeech = new StorySpeechEngine();
