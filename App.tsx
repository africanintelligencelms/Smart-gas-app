
import React, { useState } from 'react';
import { Tab } from './types';
import BottomNav from './components/BottomNav';
import DashboardScreen from './components/DashboardScreen';
import RefillScreen from './components/RefillScreen';
import AccountScreen from './components/AccountScreen';
import RefillTrackingScreen from './components/RefillTrackingScreen';
import OnboardingScreen from './components/onboarding/OnboardingScreen';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Dashboard);
  const [isTrackingOrder, setIsTrackingOrder] = useState<boolean>(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const renderScreen = () => {
    switch (activeTab) {
      case Tab.Dashboard:
        return <DashboardScreen />;
      case Tab.Refill:
        return isTrackingOrder ? (
          <RefillTrackingScreen onComplete={() => setIsTrackingOrder(false)} />
        ) : (
          <RefillScreen onOrderSuccess={() => setIsTrackingOrder(true)} />
        );
      case Tab.Account:
        return <AccountScreen />;
      default:
        return <DashboardScreen />;
    }
  };
  
  // For demonstration, onboarding is shown first. A real app would persist this state.
  if (!isOnboardingComplete) {
    return (
       <div className="h-screen w-screen bg-slate-900 font-sans flex flex-col items-center">
          <div className="relative w-full max-w-md h-full flex flex-col text-slate-100 overflow-hidden">
            <OnboardingScreen onComplete={() => setIsOnboardingComplete(true)} />
          </div>
       </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-slate-900 font-sans flex flex-col items-center">
      <div className="relative w-full max-w-md h-full flex flex-col text-slate-100 overflow-hidden">
        <main className="flex-grow overflow-y-auto pb-20">
          {renderScreen()}
        </main>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default App;
