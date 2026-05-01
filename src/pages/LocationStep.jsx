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
        <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">{t('location.heading')}</h2>
        <p className="text-gray-600 text-lg">
          {t('location.subtitle')} <TermTooltip term={t('location.eci')} query="Election_Commission_of_India" />{t('location.subtitle_end')} <TermTooltip term={t('location.constituency')} query="Electoral_district" /> {t('location.constituency_end')}
        </p>
      </div>
      <div className="mb-10 w-full max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">{t('location.label')}</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="text-gray-400" size={20} />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-4 text-base border-2 border-gray-200 focus:outline-none focus:ring-primary focus:border-primary sm:text-lg rounded-xl transition-colors appearance-none bg-white"
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
      <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
        <Button variant="outline" onClick={() => navigate('/')}>{t('location.btn_back')}</Button>
        <Button variant="primary" onClick={handleNext} disabled={!selectedState} className={!selectedState ? 'opacity-50 cursor-not-allowed' : ''}>
          {t('location.btn_next')}
        </Button>
      </div>
    </div>
  );
}
