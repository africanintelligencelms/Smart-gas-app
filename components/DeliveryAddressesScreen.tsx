
import React, { useState } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';
import PencilIcon from './icons/PencilIcon';
import StarIcon from './icons/StarIcon';
import AddressForm, { Address } from './AddressForm';

const mockAddresses: Address[] = [
  { id: 1, label: 'Home', address: '123, Main Street, Ikeja, Lagos', isDefault: true },
  { id: 2, label: 'Office', address: '456, Business Avenue, Victoria Island, Lagos', isDefault: false },
];

const DeliveryAddressesScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleSetDefault = (id: number) => {
    setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: addr.id === id })));
  };

  const handleDelete = (id: number) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };
  
  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setView('form');
  };

  const handleSave = (data: Omit<Address, 'id' | 'isDefault'>) => {
    if(editingAddress) {
        // Update
        setAddresses(prev => prev.map(addr => addr.id === editingAddress.id ? {...addr, ...data} : addr));
    } else {
        // Add new
        const newAddress: Address = {
            id: Date.now(),
            ...data,
            isDefault: addresses.length === 0 // Make default if it's the first one
        };
        setAddresses(prev => [...prev, newAddress]);
    }
    setView('list');
    setEditingAddress(null);
  };
  
  const handleCancelForm = () => {
    setView('list');
    setEditingAddress(null);
  };


  if (view === 'form') {
    return <AddressForm 
      address={editingAddress} 
      onSave={handleSave} 
      onCancel={handleCancelForm} 
      title={editingAddress ? 'Edit Address' : 'Add New Address'}
    />;
  }

  return (
    <div className="p-4 animate-fade-in">
      <header className="flex items-center mb-6 relative">
        <button onClick={onBack} className="p-2 -ml-2 absolute left-0">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-xl font-bold text-slate-100 flex-grow text-center">Delivery Addresses</h1>
      </header>
      
       <div className="space-y-4 mb-8">
        {addresses.length > 0 ? (
          addresses.map(addr => (
            <div key={addr.id} className={`bg-slate-800 p-4 rounded-lg transition-all duration-300 border ${addr.isDefault ? 'border-cyan-500' : 'border-transparent'}`}>
              <div className="flex items-start justify-between">
                <div>
                   <div className="flex items-center gap-2 mb-1">
                      {addr.isDefault && <StarIcon className="w-5 h-5 text-yellow-400" />}
                      <p className="font-bold text-slate-100">{addr.label}</p>
                   </div>
                   <p className="text-sm text-slate-400">{addr.address}</p>
                </div>
                <div className="flex gap-2 -mr-2">
                   <button onClick={() => handleEdit(addr)} className="p-2 text-slate-400 hover:text-cyan-400 transition-colors" aria-label="Edit address"><PencilIcon /></button>
                   <button onClick={() => handleDelete(addr.id)} className="p-2 text-slate-400 hover:text-red-400 transition-colors" aria-label="Delete address"><TrashIcon /></button>
                </div>
              </div>
              {!addr.isDefault && (
                <button onClick={() => handleSetDefault(addr.id)} className="text-sm text-cyan-400 hover:text-cyan-300 font-semibold mt-3 pt-3 border-t border-slate-700 w-full text-left">
                    Set as Default
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10 px-4 bg-slate-800 rounded-lg">
            <p className="text-slate-400">No delivery addresses saved.</p>
            <p className="text-sm text-slate-500">Add an address for your first order.</p>
          </div>
        )}
      </div>

       <button onClick={() => { setEditingAddress(null); setView('form'); }} className="w-full flex items-center justify-center gap-2 bg-cyan-500/10 border border-cyan-500 text-cyan-300 font-bold py-3 rounded-lg hover:bg-cyan-500/20 transition-colors">
        <PlusIcon />
        Add New Address
      </button>

    </div>
  );
};

export default DeliveryAddressesScreen;
