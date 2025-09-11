import React, { useState, useRef, ChangeEvent, useCallback } from 'react';
import { BookIcon, UploadIcon, TrashIcon, UserIcon, LogoutIcon, SearchIcon } from './icons';
import { UploadedFile, QuestionAnswer } from '../types';
import { askAI } from '../services/geminiService';

const initialFiles: UploadedFile[] = [
  { id: 1, name: 'Machine Learning Fundamentals.pdf', pages: 45, size: '2.34 MB', date: 'Jan 15, 2024', base64: '', type: '' },
  { id: 2, name: 'Data Structures Notes.pdf', pages: 32, size: '1.81 MB', date: 'Jan 14, 2024', base64: '', type: '' },
  { id: 3, name: 'Algorithm Analysis.pdf', pages: 67, size: '3.12 MB', date: 'Jan 11, 2024', base64: '', type: '' },
];

const initialQA: QuestionAnswer[] = [
  {
    id: 1,
    question: "What are the main properties of a Binary Search Tree?",
    answer: "A node has at most two children (left and right). The key property is that for any node, all values in the left subtree are smaller than the node's value, and all values in the right subtree are greater. This ordering property enables efficient searching, insertion, and deletion operations with average time complexity of O(log n). The document explains that BSTs are particularly useful for maintaining sorted data and enabling fast lookups, though they can degrade to O(n) performance in worst-case scenarios when the tree becomes unbalanced.",
    sourceFile: "Data Structures Notes.pdf",
    date: "Jan 16, 2024",
  },
  {
    id: 2,
    question: "What is the time complexity of quicksort?",
    answer: "From your Algorithm Analysis PDF, quicksort has different time complexities depending on the scenario: Best Case: O(n log n) when the pivot divides the array into two equal halves, Average Case: O(n log n) with random pivot selection, and Worst Case: O(n²) when the pivot is always the smallest or largest element. The document emphasizes that quicksort is an in-place sorting algorithm with excellent average performance, making it widely used in practice. It also mentions that choosing a good pivot strategy (like median-of-three) helps avoid worst-case performance in most real-world scenarios.",
    sourceFile: "Algorithm Analysis.pdf",
    date: "Jan 15, 2024",
  },
];

const DashboardPage: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [files, setFiles] = useState<UploadedFile[]>(initialFiles);
  const [qaHistory, setQaHistory] = useState<QuestionAnswer[]>(initialQA);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles && uploadedFiles.length > 0) {
      const newFile = uploadedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        const newFileEntry: UploadedFile = {
          id: Date.now(),
          name: newFile.name,
          pages: Math.floor(Math.random() * 100) + 10, // Mock page count
          size: `${(newFile.size / 1024 / 1024).toFixed(2)} MB`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          base64,
          type: newFile.type,
        };
        setFiles(prevFiles => [newFileEntry, ...prevFiles]);
      };
      reader.readAsDataURL(newFile);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const deleteFile = (id: number) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const handleAskAI = useCallback(async () => {
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    const userQuestion = question;
    setQuestion('');

    try {
        const answer = await askAI(userQuestion, files);
        const newQA: QuestionAnswer = {
            id: Date.now(),
            question: userQuestion,
            answer: answer,
            sourceFile: files.length > 0 ? files[Math.floor(Math.random() * files.length)].name : "General Knowledge",
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
        setQaHistory(prev => [newQA, ...prev]);
    } catch (e) {
        if (e instanceof Error) {
            alert(e.message);
        } else {
            alert("An unknown error occurred.");
        }
    } finally {
        setIsLoading(false);
    }
  }, [question, files, isLoading]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <BookIcon className="w-8 h-8 text-purple-400" />
          <div>
            <h1 className="text-2xl font-bold">ByteNotes</h1>
            <p className="text-sm text-gray-400">AI-powered note analysis</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-white/10">
            <UserIcon className="w-5 h-5 text-gray-400" />
            <span className="font-medium text-sm">Test</span>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-white/10 hover:bg-gray-700/70 transition-colors">
            <LogoutIcon className="w-5 h-5 text-gray-400"/>
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <GlassCard>
            <h2 className="text-lg font-semibold mb-1">Upload Notes</h2>
            <p className="text-sm text-gray-400 mb-4">Upload your PDF notes for AI analysis</p>
            <div 
              onClick={triggerFileUpload}
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400 hover:bg-white/5 transition-all"
            >
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf" />
              <UploadIcon className="w-10 h-10 mx-auto text-gray-400 mb-3" />
              <p className="font-semibold">Click to Upload PDF Files</p>
              <p className="text-xs text-gray-500 mt-1">Maximum file size: 25MB</p>
            </div>
          </GlassCard>

          <GlassCard className="flex-grow">
            <h2 className="text-lg font-semibold mb-4">Your Files ({files.length})</h2>
            <div className="space-y-3 max-h-[calc(100vh-32rem)] overflow-y-auto pr-2">
              {files.map(file => (
                <div key={file.id} className="bg-gray-800/50 p-3 rounded-lg flex items-start gap-3">
                  <div className="flex-shrink-0 text-purple-400 mt-1">
                    <BookIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-sm text-white">{file.name}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <span>{file.pages} pages</span>
                      <span>{file.size}</span>
                      <span>{file.date}</span>
                    </div>
                  </div>
                  <button onClick={() => deleteFile(file.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <GlassCard>
            <h2 className="text-lg font-semibold mb-1">Ask Questions</h2>
            <p className="text-sm text-gray-400 mb-4">Get AI-powered answers about your uploaded notes</p>
            <textarea 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about your notes... (e.g., What are the main concepts in chapter 3?)"
              className="w-full h-28 bg-gray-900/60 border border-white/20 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
            />
            <button
              onClick={handleAskAI}
              disabled={isLoading || !question.trim()}
              className="w-full mt-3 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Thinking...' : <> <SearchIcon className="w-5 h-5" /> Ask AI </>}
            </button>
          </GlassCard>

          <GlassCard className="flex-grow">
            <h2 className="text-lg font-semibold mb-4">Recent Questions & Answers</h2>
            <div className="space-y-6 max-h-[calc(100vh-30rem)] overflow-y-auto pr-2">
              {qaHistory.map(qa => (
                <div key={qa.id}>
                  <p className="font-semibold text-white mb-2">{qa.question}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <BookIcon className="w-3 h-3" />
                    <span>{qa.sourceFile} - {qa.date}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{qa.answer}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
};

const GlassCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <div className={`bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl ${className || ''}`}>
    {children}
  </div>
);

export default DashboardPage;