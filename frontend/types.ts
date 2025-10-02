export interface UploadedFile {
  
  id: number;
  name: string;
  pages: number;
  size: string;
  date: string;
  base64: string;
  type: string;
}

export interface QuestionAnswer {
  id: number;
  question: string;
  answer: string;
  sourceFile: string;
  date: string;
}
