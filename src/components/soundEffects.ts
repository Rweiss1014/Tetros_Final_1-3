// Retro game sound effects using Web Audio API
// All sounds are synthesized for authentic 8-bit feel

class SoundEffects {
  private audioContext: AudioContext | null = null;
  private masterVolume: GainNode | null = null;
  private enabled: boolean = true;
  private volume: number = 0.3; // Default volume (0 to 1)

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.masterVolume = this.audioContext.createGain();
        this.masterVolume.connect(this.audioContext.destination);
        this.masterVolume.gain.value = this.volume;
      } catch (e) {
        console.warn('Web Audio API not supported', e);
      }
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.masterVolume) {
      this.masterVolume.gain.value = this.volume;
    }
  }

  getVolume(): number {
    return this.volume;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'square', volumeMultiplier: number = 1) {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterVolume);

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gainNode.gain.setValueAtTime(0.3 * volumeMultiplier, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Piece movement sound (subtle blip)
  move() {
    this.playTone(200, 0.05, 'square', 0.3);
  }

  // Piece rotation sound (quick chirp)
  rotate() {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterVolume);

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(500, this.audioContext.currentTime + 0.08);

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.08);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.08);
  }

  // Hard drop sound (whoosh down)
  hardDrop() {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterVolume);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.15);

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.15);
  }

  // Piece lands sound (thud)
  land() {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterVolume);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(80, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // Line clear sound (ascending arpeggio)
  lineClear(lines: number = 1) {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C octave
    const numNotes = Math.min(lines, 4);

    for (let i = 0; i < numNotes; i++) {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.masterVolume);

      oscillator.type = 'square';
      oscillator.frequency.value = frequencies[i];

      const startTime = this.audioContext.currentTime + (i * 0.08);
      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.15);
    }
  }

  // Tetris (4 lines) special sound
  tetris() {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    // Victory fanfare
    const melody = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    
    melody.forEach((freq, i) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.masterVolume!);

      oscillator.type = 'square';
      oscillator.frequency.value = freq;

      const startTime = this.audioContext!.currentTime + (i * 0.1);
      gainNode.gain.setValueAtTime(0.4, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    });
  }

  // Level up sound (triumphant)
  levelUp() {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    const melody = [523.25, 659.25, 783.99, 1046.50];
    
    melody.forEach((freq, i) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.masterVolume!);

      oscillator.type = 'triangle';
      oscillator.frequency.value = freq;

      const startTime = this.audioContext!.currentTime + (i * 0.12);
      gainNode.gain.setValueAtTime(0.35, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.25);
    });
  }

  // Game over sound (descending sad trombone)
  gameOver() {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    const frequencies = [392, 349.23, 293.66, 261.63];
    
    frequencies.forEach((freq, i) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.masterVolume!);

      oscillator.type = 'sawtooth';
      oscillator.frequency.value = freq;

      const startTime = this.audioContext!.currentTime + (i * 0.2);
      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.4);
    });
  }

  // Quiz correct answer (cheerful ascending chime)
  correct() {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    // Play a pleasant 3-note ascending arpeggio
    const notes = [659.25, 783.99, 1046.50]; // E, G, C (major chord)
    
    notes.forEach((freq, i) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.masterVolume!);

      oscillator.type = 'triangle';
      oscillator.frequency.value = freq;

      const startTime = this.audioContext!.currentTime + (i * 0.08);
      gainNode.gain.setValueAtTime(0.35, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.25);
    });
  }

  // Quiz wrong answer (buzzer)
  wrong() {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterVolume);

    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 150;

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.4);
  }

  // High score achieved (fanfare)
  highScore() {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    const melody = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50, 1318.51];
    
    melody.forEach((freq, i) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.masterVolume!);

      oscillator.type = 'triangle';
      oscillator.frequency.value = freq;

      const startTime = this.audioContext!.currentTime + (i * 0.15);
      gainNode.gain.setValueAtTime(0.35, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.25);
    });
  }

  // UI click sound
  click() {
    this.playTone(400, 0.05, 'square', 0.2);
  }

  // Pause sound
  pause() {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterVolume);

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, this.audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // Resume sound
  resume() {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterVolume);

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // Game complete celebration (epic victory fanfare)
  gameComplete() {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    // Epic ascending victory melody
    const melody = [
      { freq: 523.25, duration: 0.2 },  // C
      { freq: 659.25, duration: 0.2 },  // E
      { freq: 783.99, duration: 0.2 },  // G
      { freq: 1046.50, duration: 0.3 }, // C high
      { freq: 783.99, duration: 0.15 }, // G
      { freq: 1046.50, duration: 0.3 }, // C high
      { freq: 1318.51, duration: 0.4 }, // E high
      { freq: 1568.00, duration: 0.6 }, // G high (finale)
    ];
    
    let totalTime = 0;
    melody.forEach((note, i) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.masterVolume!);

      oscillator.type = i === melody.length - 1 ? 'sine' : 'triangle';
      oscillator.frequency.value = note.freq;

      const startTime = this.audioContext!.currentTime + totalTime;
      const volume = i === melody.length - 1 ? 0.5 : 0.4; // Extra volume for finale
      gainNode.gain.setValueAtTime(volume, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + note.duration);

      totalTime += note.duration * 0.8; // Slight overlap
    });
  }

  // Timer tick (subtle clock tick for countdown pressure)
  timerTick() {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterVolume);

    oscillator.type = 'square';
    oscillator.frequency.value = 800;

    gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.03);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.03);
  }

  // Urgent beep for last few seconds
  urgentBeep() {
    if (!this.enabled || !this.audioContext || !this.masterVolume) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterVolume);

    oscillator.type = 'square';
    oscillator.frequency.value = 1200;

    gainNode.gain.setValueAtTime(0.25, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.08);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.08);
  }
}

// Singleton instance
export const soundEffects = new SoundEffects();
