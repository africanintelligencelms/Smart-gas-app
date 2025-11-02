
import React, { useState, useMemo } from 'react';

type RefillStep = 'selection' | 'confirming';

const PRICE_PER_KG = 700; // Price in Naira per KG
const ONE_CLICK_REFILL_KG = 12.5;
const MIN_REFILL_KG = 1;
const MAX_REFILL_KG = 25;


const RefillScreen: React.FC<{ onOrderSuccess: () => void }> = ({ onOrderSuccess }) => {
  const [step, setStep] = useState<RefillStep>('selection');
  const [customQuantity, setCustomQuantity] = useState<number>(5);
  const [order, setOrder] = useState<{ quantity: number; price: number } | null>(null);

  const customPrice = useMemo(() => {
    return customQuantity * PRICE_PER_KG;
  }, [customQuantity]);
  
  const oneClickPrice = useMemo(() => {
    return ONE_CLICK_REFILL_KG * PRICE_PER_KG;
  }, []);

  const handleOrderRequest = (quantity: number, price: number) => {
    setOrder({ quantity, price });
    setStep('confirming');
    setTimeout(() => {
      onOrderSuccess();
    }, 2000);
  };
  
  const renderContent = () => {
    switch (step) {
      case 'selection':
        return (
          <>
            <div className="mb-6 bg-slate-800 p-3 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-400">Deliver to:</p>
                <p className="font-semibold text-slate-100">123, Main Street, Ikeja, Lagos</p>
            </div>

            <div className="mb-8">
                 <button 
                    onClick={() => handleOrderRequest(ONE_CLICK_REFILL_KG, oneClickPrice)}
                    className="w-full text-left p-4 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200 flex justify-between items-center shadow-lg shadow-orange-500/20"
                >
                  <div>
                    <p className="font-bold text-lg">One-Click Refill Now</p>
                    <p className="text-orange-100">{ONE_CLICK_REFILL_KG}kg Standard Refill</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₦{oneClickPrice.toLocaleString()}</p>
                  </div>
                </button>
            </div>

            <div className="space-y-4">
                <div className="text-center">
                    <p className="text-slate-400">Or select a custom amount</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                         <label htmlFor="custom-quantity" className="font-bold text-slate-100 text-lg">Custom Refill Quantity</label>
                         <p className="font-mono text-xl text-slate-100 bg-slate-900 px-2 py-1 rounded">{customQuantity.toFixed(1)} kg</p>
                    </div>
                    <input 
                        id="custom-quantity"
                        type="range" 
                        min={MIN_REFILL_KG} 
                        max={MAX_REFILL_KG}
                        step="0.5"
                        value={customQuantity}
                        onChange={(e) => setCustomQuantity(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                     <div className="text-center mt-4">
                        <p className="text-slate-300 text-sm">Real-time Price Calculation</p>
                        <p className="text-3xl font-bold text-cyan-400">₦{customPrice.toLocaleString()}</p>
                    </div>
                </div>
            </div>
          </>
        );
      case 'confirming':
        return (
          <div className="flex flex-col items-center justify-center text-center h-full pt-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
            <h2 className="text-2xl font-bold mt-6">Placing Your Order...</h2>
            <p className="text-slate-400">Requesting a {order?.quantity}kg refill for ₦{order?.price.toLocaleString()}.</p>
          </div>
        );
    }
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-slate-100">Order Gas Refill</h1>
        <p className="text-slate-400">Fast and reliable delivery to your doorstep.</p>
      </header>
      
      <div className="flex-grow">
          {renderContent()}
      </div>

      {step === 'selection' && (
        <button
          onClick={() => handleOrderRequest(customQuantity, customPrice)}
          className="w-full bg-cyan-500 text-slate-900 font-bold py-4 rounded-lg mt-auto transition-opacity duration-300 hover:bg-cyan-400"
        >
          Confirm Custom Order
        </button>
      )}
    </div>
  );
};

export default RefillScreen;
