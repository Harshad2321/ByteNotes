export interface UploadedFile {
  
  id: number;
  name: string;
  pages: number;
  size: string;
  date: string;
  base64: string; // base64-encoded file content
  type: string;   // MIME type
}

export interface QuestionAnswer {
  id: number;
  question: string;
  answer: string;
  sourceFile: string;
  date: string;
}

// npm run dev
