export interface RevAIConfig {
  contentType: string;
  sampleRate?: number;
  language?: string;
  customVocabulary?: string[];
}

export interface ElevenLabsConfig {
  voiceId: string;
  modelId: string;
  stability: number;
  similarityBoost: number;
  speakerBoost: boolean;
}

export interface SpeechRecognitionResult {
  text: string;
  confidence: number;
  wordTimings: Array<{
    word: string;
    start: number;
    end: number;
  }>;
  speakerId?: string;
}

