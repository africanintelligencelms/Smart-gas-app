
import React from 'react';
import { Tab } from '../types';
import HomeIcon from './icons/HomeIcon';
import GasCylinderIcon from './icons/GasCylinderIcon';
import UserIcon from './icons/UserIcon';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  const activeClasses = 'text-orange-500';
  const inactiveClasses = 'text-slate-400';
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-1/3 transition-colors duration-200 ease-in-out ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="absolute bottom-0 left-0 right-0 h-16 bg-slate-800/80 backdrop-blur-sm border-t border-slate-700 flex justify-around items-center">
      <NavItem
        icon={<HomeIcon />}
        label="Dashboard"
        isActive={activeTab === Tab.Dashboard}
        onClick={() => setActiveTab(Tab.Dashboard)}
      />
      <NavItem
        icon={<GasCylinderIcon />}
        label="Refill"
        isActive={activeTab === Tab.Refill}
        onClick={() => setActiveTab(Tab.Refill)}
      />
      <NavItem
        icon={<UserIcon />}
        label="Account"
        isActive={activeTab === Tab.Account}
        onClick={() => setActiveTab(Tab.Account)}
      />
    </nav>
  );
};

export default BottomNav;
