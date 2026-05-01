import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export function MainLayout({ children }) {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-200 selection:text-primary-dark flex flex-col">
      {/* Simple Header */}
      <header className="w-full bg-white border-b border-gray-100 py-4 px-6 md:px-12 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
            E
          </div>
          <span className="font-semibold text-lg text-gray-800 tracking-tight">{t('layout.title')}</span>
        </div>
        
        {/* Language Toggle */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 text-sm font-medium transition-colors text-gray-700"
        >
          <Languages size={16} />
          {i18n.language === 'en' ? 'हिंदी' : 'English'}
        </button>
      </header>
      
      {/* Main Content Area with Page Transitions */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-12 md:py-20 flex flex-col relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full flex-1 flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
