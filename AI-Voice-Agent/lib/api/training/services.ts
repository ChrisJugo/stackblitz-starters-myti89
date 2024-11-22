import { TrainingConfig } from './types';

export const trainingServices = {
  uploadDocument: async (doc: File, config: TrainingConfig) => ({
    documentId: 'doc-123',
    status: 'processing',
    estimatedCompletion: '10 minutes'
  }),
  
  addUrl: async (url: string, config: TrainingConfig) => ({
    documentId: 'url-123',
    status: 'processing'
  }),

  getTrainingStatus: async () => ({
    documentsProcessed: 10,
    totalDocuments: 15,
    currentStatus: 'processing',
    estimatedCompletion: '5 minutes'
  })
};

