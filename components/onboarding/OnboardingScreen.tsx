
import React, { useState } from 'react';
import Step1AccountCreation from './Step1_AccountCreation';
import Step2AddAddress from './Step2_AddAddress';
import Step3DeviceLinking from './Step3_DeviceLinking';

const OnboardingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState(null);
  const [addressData, setAddressData] = useState(null);

  const handleNext = (data: any) => {
    if (step === 1) setUserData(data);
    if (step === 2) setAddressData(data);
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setStep(s => s - 1);
  };
  
  const ProgressBar: React.FC<{ currentStep: number, totalSteps: number }> = ({ currentStep, totalSteps }) => (
    <div className="w-full bg-slate-700 rounded-full h-1.5 mb-8">
        <div 
            className="bg-cyan-400 h-1.5 rounded-full transition-all duration-500" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
    </div>
  );

  const renderStep = () => {
    switch(step) {
      case 1: return <Step1AccountCreation onNext={handleNext} />;
      case 2: return <Step2AddAddress onNext={handleNext} onBack={handleBack} />;
      case 3: return <Step3DeviceLinking onComplete={onComplete} onBack={handleBack} />;
      default: return <Step1AccountCreation onNext={handleNext} />;
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
        <header className="py-4">
            <h1 className="text-2xl font-bold text-orange-500 text-center">Prolife</h1>
            <p className="text-center text-slate-400">Smart LPG Monitoring</p>
        </header>
        <ProgressBar currentStep={step} totalSteps={3} />
        <main className="flex-grow">
            {renderStep()}
        </main>
    </div>
  );
};

export default OnboardingScreen;
