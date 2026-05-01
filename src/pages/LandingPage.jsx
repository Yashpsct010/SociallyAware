import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Map, MapPin, Vote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    { Icon: MapPin, title: t('landing.feature_1_title'), desc: t('landing.feature_1_desc') },
    { Icon: Map, title: t('landing.feature_2_title'), desc: t('landing.feature_2_desc') },
    { Icon: Vote, title: t('landing.feature_3_title'), desc: t('landing.feature_3_desc') },
  ];

  return (
    <div className="flex flex-col flex-1 py-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6 border border-primary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
          Indian Election Assistant
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold text-ink mb-3 leading-tight tracking-tight">
          {t('landing.title_start')}{' '}
          <span className="text-primary">{t('landing.title_highlight')}</span>
        </h1>

        <p className="text-ink-muted text-base leading-relaxed max-w-md mb-8">
          {t('landing.subtitle')}
        </p>

        <Button
          variant="primary"
          onClick={() => navigate('/step-1')}
          className="px-5 py-2.5 text-sm"
        >
          {t('landing.btn_start')} →
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="border-t border-surface-border pt-8"
      >
        <p className="text-xs font-medium text-ink-faint uppercase tracking-widest mb-5">What's included</p>
        <div className="space-y-4">
          {features.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="flex items-start gap-3"
            >
              <div className="p-1.5 rounded-lg bg-surface-raised border border-surface-border flex-shrink-0 mt-0.5">
                <Icon size={13} className="text-ink-muted" />
              </div>
              <div>
                <span className="text-sm font-medium text-ink">{title}</span>
                <p className="text-xs text-ink-muted leading-relaxed mt-0.5">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
