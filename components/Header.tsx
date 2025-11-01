import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 dark:bg-slate-900/80 shadow-md backdrop-blur-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a.2.2 0 0 0 .3.2l.9-.3a2.5 2.5 0 0 1 2.6 0l.9.3a.2.2 0 0 0 .3-.2V4.5A2.5 2.5 0 0 1 19.5 2"/>
                <path d="M14.5 22a2.5 2.5 0 0 0-2.5-2.5v-1.2a.2.2 0 0 1-.3-.2l-.9.3a2.5 2.5 0 0 0-2.6 0l-.9-.3a.2.2 0 0 1-.3.2v1.2A2.5 2.5 0 0 0 4.5 22"/>
                <path d="M4.5 12A2.5 2.5 0 0 0 2 9.5v-1.2a.2.2 0 0 1 .3-.2l.9.3a2.5 2.5 0 0 0 2.6 0l.9-.3a.2.2 0 0 1 .3.2v1.2A2.5 2.5 0 0 0 9.5 12"/>
                <path d="M19.5 12a2.5 2.5 0 0 1 2.5-2.5v-1.2a.2.2 0 0 0-.3-.2l-.9.3a2.5 2.5 0 0 1-2.6 0l-.9-.3a.2.2 0 0 0-.3.2v1.2A2.5 2.5 0 0 1 14.5 12"/>
                <path d="M12 14.5a2.5 2.5 0 0 0-2.5-2.5v-1.2a.2.2 0 0 1-.3-.2l-.9.3a2.5 2.5 0 0 0-2.6 0l-.9-.3a.2.2 0 0 1-.3.2v1.2a2.5 2.5 0 0 0 2.5 2.5"/>
                <path d="M12 9.5A2.5 2.5 0 0 1 14.5 7V5.8a.2.2 0 0 0-.3-.2l-.9.3a2.5 2.5 0 0 1-2.6 0l-.9-.3a.2.2 0 0 0-.3.2V7a2.5 2.5 0 0 1 2.5 2.5"/>
            </svg>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Wit Quiz Generator
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;