import { CallConfig, CallState } from './types';

export const callServices = {
  initiateCall: async (config: CallConfig): Promise<CallState> => ({
    id: 'call-123',
    status: 'connecting',
    duration: 0,
    quality: {
      audioQuality: 0,
      networkLatency: 0,
      speechClarity: 0
    },
    metrics: {
      sentiment: 0,
      scriptCompliance: 0,
      customerSatisfaction: 0
    }
  }),
  
  endCall: async (callId: string) => ({
    duration: 145,
    recordingUrl: 'mock-url'
  }),
  
  getCallMetrics: async (callId: string) => ({
    duration: 145,
    sentiment: 0.8,
    scriptCompliance: 0.95,
    satisfaction: 0.9
  })
};

