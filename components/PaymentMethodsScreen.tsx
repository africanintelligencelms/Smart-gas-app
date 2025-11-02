import React, { useState } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';
import CreditCardIcon from './icons/CreditCardIcon';

interface PaymentMethod {
  id: number;
  type: 'Visa' | 'Mastercard';
  last4: string;
  expiry: string;
}

const mockPaymentMethods: PaymentMethod[] = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/25' },
  { id: 2, type: 'Mastercard', last4: '5555', expiry: '08/26' },
];

const PaymentMethodsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);

  const handleDelete = (id: number) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  return (
    <div className="p-4 animate-fade-in">
      <header className="flex items-center mb-6 relative">
        <button onClick={onBack} className="p-2 -ml-2 absolute left-0">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-xl font-bold text-slate-100 flex-grow text-center">Payment Methods</h1>
      </header>

      <div className="space-y-4 mb-8">
        {paymentMethods.length > 0 ? (
          paymentMethods.map(method => (
            <div key={method.id} className="bg-slate-800 p-4 rounded-lg flex items-center justify-between transition-all duration-300">
              <div className="flex items-center gap-4">
                <CreditCardIcon className="w-8 h-8 text-slate-500" />
                <div>
                  <p className="font-bold text-slate-100">{method.type} ending in {method.last4}</p>
                  <p className="text-sm text-slate-400">Expires {method.expiry}</p>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(method.id)} 
                className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded-full hover:bg-red-500/10"
                aria-label={`Delete card ending in ${method.last4}`}
              >
                <TrashIcon />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-10 px-4 bg-slate-800 rounded-lg">
            <p className="text-slate-400">No payment methods saved.</p>
            <p className="text-sm text-slate-500">Add a card for faster checkouts.</p>
          </div>
        )}
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-cyan-500/10 border border-cyan-500 text-cyan-300 font-bold py-3 rounded-lg hover:bg-cyan-500/20 transition-colors">
        <PlusIcon />
        Add New Card
      </button>
    </div>
  );
};

export default PaymentMethodsScreen;