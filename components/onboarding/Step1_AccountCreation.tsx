
import React, { useState } from 'react';
import EyeIcon from '../icons/EyeIcon';
import EyeOffIcon from '../icons/EyeOffIcon';

const Step1AccountCreation: React.FC<{ onNext: (data: any) => void }> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ name, email, phone, password });
  };
  
  const inputClasses = "w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors";
  const labelClasses = "block text-sm font-medium text-slate-400 mb-1";

  return (
    <div className="animate-fade-in">
        <header className="text-center mb-6">
            <h2 className="text-xl font-bold">Create Your Account</h2>
            <p className="text-slate-400">Let's get you started with Prolife.</p>
        </header>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="onboarding-name" className={labelClasses}>Full Name</label>
                <input id="onboarding-name" type="text" value={name} onChange={e => setName(e.target.value)} className={inputClasses} required />
            </div>
            <div>
                <label htmlFor="onboarding-email" className={labelClasses}>Email Address</label>
                <input id="onboarding-email" type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClasses} required />
            </div>
            <div>
                <label htmlFor="onboarding-phone" className={labelClasses}>Phone Number</label>
                <input id="onboarding-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClasses} required />
            </div>
            <div className="relative">
                <label htmlFor="onboarding-password" className={labelClasses}>Password</label>
                <input id="onboarding-password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className={inputClasses} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-slate-400 hover:text-slate-200">
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>
            <div className="pt-4">
                <button type="submit" className="w-full bg-cyan-500 text-slate-900 font-bold py-3 rounded-lg transition-all duration-300 hover:bg-cyan-400">
                    Continue
                </button>
            </div>
        </form>
    </div>
  );
};

export default Step1AccountCreation;
