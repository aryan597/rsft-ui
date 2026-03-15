import React from 'react';
import { motion } from 'framer-motion';

interface AnalysisStageProps {
  stage: number;
  currentStage: number;
  text: string;
  emoji: string;
}

export default function AnalysisStage({ stage, currentStage, text, emoji }: AnalysisStageProps) {
  const isActive = stage === currentStage;
  const isComplete = stage < currentStage;
  const isVisible = stage <= currentStage;

  return (
    <div 
      className={`transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, rotateX: 90, y: 20 }}
        animate={{ 
          opacity: 1, 
          rotateX: 0, 
          y: 0,
          x: isComplete ? [0, -20, -20] : 0,
          scale: isComplete ? 0.95 : 1
        }}
        transition={{ 
          delay: stage * 0.3,
          duration: 0.8,
          ease: "easeInOut"
        }}
        className={`
          relative flex items-center p-4 
          ${isComplete ? 'ml-8 rounded-tr-xl rounded-br-xl rounded-bl-xl' : 'rounded-lg'}
          ${isActive ? 'bg-blue-500 shadow-lg shadow-blue-500/30' : 
            isComplete ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-800'}
          transform-gpu perspective-1000
          transition-all duration-500 ease-in-out
          hover:shadow-lg
        `}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="mr-4 transform-gpu transition-transform duration-300">
          {isComplete ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          ) : isActive ? (
            <motion.div
              animate={{ 
                rotateY: [0, 360],
                rotateX: [0, 360],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
              className="w-6 h-6 bg-white dark:bg-blue-400"
              style={{
                transformStyle: 'preserve-3d',
              }}
            />
          ) : (
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700" />
          )}
        </div>

        <div className="flex-1">
          <p className={`font-medium ${
            isActive ? 'text-white' : 
            isComplete ? 'text-gray-600 dark:text-gray-300' : 
            'text-gray-500 dark:text-gray-400'
          }`}>
            {text}
          </p>
        </div>

        <motion.div 
          className="ml-2 text-xl"
          animate={isActive ? { 
            rotateY: [0, 360],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{ 
            duration: 2,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut",
            repeatType: "loop"
          }}
        >
          {emoji}
        </motion.div>
      </motion.div>
    </div>
  );
}