

interface MockUser {
  id: string;
  username: string;
  token: string;
}

interface MockFile {
  id: string;
  name: string;
  content: string;
  uploadDate: string;
}

class MockBackendService {
  private users: MockUser[] = [
    { id: '1', username: 'demo', token: 'demo-token-123' }
  ];
  
  private files: MockFile[] = [];
  private currentUser: MockUser | null = null;


  async login(username: string, password: string) {

    const user = this.users[0];
    this.currentUser = user;
    localStorage.setItem('authToken', user.token);
    localStorage.setItem('username', username);
    
    return {
      success: true,
      token: user.token,
      user: { id: user.id, username }
    };
  }

  async uploadFile(file: File) {
    const mockFile: MockFile = {
      id: Date.now().toString(),
      name: file.name,
      content: `Mock content for ${file.name}. In a real deployment, this would contain the actual PDF text.`,
      uploadDate: new Date().toISOString()
    };
    
    this.files.push(mockFile);
    
    return {
      success: true,
      file: {
        id: mockFile.id,
        name: mockFile.name,
        size: file.size,
        type: file.type,
        uploadDate: mockFile.uploadDate
      }
    };
  }


  async getFiles() {
    return {
      success: true,
      files: this.files.map(f => ({
        id: f.id,
        name: f.name,
        uploadDate: f.uploadDate,
        size: f.content.length
      }))
    };
  }


  async askAI(question: string, fileId?: string) {
    const responses = [
      `Based on the document, here's what I found about "${question}": This is a demonstration of the ByteNotes AI analysis feature.`,
      `The document mentions several key points related to "${question}". In a full deployment, this would use real AI analysis.`,
      `Regarding "${question}", the content suggests multiple perspectives. This demo shows the potential of AI-powered document analysis.`,
      `The analysis of "${question}" reveals interesting insights. ByteNotes AI would provide detailed answers in production.`
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      success: true,
      response: randomResponse,
      confidence: Math.random() * 0.3 + 0.7
    };
  }


  isDemo() {
    return window.location.hostname.includes('github.io') || 
           window.location.hostname === 'localhost' && window.location.port === '5173';
  }
}

export const mockBackend = new MockBackendService();
