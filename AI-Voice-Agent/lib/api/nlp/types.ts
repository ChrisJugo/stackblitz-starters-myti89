export interface RasaConfig {
  modelName: string;
  confidence: number;
  language: string;
}

export interface DialogflowConfig {
  projectId: string;
  sessionId: string;
  languageCode: string;
}

export interface NLPResult {
  intent: {
    name: string;
    confidence: number;
  };
  entities: Array<{
    entity: string;
    value: string;
    confidence: number;
  }>;
  sentiment: {
    score: number;
    magnitude: number;
  };
  nextActions: string[];
}

