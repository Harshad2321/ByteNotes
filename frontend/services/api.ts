
import { mockBackend } from './mockBackend';


const API_BASE_URL = 'http://localhost:5000/api';


const isGitHubPages = window.location.hostname.includes('github.io');
const isDemoMode = isGitHubPages || (window.location.hostname === 'localhost' && !window.location.port);

console.log('Demo mode:', isDemoMode, 'GitHub Pages:', isGitHubPages);


const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};


const createHeaders = (includeAuth: boolean = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};


export const api = {

  login: async (email: string, password: string) => {
    if (isDemoMode) {
      return await mockBackend.login(email, password);
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: createHeaders(false),
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const data = await response.json();
    

    if (data.success && data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    return data;
  },


  uploadFile: async (file: File) => {
    if (isDemoMode) {
      return await mockBackend.uploadFile(file);
    }
    
    const formData = new FormData();
    formData.append('file', file);

    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'File upload failed');
    }

    return response.json();
  },


  getFiles: async () => {
    if (isDemoMode) {
      return await mockBackend.getFiles();
    }
    
    const response = await fetch(`${API_BASE_URL}/files`, {
      method: 'GET',
      headers: createHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch files');
    }

    return response.json();
  },


  askAI: async (question: string, fileId?: number) => {
    if (isDemoMode) {
      return await mockBackend.askAI(question, fileId?.toString());
    }
    
    const response = await fetch(`${API_BASE_URL}/ai/ask`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify({ question, fileId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'AI query failed');
    }

    return response.json();
  },


  askAILegacy: async (question: string, file: { base64Content: string; mimeType: string }) => {
    if (isDemoMode) {
      return await mockBackend.askAI(question);
    }
    
    const response = await fetch(`${API_BASE_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, file }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'AI query failed');
    }

    return response.json();
  },
};


export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};


export const logout = (): void => {
  localStorage.removeItem('authToken');
};
