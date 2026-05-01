import React from 'react';

export function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}
