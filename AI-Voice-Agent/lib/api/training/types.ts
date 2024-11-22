export interface TrainingDocument {
  id: string;
  type: 'script' | 'faq' | 'guidelines' | 'url';
  content: string;
  metadata: {
    source: string;
    lastUpdated: string;
    status: 'processing' | 'active' | 'failed';
  };
}

export interface TrainingConfig {
  documentTypes: string[];
  language: string;
  updateExisting: boolean;
  priority: 'low' | 'high';
}

