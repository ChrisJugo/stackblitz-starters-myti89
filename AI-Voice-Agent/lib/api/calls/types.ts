export interface CallConfig {
  customerId: string;
  priority: 'low' | 'medium' | 'high';
  schedule?: Date;
  maxDuration?: number;
  recordingEnabled: boolean;
}

export interface CallState {
  id: string;
  status: 'queued' | 'connecting' | 'active' | 'completed' | 'failed';
  duration: number;
  quality: {
    audioQuality: number;
    networkLatency: number;
    speechClarity: number;
  };
  metrics: {
    sentiment: number;
    scriptCompliance: number;
    customerSatisfaction: number;
  };
}

