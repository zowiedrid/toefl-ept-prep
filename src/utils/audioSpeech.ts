// Web Speech API Voice Synthesizer for TOEFL Listening

export interface AudioPlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  isSupported: boolean;
  speed: number;
}

class SpeechAudioService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private preferredVoice: SpeechSynthesisVoice | null = null;
  private listeners: Set<(state: AudioPlayerState) => void> = new Set();
  private state: AudioPlayerState = {
    isPlaying: false,
    isPaused: false,
    isSupported: false,
    speed: 1.0,
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.state.isSupported = true;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prefer natural English voices (Google, Samantha, Daniel, US English)
    const naturalVoice = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (naturalVoice) {
      this.preferredVoice = naturalVoice;
    }
  }

  public subscribe(listener: (state: AudioPlayerState) => void) {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn({ ...this.state }));
  }

  public setSpeed(speed: number) {
    this.state.speed = speed;
    this.notify();
    if (this.state.isPlaying && this.currentUtterance) {
      // Re-trigger with new speed
      const text = this.currentUtterance.text;
      this.stop();
      this.play(text);
    }
  }

  public play(text: string) {
    if (!this.synth) return;

    this.stop();

    // Clean up text format (e.g. "Man:", "Woman:") for natural speech pauses
    const cleanSpeech = text
      .replace(/Man:/gi, "Man: ")
      .replace(/Woman:/gi, "Woman: ")
      .replace(/Narrator:/gi, "Narrator: ");

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.lang = 'en-US';
    if (this.preferredVoice) {
      utterance.voice = this.preferredVoice;
    }
    utterance.rate = this.state.speed;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.state.isPlaying = true;
      this.state.isPaused = false;
      this.notify();
    };

    utterance.onend = () => {
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.notify();
    };

    utterance.onerror = (e) => {
      // Cancelled or interrupted is normal when stopping
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.warn('Speech synthesis error:', e);
      }
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.state.isPlaying && !this.state.isPaused) {
      this.synth.pause();
      this.state.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.state.isPaused) {
      this.synth.resume();
      this.state.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.notify();
    }
  }

  public getState(): AudioPlayerState {
    return { ...this.state };
  }
}

export const speechAudioService = new SpeechAudioService();

export const speakText = (
  text: string,
  speed: number = 1.0,
  onStart?: () => void,
  onEnd?: () => void
) => {
  speechAudioService.setSpeed(speed);
  if (onStart) onStart();
  speechAudioService.play(text);
  if (onEnd) {
    const unsub = speechAudioService.subscribe((st) => {
      if (!st.isPlaying && !st.isPaused) {
        onEnd();
        unsub();
      }
    });
  }
};

