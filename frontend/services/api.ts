// API service for communicating with the backend
import { mockBackend } from './mockBackend';

// TODO: Replace with your actual Railway backend URL after deployment
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://REPLACE-WITH-YOUR-RAILWAY-URL.up.railway.app/api'
  : 'http://localhost:5000/api';

// Check if we're running on GitHub Pages (demo mode)
const isGitHubPages = window.location.hostname.includes('github.io');
const isDemoMode = isGitHubPages || (window.location.hostname === 'localhost' && !window.location.port);

console.log('Demo mode:', isDemoMode, 'GitHub Pages:', isGitHubPages);

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Helper function to create headers with auth
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

// API functions
export const api = {
  // Auth API
  login: async (email: string, password: string) => {
    // Use mock backend for GitHub Pages demo
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
    
    // Store token in localStorage
    if (data.success && data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    return data;
  },

  // File Upload API
  uploadFile: async (file: File) => {
    // Use mock backend for GitHub Pages demo
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

  // Get uploaded files
  getFiles: async () => {
    // Use mock backend for GitHub Pages demo
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

  // AI Query API (with file ID)
  askAI: async (question: string, fileId?: number) => {
    // Use mock backend for GitHub Pages demo
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

  // Legacy AI Query API (with base64 file)
  askAILegacy: async (question: string, file: { base64Content: string; mimeType: string }) => {
    // Use mock backend for GitHub Pages demo
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

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// Helper function to logout
export const logout = (): void => {
  localStorage.removeItem('authToken');
};
