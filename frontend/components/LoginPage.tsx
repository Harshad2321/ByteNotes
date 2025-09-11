import React, { useState, useRef } from 'react';
import { BookIcon, GoogleIcon, GitHubIcon } from './icons';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
            <BookIcon className="w-8 h-8 text-white/80" />
            <h2 className="text-2xl font-bold text-white">Sign in to ByteNotes</h2>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300" htmlFor="email">Email</label>
              <input 
                id="email"
                type="email"
                placeholder="name@work-email.com"
                className="w-full mt-1 px-4 py-2 bg-gray-900/60 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300" htmlFor="password">Password</label>
              <input 
                id="password"
                type="password"
                placeholder="************"
                className="w-full mt-1 px-4 py-2 bg-gray-900/60 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>
          <button
            ref={buttonRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            type="submit"
            className="relative w-full mt-6 py-3 bg-gray-200 text-black font-bold tracking-wider rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white transition-all overflow-hidden"
          >
            {isHovering && (
              <span
                className="absolute block w-40 h-40 -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-2xl"
                style={{
                  top: `${mousePosition.y}px`,
                  left: `${mousePosition.x}px`,
                  background: 'radial-gradient(circle, rgba(255, 245, 220, 0.8) 10%, rgba(255, 180, 50, 0.4) 50%, transparent 75%)',
                }}
              />
            )}
            <span className="relative z-10">LOG IN</span>
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-700" />
          <span className="mx-4 text-sm font-medium text-gray-500">OR</span>
          <hr className="flex-grow border-gray-700" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button className="w-full flex items-center justify-center py-3 bg-[#2a2a2e] border border-gray-700 rounded-full hover:bg-[#3a3a3e] hover:border-purple-400/70 hover:shadow-[0_0_15px_rgba(192,132,252,0.4)] transition-all duration-300 ease-in-out">
            <GoogleIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Google</span>
          </button>
          <button className="w-full flex items-center justify-center py-3 bg-[#2a2a2e] border border-gray-700 rounded-full hover:bg-[#3a3a3e] hover:border-purple-400/70 hover:shadow-[0_0_15px_rgba(192,132,252,0.4)] transition-all duration-300 ease-in-out">
            <GitHubIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">GitHub</span>
          </button>
        </div>
        
        <p className="text-center text-sm text-gray-400 mt-8">
          Don't have an account? <a href="#" className="font-medium text-purple-400 hover:underline">Sign up</a>
        </p>
      </div>

      <div className="text-center mt-8 text-xs text-gray-500">
        <a href="#" className="hover:underline">Terms of Use</a>
        <span className="mx-2">|</span>
        <a href="#" className="hover:underline">Privacy Policy</a>
      </div>
    </div>
  );
};

export default LoginPage;