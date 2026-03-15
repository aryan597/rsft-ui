import React from 'react';

interface ToggleProps {
  isActive: boolean;
  onToggle: () => void;
}

export default function Toggle({ isActive, onToggle }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="relative w-14 h-7 rounded-full p-1 transition-colors duration-300"
      style={{
        backgroundColor: isActive ? '#000000' : '#E5E7EB',
      }}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-300 ${
          isActive ? 'translate-x-7' : 'translate-x-0'
        }`}
      />
    </button>
  );
}