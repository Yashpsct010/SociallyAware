import React from 'react';
import { motion } from 'framer-motion';

export function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-claude transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary/40 disabled:opacity-50";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark border border-primary-dark/20 shadow-warm",
    secondary: "bg-surface-raised text-ink hover:bg-surface-border border border-surface-border shadow-warm",
    outline: "bg-transparent text-ink-muted hover:text-ink hover:bg-surface-raised border border-surface-border",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
