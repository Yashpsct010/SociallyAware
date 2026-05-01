import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function OptionCard({ title, description, icon: Icon, isSelected, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`relative w-full p-4 text-left border rounded-claude transition-all duration-150 flex items-start gap-3 group ${
        isSelected
          ? 'border-primary/40 bg-primary/5'
          : 'border-surface-border bg-white hover:border-ink-faint hover:bg-surface-raised'
      }`}
    >
      <div className={`p-2 rounded-lg flex-shrink-0 mt-0.5 ${isSelected ? 'bg-primary/10 text-primary' : 'bg-surface-raised text-ink-faint group-hover:text-ink-muted'}`}>
        {Icon && <Icon size={16} />}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-semibold leading-tight mb-0.5 ${isSelected ? 'text-ink' : 'text-ink'}`}>
          {title}
        </h3>
        {description && (
          <p className="text-xs text-ink-muted leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className={`flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 transition-all ${isSelected ? 'border-primary bg-primary text-white' : 'border-surface-border'}`}>
        {isSelected && <Check size={10} strokeWidth={3} />}
      </div>
    </motion.button>
  );
}
