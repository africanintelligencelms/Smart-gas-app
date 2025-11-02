import React, { useState } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

const ProfileDetailsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane.doe@example.com');
  const [phone, setPhone] = useState('+234 801 234 5678');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    console.log('Saving profile details:', { name, email, phone });
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // In a real app, you might show a success toast here.
    }, 1500);
  };

  const inputClasses = "w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors";
  const labelClasses = "block text-sm font-medium text-slate-400 mb-1";

  return (
    <div className="p-4 animate-fade-in">
      <header className="flex items-center mb-6 relative">
        <button onClick={onBack} className="p-2 -ml-2 absolute left-0">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-xl font-bold text-slate-100 flex-grow text-center">Profile Details</h1>
      </header>
      
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label htmlFor="name" className={labelClasses}>Name</label>
          <input 
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>Email Address</label>
          <input 
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>Phone Number</label>
          <input 
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            disabled={isSaving}
            className="w-full bg-cyan-500 text-slate-900 font-bold py-3 rounded-lg transition-all duration-300 hover:bg-cyan-400 disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileDetailsScreen;
