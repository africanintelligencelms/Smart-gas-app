import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

const SettingsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="p-4 animate-fade-in">
      <header className="flex items-center mb-6 relative">
        <button onClick={onBack} className="p-2 -ml-2 absolute left-0">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-xl font-bold text-slate-100 flex-grow text-center">Settings</h1>
      </header>
      <div className="text-center text-slate-400 mt-20">
        <p>Application settings and preferences will be available here.</p>
      </div>
    </div>
  );
};

export default SettingsScreen;