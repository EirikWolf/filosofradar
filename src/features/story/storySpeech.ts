/**
 * FORTELLERSTEMME FOR STORY-MODUS (Web Speech API)
 *
 * Bruker nettleserens innebygde talesyntese med norsk språkstøtte (nb-NO).
 * Gir naturlig opplesning av hvert kapittel i historiene uten forsinkelse
 * eller eksterne API-avhengigheter.
 */

// Sett for å hindre at Chrome/Edge sin garbage collector sletter pågående tale (kjent Chromium-bug)
const activeUtterances = new Set<SpeechSynthesisUtterance>();

class StorySpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isVoiceActive: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();

      // Lytt til voiceschanged (både onvoiceschanged og addEventListener for bredest nettleserstøtte)
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
      if (window.speechSynthesis && typeof window.speechSynthesis.addEventListener === 'function') {
        window.speechSynthesis.addEventListener('voiceschanged', () => this.initVoices());
      }

      // Sjekk om brukeren tidligere har slått på fortellerstemme
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

    // 1. Finn norske stemmer (nb-NO, no-NO, nn-NO, norsk, norwegian)
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

    // 2. Ranger de beste naturlige stemmene (Neural/Natural/Iselin/Jon/Nora/Google/Henrik)
    const preferred = norwegianVoices.find((v) => {
      const n = v.name.toLowerCase();
      return (
        n.includes('natural') ||
        n.includes('neural') ||
        n.includes('iselin') ||
        n.includes('jon') ||
        n.includes('nora') ||
        n.includes('google') ||
        n.includes('online')
      );
    });

    if (preferred) {
      this.selectedVoice = preferred;
    } else if (norwegianVoices.length > 0) {
      this.selectedVoice = norwegianVoices[0];
    } else {
      // 3. Fallback: Se etter skandinaviske stemmer eller standardstemme
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
        // Ignorer localStorage feil
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
   * Leser opp en tekst med norsk uttale og kaller onEnd når opplesningen er fullført.
   */
  public speak(text: string, onEnd?: () => void): void {
    if (!this.synth || !this.isVoiceActive) return;

    // Avbryt eventuell pågående tale
    this.stop();

    // Sørg for at stemmer er lastet
    if (!this.selectedVoice) {
      this.initVoices();
    }

    // Chromium fiks: hvis syntesen er satt på pause av nettleseren, må vi vekke den
    if (this.synth.paused) {
      try {
        this.synth.resume();
      } catch {
        // Ignorer
      }
    }

    const utterance = new SpeechSynthesisUtterance(text);

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
      utterance.lang = this.selectedVoice.lang || 'nb-NO';
    } else {
      utterance.lang = 'nb-NO';
    }

    // Rolig, behagelig fortellertempo med god diksjon
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Chromium fiks: hold referanse i settet så den ikke GC-slettes midt i setningen
    activeUtterances.add(utterance);

    utterance.onend = () => {
      activeUtterances.delete(utterance);
      if (this.currentUtterance === utterance) {
        this.currentUtterance = null;
      }
      if (onEnd) {
        onEnd();
      }
    };

    utterance.onerror = (e) => {
      activeUtterances.delete(utterance);
      if (this.currentUtterance === utterance) {
        this.currentUtterance = null;
      }
      // 'canceled' og 'interrupted' er normalt når brukeren skifter slide eller stopper
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('SpeechSynthesis advarsel:', e.error);
      }
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
    }
    activeUtterances.clear();
    this.currentUtterance = null;
  }
}

export const storySpeech = new StorySpeechEngine();
