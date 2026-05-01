import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useJourney } from '../context/JourneyContext';
import { CheckCircle, MapPin, FileText, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { TermTooltip } from '../components/ui/TermTooltip';
import { useTranslation } from 'react-i18next';

export function SummaryPage() {
  const navigate = useNavigate();
  const { journeyData, resetJourney } = useJourney();
  const [completedTasks, setCompletedTasks] = useState([]);
  const { t } = useTranslation();

  const toggleTask = (id) => {
    setCompletedTasks(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const handleStartOver = () => {
    resetJourney();
    navigate('/');
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
      <div className="mb-10 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-blue-100 text-primary rounded-full flex flex-col items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg"
        >
          <span className="text-2xl font-black">{score}%</span>
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">{t('summary.heading')}</h2>
        <p className="text-gray-600 text-lg">{t('summary.subtitle')}</p>
      </div>

      <div className="space-y-4 mb-12">
        {timelineItems.map((item, index) => {
          const isDone = completedTasks.includes(item.id);
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={item.id}
              className={`p-4 md:p-6 rounded-xl border-2 transition-all cursor-pointer flex gap-4 ${isDone ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-blue-300'}`}
              onClick={() => toggleTask(item.id)}
            >
              <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center ${isDone ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 text-transparent'}`}>
                <CheckCircle size={20} />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 mb-1">
                  <span className={`font-bold text-sm uppercase tracking-wider ${isDone ? 'text-green-600' : 'text-primary-dark'}`}>{item.date}</span>
                  <h3 className={`text-xl font-bold ${isDone ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{item.title}</h3>
                </div>
                <p className={`text-sm md:text-base ${isDone ? 'text-gray-500' : 'text-gray-700'}`}>{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {score === 100 && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-primary text-white p-6 rounded-xl text-center mb-8 shadow-xl"
        >
          <h3 className="text-2xl font-bold mb-2">{t('summary.celebration_title')}</h3>
          <p>{t('summary.celebration_text')} <TermTooltip term={t('summary.elections')} query="Elections_in_India" /> {t('summary.celebration_end')}</p>
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-auto">
        <Button variant="outline" onClick={handleStartOver} className="w-full sm:w-auto">{t('summary.btn_restart')}</Button>
        <Button variant="primary" className="w-full sm:w-auto flex items-center justify-center gap-2">
          {t('summary.btn_share')} <Share2 size={18} />
        </Button>
      </div>
    </div>
  );
}
