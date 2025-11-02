import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import AlertTriangleIcon from './icons/AlertTriangleIcon';

const SafetyProcedureItem: React.FC<{ number: number; text: string }> = ({ number, text }) => (
    <div className="flex items-start gap-4 p-4 bg-slate-800 rounded-lg">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-500/20 text-orange-400 rounded-full font-bold">
            {number}
        </div>
        <p className="text-slate-200 pt-1">{text}</p>
    </div>
);

const SafetyCenterScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const procedures = [
    { number: 1, text: "Immediately turn off the cylinder valve and regulator." },
    { number: 2, text: "Open all doors and windows to ventilate the area." },
    { number: 3, text: "Do not switch any electrical appliances on or off." },
    { number: 4, text: "Extinguish all naked flames, candles, and incense sticks." },
    { number: 5, text: "If the leak persists, evacuate the premises and call for help from a safe distance." },
  ];

  return (
    <div className="p-4 animate-fade-in h-full flex flex-col">
      <header className="flex items-center mb-6 relative">
        <button onClick={onBack} className="p-2 -ml-2 absolute left-0">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-xl font-bold text-slate-100 flex-grow text-center">Safety Center</h1>
      </header>

      <div className="bg-red-500/10 border border-red-500 text-red-300 p-4 rounded-lg flex items-center gap-3 mb-6">
        <AlertTriangleIcon />
        <p className="font-semibold">Emergency Procedures for a Gas Leak</p>
      </div>

      <div className="space-y-3 overflow-y-auto">
        {procedures.map(proc => (
            <SafetyProcedureItem key={proc.number} number={proc.number} text={proc.text} />
        ))}
      </div>
    </div>
  );
};

export default SafetyCenterScreen;
