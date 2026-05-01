import React from 'react';

export function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-ink-faint uppercase tracking-widest">
          {currentStep} / {totalSteps}
        </span>
        <span className="text-xs text-ink-faint">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      <div className="w-full bg-surface-border h-[2px] rounded-full">
        <div
          className="bg-primary h-[2px] rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}
