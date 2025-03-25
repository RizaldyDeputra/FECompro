import React from 'react';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
  isOpen?: boolean;
}

export function SidebarItem({ icon, text, active = false, onClick, isOpen = true }: SidebarItemProps) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
        active ? 'bg-white/10' : 'hover:bg-white/5'
      } ${!isOpen ? 'justify-center' : ''}`}
    >
      <div className={`transition-transform duration-200 ${!isOpen ? 'transform scale-110' : ''}`}>
        {icon}
      </div>
      {isOpen && <span>{text}</span>}
    </button>
  );
}