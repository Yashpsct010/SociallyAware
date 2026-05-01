import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useJourney } from '../context/JourneyContext';
import { CheckCircle, MapPin, FileText, Share2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { TermTooltip } from '../components/ui/TermTooltip';
import { useTranslation } from 'react-i18next';

export function SummaryPage() {
  const navigate = useNavigate();
  const { journeyData, resetJourney } = useJourney();
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const { t } = useTranslation();

  const toggleTask = (id) => {
    setCompletedTasks(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const handleStartOver = () => {
    resetJourney();
    navigate('/');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'My Indian Election Journey',
      text: 'I just completed my personalized voting readiness checklist for the Indian Elections! Check it out and get ready to vote.',
      url: window.location.origin,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const timelineItems = [
    {
      id: 'reg',
      date: t('summary.action_1'),
      title: journeyData.registration === 'not_registered'
        ? t('summary.task_reg_not')
        : journeyData.registration === 'registered_moved'
        ? t('summary.task_reg_moved')
        : t('summary.task_reg_current'),
      description: journeyData.registration === 'registered_current'
        ? t('summary.task_reg_current_desc')
        : journeyData.registration === 'registered_moved'
        ? t('summary.task_reg_moved_desc')
        : t('summary.task_reg_not_desc'),
      icon: FileText,
    },
    {
      id: 'epic',
      date: t('summary.action_2'),
      title: t('summary.task_epic'),
      description: t('summary.task_epic_desc'),
      icon: CheckCircle,
    },
    {
      id: 'booth',
      date: t('summary.action_3'),
      title: journeyData.method === 'home_voting' ? t('summary.task_home_title') : t('summary.task_booth_title'),
      description: journeyData.method === 'home_voting'
        ? t('summary.task_home_desc')
        : `${t('summary.task_booth_desc')} ${journeyData.location || ''}.`,
      icon: MapPin,
    }
  ];

  const score = Math.round((completedTasks.length / timelineItems.length) * 100);

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-claude bg-surface-raised border border-surface-border flex items-center justify-center">
            <span className="text-base font-bold text-ink">{score}%</span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink tracking-tight">{t('summary.heading')}</h2>
            <p className="text-ink-muted text-sm">{t('summary.subtitle')}</p>
          </div>
        </div>
        {/* Score bar */}
        <div className="w-full bg-surface-border h-[2px] rounded-full">
          <motion.div
            className="bg-primary h-[2px] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2 mb-10">
        {timelineItems.map((item, index) => {
          const isDone = completedTasks.includes(item.id);
          const Icon = item.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              key={item.id}
              className={`p-4 rounded-claude border transition-all cursor-pointer flex gap-3 group ${
                isDone
                  ? 'border-surface-border bg-surface-raised opacity-70'
                  : 'border-surface-border bg-white hover:border-ink-faint'
              }`}
              onClick={() => toggleTask(item.id)}
            >
              {/* Checkbox */}
              <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all ${
                isDone ? 'border-primary bg-primary text-white' : 'border-surface-border group-hover:border-ink-faint'
              }`}>
                {isDone && <CheckCircle size={12} strokeWidth={2.5} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium text-ink-faint uppercase tracking-wider">{item.date}</span>
                </div>
                <h3 className={`text-sm font-semibold ${isDone ? 'text-ink-faint line-through' : 'text-ink'}`}>{item.title}</h3>
                <p className="text-xs text-ink-muted leading-relaxed mt-0.5">{item.description}</p>
              </div>
              <div className={`flex-shrink-0 p-1.5 rounded-lg self-start mt-0.5 ${isDone ? 'text-ink-faint' : 'text-ink-faint'}`}>
                <Icon size={13} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Celebration */}
      {score === 100 && (
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-primary/8 border border-primary/20 text-ink p-4 rounded-claude text-sm mb-6"
        >
          <span className="font-semibold text-primary">{t('summary.celebration_title')}</span>{' '}
          {t('summary.celebration_text')} <TermTooltip term={t('summary.elections')} query="Elections_in_India" /> {t('summary.celebration_end')}
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 mt-auto pt-6 border-t border-surface-border">
        <Button variant="outline" onClick={handleStartOver} className="flex items-center gap-1.5">
          <RotateCcw size={13} /> {t('summary.btn_restart')}
        </Button>
        <Button variant="primary" onClick={handleShare} className="flex items-center gap-1.5">
          <Share2 size={13} />
          {isCopied ? 'Copied!' : t('summary.btn_share')}
        </Button>
      </div>
    </div>
  );
}
