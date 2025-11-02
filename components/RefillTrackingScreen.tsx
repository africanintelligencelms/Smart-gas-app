
import React, { useState, useEffect } from 'react';
import TruckIcon from './icons/TruckIcon';
import MapPinIcon from './icons/MapPinIcon';
import PhoneIcon from './icons/PhoneIcon';

const MapView: React.FC = () => {
    // This is a placeholder for an interactive map.
    // It will be a static SVG with animated elements to simulate movement.
    const [truckPosition, setTruckPosition] = useState({ x: 20, y: 80 });

    useEffect(() => {
        const interval = setInterval(() => {
            setTruckPosition(prev => ({
                x: prev.x < 75 ? prev.x + 5 : 75,
                y: prev.y > 25 ? prev.y - 5 : 25,
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-64 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Roads */}
                <path d="M 0 90 L 30 90 L 30 60 L 60 60 L 60 30 L 90 30" stroke="#475569" strokeWidth="4" fill="none" />
                <path d="M 10 0 L 10 100" stroke="#475569" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path d="M 50 0 L 50 100" stroke="#475569" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                <path d="M 0 50 L 100 50" stroke="#475569" strokeWidth="2" fill="none" strokeDasharray="4 4" />

                {/* User Location */}
                <g transform="translate(80, 20)">
                    <MapPinIcon className="w-8 h-8 text-cyan-400" />
                    <text x="-12" y="15" fill="#cyan-400" fontSize="5">You</text>
                </g>

                {/* Truck Location (animated) */}
                <g transform={`translate(${truckPosition.x}, ${truckPosition.y})`} style={{ transition: 'transform 2s linear' }}>
                    <TruckIcon className="w-10 h-10 text-orange-500" />
                </g>
            </svg>
        </div>
    );
};

const RefillTrackingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [eta, setEta] = useState(25);
    const [proximityAlert, setProximityAlert] = useState<string | null>(null);

    useEffect(() => {
        const etaInterval = setInterval(() => {
            setEta(prev => {
                if (prev > 1) {
                    return prev - 1;
                }
                clearInterval(etaInterval);
                setProximityAlert("Driver has arrived!");
                return 0;
            });
        }, 3000); // Update ETA every 3 seconds for demo

        const proximityTimeout = setTimeout(() => {
            setProximityAlert("Your driver is 5 minutes away!");
        }, 15000); // Show alert after 15 seconds

        return () => {
            clearInterval(etaInterval);
            clearTimeout(proximityTimeout);
        };
    }, []);


    return (
        <div className="p-4 flex flex-col h-full">
            <header className="mb-4">
                <h1 className="text-2xl font-bold text-slate-100">Tracking Your Refill</h1>
                <p className="text-slate-400">Your gas is on the way!</p>
            </header>

            <MapView />

            <div className="my-6 text-center">
                <p className="text-slate-400 text-sm">Estimated Time of Arrival</p>
                <p className="text-5xl font-bold text-orange-500">{eta > 0 ? `${eta} mins` : 'Arrived'}</p>
            </div>

            {proximityAlert && (
                 <div className="bg-cyan-500/10 border border-cyan-500 text-cyan-300 p-3 rounded-lg flex items-center justify-center gap-3 shadow-lg shadow-cyan-900/30 mb-6">
                    <span className="font-semibold">{proximityAlert}</span>
                 </div>
            )}
            
            <div className="flex-grow"></div>
            
            <div className="space-y-4 pb-4">
                <button className="w-full flex items-center justify-center gap-2 bg-slate-700 text-white font-bold py-4 rounded-lg transition-colors duration-300 hover:bg-slate-600">
                    <PhoneIcon className="w-5 h-5" />
                    Contact Driver
                </button>
                {eta === 0 && (
                     <button 
                        onClick={onComplete}
                        className="w-full bg-green-500 text-slate-900 font-bold py-4 rounded-lg transition-colors duration-300 hover:bg-green-400"
                     >
                        Mark as Received
                    </button>
                )}
            </div>
        </div>
    );
};

export default RefillTrackingScreen;
