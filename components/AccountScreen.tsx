import React, { useState } from 'react';
import UserIcon from './icons/UserIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import MapPinIcon from './icons/MapPinIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import CogIcon from './icons/CogIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import ChatBubbleIcon from './icons/ChatBubbleIcon';

import ProfileDetailsScreen from './ProfileDetailsScreen';
import PaymentMethodsScreen from './PaymentMethodsScreen';
import DeliveryAddressesScreen from './DeliveryAddressesScreen';
import OrderHistoryScreen from './OrderHistoryScreen';
import SettingsScreen from './SettingsScreen';
import HelpSupportScreen from './HelpSupportScreen';

type AccountSubScreen = 'main' | 'profile' | 'payment' | 'address' | 'history' | 'settings' | 'help';


const MenuItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center text-left py-4 px-4 transition-colors duration-200 ease-in-out hover:bg-slate-700/50"
  >
    <div className="text-orange-400">{icon}</div>
    <span className="flex-grow mx-4 text-slate-200">{label}</span>
    <div className="text-slate-500">
      <ChevronRightIcon />
    </div>
  </button>
);


const AccountScreen: React.FC = () => {
    const [screen, setScreen] = useState<AccountSubScreen>('main');
    const navigateBack = () => setScreen('main');

    if (screen === 'profile') return <ProfileDetailsScreen onBack={navigateBack} />;
    if (screen === 'payment') return <PaymentMethodsScreen onBack={navigateBack} />;
    if (screen === 'address') return <DeliveryAddressesScreen onBack={navigateBack} />;
    if (screen === 'history') return <OrderHistoryScreen onBack={navigateBack} />;
    if (screen === 'settings') return <SettingsScreen onBack={navigateBack} />;
    if (screen === 'help') return <HelpSupportScreen onBack={navigateBack} />;


  const menuItems = [
    {
      label: 'Profile Details',
      icon: <UserIcon className="w-6 h-6" />,
      action: () => setScreen('profile'),
    },
    {
      label: 'Payment Methods',
      icon: <CreditCardIcon className="w-6 h-6" />,
      action: () => setScreen('payment'),
    },
    {
      label: 'Delivery Addresses',
      icon: <MapPinIcon className="w-6 h-6" />,
      action: () => setScreen('address'),
    },
    {
      label: 'Order History',
      icon: <ClipboardListIcon className="w-6 h-6" />,
      action: () => setScreen('history'),
    },
    {
      label: 'Settings',
      icon: <CogIcon className="w-6 h-6" />,
      action: () => setScreen('settings'),
    },
    {
      label: 'In-App Support',
      icon: <ChatBubbleIcon className="w-6 h-6" />,
      action: () => setScreen('help'),
    },
  ];

  return (
    <div className="p-4">
      <header className="mb-6 text-center">
        <div className="w-24 h-24 rounded-full bg-slate-700 mx-auto mb-4 flex items-center justify-center border-4 border-slate-600">
           <img src={`https://i.pravatar.cc/150?u=jane.doe`} alt="User Avatar" className="rounded-full" />
        </div>
        <h1 className="text-2xl font-bold text-slate-100">Jane Doe</h1>
        <p className="text-slate-400">+234 801 234 5678</p>
      </header>

      <div className="bg-slate-800 rounded-lg divide-y divide-slate-700">
        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            onClick={item.action}
          />
        ))}
      </div>

      <div className="mt-8">
        <button className="w-full text-center py-3 px-4 bg-slate-800 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors font-semibold">
            Log Out
        </button>
      </div>
    </div>
  );
};

export default AccountScreen;