import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const isGitHubPages = window.location.hostname.includes('github.io');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-[#0c0a12] text-white font-sans" style={{ backgroundImage: 'radial-gradient(ellipse 80% 80% at 90% 50%, rgba(178, 34, 98, 0.2), transparent), radial-gradient(ellipse 60% 60% at 10% 10%, rgba(88, 42, 138, 0.25), transparent), linear-gradient(145deg, #1d1135 0%, #0c0a12 100%)' }}>
      {/* Demo Banner for GitHub Pages */}
      {isGitHubPages && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 px-4 text-sm">
          <strong>ByteNotes Demo</strong> - This is a live demo running on GitHub Pages! 
          <span className="ml-2">Try uploading a PDF and asking questions!</span>
        </div>
      )}
      
      {isAuthenticated ? <DashboardPage onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />}
    </div>
  );
};

export default App;