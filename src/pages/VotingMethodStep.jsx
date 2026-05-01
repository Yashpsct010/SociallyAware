import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../components/ui/StepIndicator';
import { OptionCard } from '../components/ui/OptionCard';
import { Button } from '../components/ui/Button';
import { useJourney } from '../context/JourneyContext';
import { Building, Home, Mail } from 'lucide-react';
import { TermTooltip } from '../components/ui/TermTooltip';
import { useTranslation } from 'react-i18next';

export function VotingMethodStep() {
  const navigate = useNavigate();
  const { journeyData, updateJourney } = useJourney();
  const [selectedMethod, setSelectedMethod] = useState(journeyData.method || '');
  const { t } = useTranslation();

  const handleNext = () => {
    if (selectedMethod) {
      updateJourney('method', selectedMethod);
      navigate('/step-5');
    }
  };

  const allOptions = [
    { id: 'polling_booth', title: t('method.opt_booth_title'), description: t('method.opt_booth_desc'), icon: Building },
    { id: 'home_voting', title: t('method.opt_home_title'), description: t('method.opt_home_desc'), icon: Home },
    { id: 'service_voter', title: t('method.opt_service_title'), description: t('method.opt_service_desc'), icon: Mail },
  ];

  const availableOptions = allOptions.filter(opt => {
    if (journeyData.persona === 'senior_pwd') return true;
    if (journeyData.persona === 'nri') return opt.id === 'polling_booth';
    return opt.id !== 'home_voting';
  });

  const renderSubtitle = () => {
    if (journeyData.persona === 'senior_pwd') {
      return (
        <span className="text-primary-dark bg-blue-50 px-2 py-1 rounded">
          {t('method.subtitle_senior')} <TermTooltip term={t('method.postal_ballot')} query="Postal_voting_in_India" /> {t('method.subtitle_senior_end')}
        </span>
      );
    }
    if (journeyData.persona === 'nri') {
      return (
        <span className="text-primary-dark bg-blue-50 px-2 py-1 rounded">
          {t('method.subtitle_nri')} <strong>{t('method.subtitle_nri_bold')}</strong> {t('method.subtitle_nri_end')}
        </span>
      );
    }
    return <span>{t('method.subtitle_default')} <TermTooltip term={t('method.evm')} query="Electronic_voting_in_India" />.</span>;
  };

  return (
    <div className="flex flex-col w-full">
      <StepIndicator currentStep={4} totalSteps={5} />
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">{t('method.heading')}</h2>
        <p className="text-gray-600 text-lg">{renderSubtitle()}</p>
      </div>
      <div className="space-y-4 mb-10">
        {availableOptions.map((option) => (
          <OptionCard key={option.id} title={option.title} description={option.description} icon={option.icon} isSelected={selectedMethod === option.id} onClick={() => setSelectedMethod(option.id)} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
        <Button variant="outline" onClick={() => navigate('/step-3')}>{t('method.btn_back')}</Button>
        <Button variant="primary" onClick={handleNext} disabled={!selectedMethod} className={!selectedMethod ? 'opacity-50 cursor-not-allowed' : ''}>
          {t('method.btn_next')}
        </Button>
      </div>
    </div>
  );
}
