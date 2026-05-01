import React from 'react';
import { motion } from 'framer-motion';

export function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "border-transparent text-white bg-primary hover:bg-primary-dark focus:ring-primary",
    secondary: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-primary",
    outline: "border-primary text-primary bg-transparent hover:bg-blue-50 focus:ring-primary"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
