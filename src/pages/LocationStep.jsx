import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../components/ui/StepIndicator';
import { Button } from '../components/ui/Button';
import { useJourney } from '../context/JourneyContext';
import { MapPin } from 'lucide-react';
import { TermTooltip } from '../components/ui/TermTooltip';
import { useTranslation } from 'react-i18next';

export function LocationStep() {
  const navigate = useNavigate();
  const { journeyData, updateJourney } = useJourney();
  const [selectedState, setSelectedState] = useState(journeyData.location || '');
  const { t } = useTranslation();

  const statesAndUTs = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi (NCT)", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const handleNext = () => {
    if (selectedState) {
      updateJourney('location', selectedState);
      navigate('/step-2');
    }
  };

  return (
    <div className="flex flex-col w-full">
      <StepIndicator currentStep={1} totalSteps={5} />
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-ink mb-2 tracking-tight">{t('location.heading')}</h2>
        <p className="text-ink-muted text-sm leading-relaxed">
          {t('location.subtitle')} <TermTooltip term={t('location.eci')} query="Election_Commission_of_India" />{t('location.subtitle_end')} <TermTooltip term={t('location.constituency')} query="Electoral_district" /> {t('location.constituency_end')}
        </p>
      </div>
      <div className="mb-10 w-full max-w-sm">
        <label className="block text-xs font-medium text-ink-faint mb-2 uppercase tracking-wider">{t('location.label')}</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="text-ink-faint" size={15} />
          </div>
          <select
            className="block w-full pl-9 pr-3 py-2.5 text-sm border border-surface-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 rounded-claude transition-all appearance-none bg-white text-ink"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="" disabled>{t('location.placeholder')}</option>
            {statesAndUTs.sort().map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-surface-border">
        <Button variant="outline" onClick={() => navigate('/')}>{t('location.btn_back')}</Button>
        <Button variant="primary" onClick={handleNext} disabled={!selectedState}>
          {t('location.btn_next')} →
        </Button>
      </div>
    </div>
  );
}
