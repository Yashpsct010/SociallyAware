import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../components/ui/StepIndicator';
import { OptionCard } from '../components/ui/OptionCard';
import { Button } from '../components/ui/Button';
import { useJourney } from '../context/JourneyContext';
import { UserX, UserCheck, MapPin } from 'lucide-react';
import { TermTooltip } from '../components/ui/TermTooltip';
import { useTranslation } from 'react-i18next';

export function RegistrationStep() {
  const navigate = useNavigate();
  const { journeyData, updateJourney } = useJourney();
  const [selectedStatus, setSelectedStatus] = useState(journeyData.registration || '');
  const { t } = useTranslation();

  const handleNext = () => {
    if (selectedStatus) {
      updateJourney('registration', selectedStatus);
      navigate('/step-4');
    }
  };

  const options = [
    { id: 'not_registered', title: t('registration.opt_not_title'), description: t('registration.opt_not_desc'), icon: UserX },
    { id: 'registered_moved', title: t('registration.opt_moved_title'), description: t('registration.opt_moved_desc'), icon: MapPin },
    { id: 'registered_current', title: t('registration.opt_current_title'), description: t('registration.opt_current_desc'), icon: UserCheck },
  ];

  const renderSubtitle = () => {
    if (journeyData.persona === 'nri') {
      return (
        <span className="text-primary-dark bg-blue-50 px-2 py-1 rounded">
          {t('registration.subtitle_nri')} <strong>{t('registration.subtitle_nri_form')}</strong> {t('registration.subtitle_nri_end')}
        </span>
      );
    }
    if (journeyData.persona === 'first_time') {
      return (
        <span className="text-primary-dark bg-blue-50 px-2 py-1 rounded">
          {t('registration.subtitle_first')} <strong>{t('registration.subtitle_first_form')}</strong> {t('registration.subtitle_first_mid')} <TermTooltip term={t('registration.epic')} query="Voter_ID_card_(India)" /> {t('registration.subtitle_first_end')}
        </span>
      );
    }
    return t('registration.subtitle_default');
  };

  return (
    <div className="flex flex-col w-full">
      <StepIndicator currentStep={3} totalSteps={5} />
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          {t('registration.heading')} <TermTooltip term={t('registration.electoral_roll')} query="Electoral_roll" />?
        </h2>
        <p className="text-gray-600 text-lg">{renderSubtitle()}</p>
      </div>
      <div className="space-y-4 mb-10">
        {options.map((option) => (
          <OptionCard key={option.id} title={option.title} description={option.description} icon={option.icon} isSelected={selectedStatus === option.id} onClick={() => setSelectedStatus(option.id)} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
        <Button variant="outline" onClick={() => navigate('/step-2')}>{t('registration.btn_back')}</Button>
        <Button variant="primary" onClick={handleNext} disabled={!selectedStatus} className={!selectedStatus ? 'opacity-50 cursor-not-allowed' : ''}>
          {t('registration.btn_next')}
        </Button>
      </div>
    </div>
  );
}
