# ByteNotes - AI-Powered Document Analysis

**Live Demo:** [https://harshad2321.github.io/ByteNotes/](https://harshad2321.github.io/ByteNotes/)

**Demo Video:** [https://youtu.be/rZ4RcNcWisg](https://youtu.be/rZ4RcNcWisg)

**Hackathon Submission:** [https://devpost.com/software/bytenotes](https://devpost.com/software/bytenotes?ref_content=my-projects-tab&ref_feature=my_projects)

A full-stack web application that allows users to upload PDF documents and ask AI-powered questions about their content. Built with React, Node.js, and Hugging Face integration.

## Live Demo Features

The GitHub Pages demo includes:
- **Full UI Experience** - Complete React frontend
- **PDF Upload Simulation** - Upload PDFs and see the interface
- **Mock AI Responses** - Demonstrates the Q&A functionality
- **Responsive Design** - Works on desktop and mobile
- **Authentication Demo** - Login with any credentials

> **Note:** The live demo uses mock data for demonstration. For full functionality with real AI processing, deploy the backend separately.

## Features

- **PDF Upload & Analysis**: Upload PDF documents and extract text content
- **AI-Powered Q&A**: Ask questions about your documents and get intelligent responses
- **User Authentication**: Secure login system with JWT tokens
- **Modern UI**: Clean React + TypeScript frontend with Vite
- **RESTful API**: Express.js backend with proper error handling

## Tech Stack

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

## Quick Start

### Live Demo
Just visit: [https://harshad2321.github.io/ByteNotes/](https://harshad2321.github.io/ByteNotes/)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/Harshad2321/ByteNotes.git
cd ByteNotes
```

2. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

3. **Setup Backend (Optional - for full functionality)**
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

Start backend:
```bash
npm start
```

> **Note:** The frontend works standalone with mock data. Backend is only needed for real AI processing.

## Deployment

### GitHub Pages
- **Automatic deployment** on every push to main branch
- **Live at:** https://harshad2321.github.io/ByteNotes/
- **Frontend-only** with mock backend functionality for demonstration
- **No external services required** - runs entirely on GitHub infrastructure

## Project Structure

```
ByteNotes/
├── .github/workflows/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── frontend/
│   ├── App.tsx
│   ├── components/
│   ├── services/
│   ├── types.ts
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## API Endpoints

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

## Contributing

This project was built for hackathons! Feel free to fork, modify, and improve it.

## License

MIT License - feel free to use this project for your hackathons and learning!

## Development Ready

This project includes:
- **Live demo** accessible instantly
- **Quick setup** and deployment
- **Modern tech stack**
- **AI integration** ready
- **Responsive design**
- **Proper error handling**
- **Authentication system**
- **GitHub Actions** for CI/CD

Perfect for AI/ML projects, full-stack applications, or document processing solutions.

---

## GitHub Pages Hosting

This project is designed to run entirely on GitHub infrastructure:

- **Frontend**: Automatically deployed via GitHub Actions to GitHub Pages
- **Demo Mode**: Uses mock backend for full functionality demonstration
- **No External Dependencies**: No third-party hosting services required
- **Zero Cost**: Free hosting on GitHub Pages
- **Instant Setup**: Just fork the repository and GitHub Pages handles the rest

**Live Demo**: [https://harshad2321.github.io/ByteNotes/](https://harshad2321.github.io/ByteNotes/)

**Video Demonstration**: [https://youtu.be/rZ4RcNcWisg](https://youtu.be/rZ4RcNcWisg)

**Hackathon Project**: [https://devpost.com/software/bytenotes](https://devpost.com/software/bytenotes?ref_content=my-projects-tab&ref_feature=my_projects)
