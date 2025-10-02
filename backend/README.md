# ByteNotes Backend

Express.js API server for ByteNotes application providing document upload, AI processing, and authentication services.

## Requirements
- Node.js 18+
- npm

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file (`.env`):
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_here
   HF_TOKEN=your_hugging_face_token_here
   NODE_ENV=development
   ```

3. Create uploads directory:
   ```bash
   mkdir uploads
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Testing

### Authentication
Login endpoint:
