#!/bin/bash

# StudyBuddy Deployment Script
echo "🚀 Starting StudyBuddy deployment process..."

# Check if git is configured
if ! git config user.name > /dev/null; then
    echo "⚠️  Git user not configured. Please run:"
    echo "git config --global user.name 'Your Name'"
    echo "git config --global user.email 'your.email@example.com'"
    exit 1
fi

# Add and commit changes
echo "📦 Adding files to git..."
git add .
git commit -m "Deploy: Updated StudyBuddy for production"

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  No remote origin found. Please add your GitHub repository:"
    echo "git remote add origin https://github.com/yourusername/study-buddy.git"
    echo "Then run: git push -u origin main"
    exit 1
fi

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push origin main

echo "✅ Deployment process complete!"
echo ""
echo "🌐 Next steps for live deployment:"
echo "1. Backend: Deploy on Railway/Render from your GitHub repo"
echo "2. Frontend: Deploy on Vercel/Netlify from your GitHub repo"
echo "3. Update API URLs in frontend to point to your deployed backend"
