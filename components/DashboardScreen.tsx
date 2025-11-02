import React, { useState, useEffect } from 'react';
import AlertTriangleIcon from './icons/AlertTriangleIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import SafetyCenterScreen from './SafetyCenterScreen';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

const GasCylinderVisual: React.FC<{ percentage: number }> = ({ percentage }) => {
  const fillHeight = 118; // Max height of the fillable area in SVG units
  const fillYOffset = 25;
  const currentFill = (percentage / 100) * fillHeight;

  let colorClass = 'fill-cyan-400';
  if (percentage < 50) colorClass = 'fill-yellow-400';
  if (percentage < 20) colorClass = 'fill-orange-500';

  return (
    <div className="relative flex flex-col items-center justify-center my-6">
      <svg width="150" height="220" viewBox="0 0 100 155" className="drop-shadow-lg">
        <defs>
          <clipPath id="cylinderClip">
             <path d="M 85,25 A 40,12 0 0 0 15,25 L 15,130 A 10,10 0 0 0 25,140 L 75,140 A 10,10 0 0 0 85,130 Z" />
          </clipPath>
        </defs>

        {/* Cylinder Body Outline */}
        <path d="M 85,25 A 40,12 0 0 0 15,25 L 15,130 A 10,10 0 0 0 25,140 L 75,140 A 10,10 0 0 0 85,130 Z" 
              fill="#2c3e50" stroke="#475569" strokeWidth="3" />

        {/* Gas fill */}
        <rect
          clipPath="url(#cylinderClip)"
          x="10"
          y={fillYOffset + (fillHeight - currentFill)}
          width="80"
          height={currentFill}
          className={`transition-all duration-1000 ease-in-out ${colorClass}`}
        />
        
        {/* Cylinder Top and highlights */}
        <path d="M 85,25 A 40,12 0 0 1 15,25" fill="#34495e" />
        <path d="M 85,25 A 40,12 0 0 0 15,25" fill="none" stroke="#475569" strokeWidth="3" />
        <path d="M 50,15 A 25,6 0 0 1 25,15" fill="none" stroke="#475569" strokeWidth="3" />
        <path d="M 60,15 L 40,15" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        <path d="M 20,25 C 25,30 30,32 50,32 C 70,32 75,30 80,25" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>

      </svg>
      <div className="absolute flex flex-col items-center top-1/2 mt-2">
        <span className="text-5xl font-bold text-white" style={{textShadow: '0 2px 4px rgba(0,0,0,0.7)'}}>{percentage}%</span>
        <span className="text-slate-300 font-medium tracking-wider">Gas Level</span>
      </div>
    </div>
  );
};


const DashboardScreen: React.FC = () => {
  const [gasLevel, setGasLevel] = useState(75);
  const [safetyStatus, setSafetyStatus] = useState<'normal' | 'leak'>('normal');
  const [showSafetyCenter, setShowSafetyCenter] = useState(false);

  useEffect(() => {
    // Simulate gas level decreasing over time
    const interval = setInterval(() => {
      setGasLevel(prev => (prev > 0 ? prev - 1 : 0));
    }, 5000);

    // Simulate a leak detection for demonstration
    const leakTimeout = setTimeout(() => {
        setSafetyStatus('leak');
        const normalTimeout = setTimeout(() => setSafetyStatus('normal'), 10000);
        return () => clearTimeout(normalTimeout);
    }, 15000);


    return () => {
        clearInterval(interval);
        clearTimeout(leakTimeout);
    };
  }, []);

  if (showSafetyCenter) {
    return <SafetyCenterScreen onBack={() => setShowSafetyCenter(false)} />;
  }

  return (
    <div className="p-4 flex flex-col h-full">
      <header className="mb-2">
        <h1 className="text-2xl font-bold text-slate-100">Welcome, User</h1>
        <p className="text-slate-400">Here's your LPG status overview.</p>
      </header>

      <GasCylinderVisual percentage={gasLevel} />

      <div className="mb-6">
        <p className="text-sm text-slate-400 text-center mb-2">Leak Status</p>
        {safetyStatus === 'leak' ? (
           <div className="bg-orange-600 text-white p-4 rounded-lg flex items-center justify-center gap-3 animate-pulse shadow-lg shadow-orange-600/30">
              <AlertTriangleIcon className="w-6 h-6"/>
              <span className="font-bold text-lg">Critical Leak Detected</span>
           </div>
        ) : (
           <div className="bg-blue-900/50 text-slate-200 p-4 rounded-lg flex items-center justify-center gap-3 shadow-lg shadow-blue-900/30">
              <CheckCircleIcon className="w-6 h-6 text-cyan-400"/>
              <span className="font-bold text-lg">Safe</span>
           </div>
        )}
      </div>

       <div className="my-4">
        <button 
          onClick={() => setShowSafetyCenter(true)}
          className="w-full flex items-center justify-center gap-2 bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors duration-300 hover:bg-slate-600"
        >
          <ShieldCheckIcon className="w-5 h-5" />
          Safety Center
        </button>
      </div>

      <div className="flex-grow"></div>

      <div className="pb-4">
        <p className="text-sm text-slate-400 text-center mb-2">System Health</p>
        <div className="flex justify-around bg-slate-800 p-3 rounded-lg text-sm text-slate-300">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Wi-Fi: Connected</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Battery: OK</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;