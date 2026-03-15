import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-black dark:border-white rounded-full animate-[spin_1s_linear_infinite]" />
        <div className="absolute top-0 left-0 w-full h-full border-4 border-black dark:border-white rounded-full animate-[spin_1s_linear_infinite_reverse]" />
      </div>
    </div>
  );
}