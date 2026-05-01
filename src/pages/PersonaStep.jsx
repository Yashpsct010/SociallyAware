import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../components/ui/StepIndicator';
import { OptionCard } from '../components/ui/OptionCard';
import { Button } from '../components/ui/Button';
import { useJourney } from '../context/JourneyContext';
import { UserPlus, Briefcase, Globe, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PersonaStep() {
  const navigate = useNavigate();
  const { journeyData, updateJourney } = useJourney();
  const [selectedPersona, setSelectedPersona] = useState(journeyData.persona || '');
  const { t } = useTranslation();

  const handleNext = () => {
    if (selectedPersona) {
      updateJourney('persona', selectedPersona);
      navigate('/step-3');
    }
  };

  const options = [
    { id: 'first_time', title: t('persona.opt_first_title'), description: t('persona.opt_first_desc'), icon: UserPlus },
    { id: 'migrant_student', title: t('persona.opt_migrant_title'), description: t('persona.opt_migrant_desc'), icon: Briefcase },
    { id: 'nri', title: t('persona.opt_nri_title'), description: t('persona.opt_nri_desc'), icon: Globe },
    { id: 'senior_pwd', title: t('persona.opt_senior_title'), description: t('persona.opt_senior_desc'), icon: Users },
    { id: 'regular', title: t('persona.opt_regular_title'), description: t('persona.opt_regular_desc'), icon: Users },
  ];

  return (
    <div className="flex flex-col w-full">
      <StepIndicator currentStep={2} totalSteps={5} />
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-ink mb-2 tracking-tight">{t('persona.heading')}</h2>
        <p className="text-ink-muted text-sm leading-relaxed">{t('persona.subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 gap-2.5 mb-10">
        {options.map((option) => (
          <OptionCard key={option.id} title={option.title} description={option.description} icon={option.icon} isSelected={selectedPersona === option.id} onClick={() => setSelectedPersona(option.id)} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-surface-border">
        <Button variant="outline" onClick={() => navigate('/step-1')}>{t('persona.btn_back')}</Button>
        <Button variant="primary" onClick={handleNext} disabled={!selectedPersona}>
          {t('persona.btn_next')} →
        </Button>
      </div>
    </div>
  );
}
