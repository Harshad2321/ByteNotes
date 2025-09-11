# StudyBuddy - AI-Powered Document Analysis

A full-stack web application that allows users to upload PDF documents and ask AI-powered questions about their content. Built for hackathons with React, Node.js, and Hugging Face integration.

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

**Backend:**
- Node.js + Express.js
- JWT Authentication
- PDF text extraction with pdf-parse
- Hugging Face API integration
- CORS enabled for cross-origin requests

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/study-buddy.git
cd study-buddy
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

## 📁 Project Structure

```
study-buddy/
├── backend/                 # Node.js Express API
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env               # Environment variables
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   └── types.ts       # TypeScript types
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🔧 API Endpoints

- `POST /api/auth/login` - User authentication
- `POST /api/files/upload` - Upload and process PDF files
- `POST /api/ai/ask` - Ask questions about uploaded documents
- `GET /api/files` - List uploaded files
- `POST /api/ask` - Legacy endpoint for direct PDF analysis

## 🌐 Deployment

### Backend Deployment (Railway/Render)
1. Connect your GitHub repository
2. Set environment variables in the platform
3. Deploy from the `backend` directory

### Frontend Deployment (Vercel/Netlify)
1. Connect your GitHub repository
2. Set build directory to `frontend`
3. Update API URLs to point to your deployed backend

## 🤝 Contributing

This project was built for hackathons! Feel free to fork, modify, and improve it.

## 📄 License

MIT License - feel free to use this project for your hackathons and learning!

## 🏆 Hackathon Ready

This project is designed to be hackathon-friendly with:
- ✅ Quick setup and deployment
- ✅ Modern tech stack
- ✅ AI integration ready
- ✅ Responsive design
- ✅ Proper error handling
- ✅ Authentication system

Perfect for AI/ML hackathons, full-stack challenges, or document processing competitions!
