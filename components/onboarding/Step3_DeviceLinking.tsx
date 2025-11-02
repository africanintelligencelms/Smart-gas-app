import React, { useState, useEffect } from 'react';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import WifiIcon from '../icons/WifiIcon';
import DeviceMobileIcon from '../icons/DeviceMobileIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';

type LinkingStage = 'intro' | 'scanning' | 'select_wifi' | 'enter_password' | 'enter_id' | 'linking' | 'success';

const mockWifis = ['MyHome_WiFi_5G', 'NeighborNet', 'Public_Hotspot', 'Xfinity_2.4Ghz'];

const Step3DeviceLinking: React.FC<{
  onComplete: () => void;
  onBack: () => void;
}> = ({ onComplete, onBack }) => {
  const [stage, setStage] = useState<LinkingStage>('intro');
  const [selectedWifi, setSelectedWifi] = useState('');

  // Fix: Replaced `NodeJS.Timeout` with a browser-compatible timer type and improved cleanup logic.
  useEffect(() => {
    if (stage === 'scanning' || stage === 'linking') {
      const timer = setTimeout(() => {
        if (stage === 'scanning') setStage('select_wifi');
        if (stage === 'linking') setStage('success');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const renderContent = () => {
    switch (stage) {
      case 'intro':
        return (
          <div className="text-center">
            <DeviceMobileIcon className="w-20 h-20 mx-auto text-cyan-400 mb-4" />
            <h2 className="text-xl font-bold mb-2">Link Your Smart Regulator</h2>
            <p className="text-slate-400 mb-8">Let's connect your device to your Wi-Fi network to get real-time gas level updates.</p>
            <button onClick={() => setStage('scanning')} className="w-full bg-cyan-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-cyan-400">Start Linking</button>
          </div>
        );
      case 'scanning':
      case 'linking':
        return (
          <div className="text-center flex flex-col items-center justify-center pt-10">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mb-6"></div>
            <h2 className="text-xl font-bold">{stage === 'scanning' ? 'Scanning for Networks...' : 'Linking Device...'}</h2>
            <p className="text-slate-400">This will just take a moment.</p>
          </div>
        );
      case 'select_wifi':
        return (
          <div>
            <h2 className="text-lg font-bold mb-4 text-center">Select your Wi-Fi Network</h2>
            <div className="space-y-2">
              {mockWifis.map(wifi => (
                <button key={wifi} onClick={() => { setSelectedWifi(wifi); setStage('enter_password'); }} className="w-full flex items-center gap-4 text-left p-3 bg-slate-800 rounded-lg hover:bg-slate-700">
                  <WifiIcon />
                  <span>{wifi}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 'enter_password':
        return (
          <div className="text-center">
            <h2 className="text-lg font-bold mb-2">Enter Password for</h2>
            <p className="text-cyan-400 font-semibold mb-6">{selectedWifi}</p>
            <input type="password" placeholder="••••••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-center text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            <button onClick={() => setStage('enter_id')} className="w-full mt-4 bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600">Connect</button>
          </div>
        );
      case 'enter_id':
        return (
            <div className="text-center">
              <h2 className="text-lg font-bold mb-2">Enter Device ID</h2>
              <p className="text-slate-400 mb-6">Find the unique ID on the back of your regulator.</p>
              <input type="text" placeholder="e.g., PRLF-12345-ABCDE" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-center tracking-widest text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              <button onClick={() => setStage('linking')} className="w-full mt-4 bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600">Register Device</button>
            </div>
        );
      case 'success':
        return (
          <div className="text-center pt-10">
            <CheckCircleIcon className="w-20 h-20 mx-auto text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Setup Complete!</h2>
            <p className="text-slate-400 mb-8">Your Prolife Smart Regulator is now linked to your account.</p>
            <button onClick={onComplete} className="w-full bg-green-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-green-400">Go to Dashboard</button>
          </div>
        );
    }
  };

  return (
    <div className="animate-fade-in flex flex-col h-full">
        {stage !== 'intro' && stage !== 'success' && (
            <button onClick={() => stage === 'select_wifi' ? setStage('scanning') : onBack()} className="self-start p-2 -ml-2 mb-4">
                <ChevronLeftIcon />
            </button>
        )}
        <div className="flex-grow">{renderContent()}</div>
    </div>
  );
};

export default Step3DeviceLinking;
