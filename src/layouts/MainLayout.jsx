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
    <div className="min-h-screen bg-surface text-ink font-sans flex flex-col">
      {/* Header — thin, warm, minimal */}
      <header className="w-full border-b border-surface-border bg-surface/90 backdrop-blur-sm py-3 px-6 md:px-10 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <span className="text-xs font-bold">E</span>
          </div>
          <span className="font-semibold text-sm text-ink tracking-tight">{t('layout.title')}</span>
        </div>

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-claude border border-surface-border hover:bg-surface-raised text-xs font-medium transition-colors text-ink-muted hover:text-ink"
        >
          <Languages size={13} />
          {i18n.language === 'en' ? 'हिंदी' : 'English'}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-5 py-10 md:py-14 flex flex-col relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="w-full flex-1 flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
