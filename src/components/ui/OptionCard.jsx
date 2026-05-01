import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function OptionCard({ title, description, icon: Icon, isSelected, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`relative w-full p-6 text-left border-2 rounded-xl transition-all duration-200 flex items-start gap-4 ${
        isSelected 
          ? 'border-primary bg-blue-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      <div className={`p-3 rounded-full flex-shrink-0 ${isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
        {Icon && <Icon size={24} />}
      </div>
      <div className="flex-1">
        <h3 className={`text-lg font-semibold mb-1 ${isSelected ? 'text-primary-dark' : 'text-gray-900'}`}>
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-500 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {isSelected && (
        <div className="absolute top-6 right-6 text-primary">
          <CheckCircle2 size={24} />
        </div>
      )}
    </motion.button>
  );
}
