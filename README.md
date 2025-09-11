# StudyBuddy - AI-Powered Document Analysis

🚀 **Live Demo:** [https://harshad2321.github.io/ByteNotes/](https://harshad2321.github.io/ByteNotes/)

A full-stack web application that allows users to upload PDF documents and ask AI-powered questions about their content. Built for hackathons with React, Node.js, and Hugging Face integration.

## 🌟 Live Demo Features

The GitHub Pages demo includes:
- ✅ **Full UI Experience** - Complete React frontend
- ✅ **PDF Upload Simulation** - Upload PDFs and see the interface
- ✅ **Mock AI Responses** - Demonstrates the Q&A functionality
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Authentication Demo** - Login with any credentials

> **Note:** The live demo uses mock data for demonstration. For full functionality with real AI processing, deploy the backend separately.

## 🚀 Features

- **PDF Upload & Analysis**: Upload PDF documents and extract text content
- **AI-Powered Q&A**: Ask questions about your documents and get intelligent responses
- **User Authentication**: Secure login system with JWT tokens
- **Modern UI**: Clean React + TypeScript frontend with Vite
- **RESTful API**: Express.js backend with proper error handling

## 🛠️ Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite for development and building
- Modern CSS with responsive design
- Automatic GitHub Pages deployment

**Backend:**
- Node.js + Express.js
- JWT Authentication
- PDF text extraction with pdf-parse
- Hugging Face API integration
- CORS enabled for cross-origin requests

## 🏃‍♂️ Quick Start

### For Demo (GitHub Pages)
Just visit: [https://harshad2321.github.io/ByteNotes/](https://harshad2321.github.io/ByteNotes/)

### For Local Development

1. **Clone the repository**
```bash
git clone https://github.com/Harshad2321/ByteNotes.git
cd ByteNotes
```

2. **Setup Backend**
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
HF_TOKEN=your_hugging_face_token_here
NODE_ENV=development
```

3. **Setup Frontend**
```bash
cd ../frontend
npm install
```

4. **Run the Application**

Start backend (from backend directory):
```bash
npm start
```

Start frontend (from frontend directory):
```bash
npm run dev
```

Visit `http://localhost:5173` to use the application.

## 🌐 Deployment

### GitHub Pages (Frontend Only) ✅
- **Automatic deployment** on every push to main branch
- **Live at:** https://harshad2321.github.io/ByteNotes/
- **Demo mode** with mock backend functionality

### Full Stack Deployment
For complete functionality with real AI processing:

1. **Backend:** Deploy on Railway/Render/Heroku
2. **Frontend:** Deploy on Vercel/Netlify or keep on GitHub Pages
3. **Update API URLs** in `frontend/services/api.ts`

## 📁 Project Structure

```
ByteNotes/
├── .github/workflows/       # GitHub Actions for auto-deployment
├── backend/                 # Node.js Express API
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env.example        # Environment variables template
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services + mock backend
│   │   └── types.ts       # TypeScript types
│   ├── package.json
│   └── vite.config.ts     # Configured for GitHub Pages
└── README.md
```

## 🔧 API Endpoints

- `POST /api/auth/login` - User authentication
- `POST /api/files/upload` - Upload and process PDF files
- `POST /api/ai/ask` - Ask questions about uploaded documents
- `GET /api/files` - List uploaded files
- `POST /api/ask` - Legacy endpoint for direct PDF analysis

## � Demo Instructions

1. **Visit the live demo:** [https://harshad2321.github.io/ByteNotes/](https://harshad2321.github.io/ByteNotes/)
2. **Login:** Use any username/password (demo accepts all)
3. **Upload PDF:** Try uploading any PDF file
4. **Ask Questions:** Type questions about your document
5. **See AI Responses:** Get demo responses showing the functionality

## 🤝 Contributing

This project was built for hackathons! Feel free to fork, modify, and improve it.

## 📄 License

MIT License - feel free to use this project for your hackathons and learning!

## 🏆 Hackathon Ready

This project is designed to be hackathon-friendly with:
- ✅ **Live demo** accessible instantly
- ✅ **Quick setup** and deployment
- ✅ **Modern tech stack**
- ✅ **AI integration** ready
- ✅ **Responsive design**
- ✅ **Proper error handling**
- ✅ **Authentication system**
- ✅ **GitHub Actions** for CI/CD

Perfect for AI/ML hackathons, full-stack challenges, or document processing competitions!
