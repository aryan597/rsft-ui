import React, { useEffect } from 'react';
import { X, CheckCircle, Mail } from 'lucide-react';

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black dark:bg-white opacity-50"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl transform transition-all duration-500 ease-in-out">
        <div className="animate-modal-entry bg-white dark:bg-gray-800 border-4 border-black dark:border-white p-8 m-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-black dark:text-white hover:scale-110 transition-transform"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center space-y-6 p-6">
            <CheckCircle className="w-24 h-24 text-green-600 dark:text-green-400 animate-bounce" />
            <div className="text-center">
              <h2 className="font-mono text-4xl font-bold text-black dark:text-white mb-4">
                CONGRATULATIONS!
              </h2>
              <p className="font-mono text-xl text-black dark:text-white">
                Your resume report is ready.
                <br />
                Please check your email for the detailed analysis.
              </p>
            </div>
            <Mail className="w-12 h-12 text-black dark:text-white animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}