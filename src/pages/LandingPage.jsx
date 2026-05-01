import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Map, MapPin, Flag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center py-12">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="w-24 h-24 bg-blue-100 text-primary rounded-full flex items-center justify-center mb-8 shadow-inner"
      >
        <Flag size={48} />
      </motion.div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
        {t('landing.title_start')} <span className="text-primary">{t('landing.title_highlight')}</span>
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
        {t('landing.subtitle')}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-sm mx-auto">
        <Button 
          variant="primary" 
          onClick={() => navigate('/step-1')} 
          className="w-full text-lg py-4 shadow-lg hover:shadow-xl"
        >
          {t('landing.btn_start')}
        </Button>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-2xl w-full">
        <div className="flex items-start gap-3">
          <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-semibold text-gray-900">{t('landing.feature_1_title')}</h4>
            <p className="text-sm text-gray-500">{t('landing.feature_1_desc')}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Map className="text-primary mt-1 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-semibold text-gray-900">{t('landing.feature_2_title')}</h4>
            <p className="text-sm text-gray-500">{t('landing.feature_2_desc')}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Flag className="text-primary mt-1 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-semibold text-gray-900">{t('landing.feature_3_title')}</h4>
            <p className="text-sm text-gray-500">{t('landing.feature_3_desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
