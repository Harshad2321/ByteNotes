import { UploadedFile } from '../types';
import { api } from './api';

export const askAI = async (question: string, files: UploadedFile[]): Promise<string> => {
  if (!question || !files || files.length === 0) {
    throw new Error('Question and at least one file are required.');
  }
  
  const file = files[0];
  
  try {

    const result = await api.askAILegacy(question, {
      base64Content: file.base64,
      mimeType: file.type,
    });
    
    return result.answer || 'No answer received.';
  } catch (error) {
    console.error('Error calling backend API:', error);
    if (error instanceof Error) {
      return `An error occurred while communicating with the backend: ${error.message}`;
    }
    return 'An unknown error occurred while communicating with the backend.';
  }
};