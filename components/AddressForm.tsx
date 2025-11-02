
import React, { useState } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import LocationMarkerIcon from './icons/LocationMarkerIcon';

export interface Address {
  id: number;
  label: string;
  address: string;
  isDefault: boolean;
}

const AddressForm: React.FC<{
  address: Address | null;
  onSave: (address: Omit<Address, 'id' | 'isDefault'>) => void;
  onCancel: () => void;
  title: string;
  submitButtonText?: string;
  showCancelButton?: boolean;
}> = ({ address, onSave, onCancel, title, submitButtonText = 'Save Address', showCancelButton = true }) => {
  const [label, setLabel] = useState(address?.label || '');
  const [addressLine, setAddressLine] = useState(address?.address || '');
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (label && addressLine) {
      onSave({ label, address: addressLine });
    }
  };
  
  const handleUseGPS = () => {
    setIsFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
        (position) => {
            setTimeout(() => {
                setAddressLine(`Near Lat: ${position.coords.latitude.toFixed(4)}, Lon: ${position.coords.longitude.toFixed(4)}`);
                setIsFetchingLocation(false);
            }, 1000);
        },
        (error) => {
            console.error(`Geolocation error (${error.code}): ${error.message}`);
            let userMessage = "Could not get your location. Please check your device settings.";
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    userMessage = "Location access was denied. Please enable it in your browser settings to use this feature.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    userMessage = "Location information is currently unavailable. Please try again later.";
                    break;
                case error.TIMEOUT:
                    userMessage = "The request to get your location timed out. Please try again.";
                    break;
            }
            alert(userMessage);
            setIsFetchingLocation(false);
        }
    );
  };

  const inputClasses = "w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors";
  const labelClasses = "block text-sm font-medium text-slate-400 mb-1";
  
  return (
      <div className="p-4 animate-fade-in">
        <header className="flex items-center mb-6 relative h-8">
          {showCancelButton && (
            <button onClick={onCancel} className="p-2 -ml-2 absolute left-0">
              <ChevronLeftIcon />
            </button>
          )}
          <h1 className="text-xl font-bold text-slate-100 flex-grow text-center">{title}</h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <button 
                    type="button"
                    onClick={handleUseGPS}
                    disabled={isFetchingLocation}
                    className="w-full flex items-center justify-center gap-2 border border-orange-500 text-orange-400 font-bold py-3 rounded-lg hover:bg-orange-500/10 transition-colors disabled:opacity-50 disabled:cursor-wait"
                >
                    <LocationMarkerIcon />
                    {isFetchingLocation ? 'Fetching Location...' : 'Use Current Location'}
                </button>
            </div>
            <div className="relative flex items-center">
                <div className="flex-grow border-t border-slate-700"></div>
                <span className="flex-shrink mx-4 text-slate-500 text-sm">OR</span>
                <div className="flex-grow border-t border-slate-700"></div>
            </div>
             <div>
                <label htmlFor="address" className={labelClasses}>Address</label>
                <textarea
                    id="address"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className={inputClasses}
                    rows={3}
                    placeholder="e.g., 123 Main Street, Ikeja"
                    required
                />
            </div>
            <div>
                <label htmlFor="label" className={labelClasses}>Label</label>
                <input
                    id="label"
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className={inputClasses}
                    placeholder="e.g., Home, Work"
                    required
                />
            </div>
            <div className="pt-4">
                <button type="submit" className="w-full bg-cyan-500 text-slate-900 font-bold py-3 rounded-lg transition-all duration-300 hover:bg-cyan-400">
                    {submitButtonText}
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddressForm;
