
import React from 'react';
import AddressForm from '../AddressForm';
import { Address } from '../AddressForm';

const Step2AddAddress: React.FC<{
  onNext: (data: Omit<Address, 'id' | 'isDefault'>) => void;
  onBack: () => void;
}> = ({ onNext, onBack }) => {

  const handleSave = (data: Omit<Address, 'id' | 'isDefault'>) => {
    console.log("Address saved in onboarding:", data);
    onNext(data);
  };
  
  return (
    <div className="animate-fade-in">
        <AddressForm
            address={null}
            onSave={handleSave}
            onCancel={onBack}
            title="Add Your Delivery Address"
            submitButtonText="Continue"
        />
    </div>
  );
};

export default Step2AddAddress;
