import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import PhoneIcon from './icons/PhoneIcon';
import ChatBubbleIcon from './icons/ChatBubbleIcon';

const HelpSupportScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="p-4 animate-fade-in">
      <header className="flex items-center mb-6 relative">
        <button onClick={onBack} className="p-2 -ml-2 absolute left-0">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-xl font-bold text-slate-100 flex-grow text-center">In-App Support</h1>
      </header>
      
      <div className="space-y-4">
        <p className="text-center text-slate-400 mb-4">
          Need help? Reach out to our support team through one of the options below.
        </p>
        
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); alert("Starting live chat..."); }}
          className="w-full flex items-center text-left p-4 transition-colors duration-200 ease-in-out bg-slate-800 hover:bg-slate-700/50 rounded-lg"
        >
          <div className="text-cyan-400"><ChatBubbleIcon /></div>
          <div className="flex-grow mx-4">
            <p className="text-slate-100 font-semibold">Live Chat</p>
            <p className="text-sm text-slate-400">Chat with a support agent now.</p>
          </div>
        </a>

        <a 
          href="tel:+234000000000" 
          className="w-full flex items-center text-left p-4 transition-colors duration-200 ease-in-out bg-slate-800 hover:bg-slate-700/50 rounded-lg"
        >
          <div className="text-cyan-400"><PhoneIcon /></div>
          <div className="flex-grow mx-4">
            <p className="text-slate-100 font-semibold">Support Hotline</p>
            <p className="text-sm text-slate-400">Speak to us directly.</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default HelpSupportScreen;