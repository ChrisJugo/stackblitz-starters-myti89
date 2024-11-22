import { RevAIConfig, ElevenLabsConfig } from './types';

export const speechServices = {
  // Rev.ai placeholders
  startRecognition: async (config: RevAIConfig) => ({
    sessionId: 'mock-session',
    status: 'active'
  }),
  
  endRecognition: async (sessionId: string) => ({
    duration: 123,
    status: 'completed'
  }),

  // ElevenLabs placeholders
  generateSpeech: async (text: string, config: ElevenLabsConfig) => ({
    audioData: new Uint8Array(),
    metadata: {
      duration: 1.5,
      characterCount: text.length
    }
  }),
  
  getVoices: async () => ([
    { id: 'voice-1', name: 'Rachel' },
    { id: 'voice-2', name: 'John' }
  ])
};

