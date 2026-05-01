import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator } from '../components/ui/StepIndicator';
import { Button } from '../components/ui/Button';
import { useJourney } from '../context/JourneyContext';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TermTooltip } from '../components/ui/TermTooltip';
import { useTranslation } from 'react-i18next';

export function BallotSimulatorStep() {
  const navigate = useNavigate();
  const { updateJourney } = useJourney();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showVVPAT, setShowVVPAT] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { t } = useTranslation();

  const handleNext = () => {
    updateJourney('ballotExperience', true);
    navigate('/summary');
  };

  const candidates = [
    { id: '1', name: 'Aarav Patel', symbol: '🌻' },
    { id: '2', name: 'Priya Sharma', symbol: '🚲' },
    { id: '3', name: t('ballot.nota'), symbol: '🚫', isNota: true }
  ];

  const handleVote = (candidateId) => {
    if (showVVPAT || isFinished) return;
    setSelectedCandidate(candidateId);
    setShowVVPAT(true);
    setTimeout(() => {
      setShowVVPAT(false);
      setIsFinished(true);
    }, 4000);
  };

  const selectedData = candidates.find(c => c.id === selectedCandidate);

  return (
    <div className="flex flex-col w-full">
      <StepIndicator currentStep={5} totalSteps={5} />
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          {t('ballot.heading')} <TermTooltip term={t('ballot.evm')} query="Electronic_voting_in_India" />
        </h2>
        <p className="text-gray-600 text-lg">
          {t('ballot.subtitle')} <TermTooltip term={t('ballot.vvpat')} query="Voter-verified_paper_audit_trail" /> {t('ballot.subtitle_end')}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8 relative">
        {/* EVM Ballot Unit */}
        <div className="flex-1 bg-[#d9e2e8] rounded-xl border-4 border-gray-400 p-4 shadow-xl relative overflow-hidden">
          <div className="bg-gray-800 text-white text-center py-1 mb-4 rounded text-sm tracking-widest font-mono">
            {t('ballot.label_unit')}
          </div>
          <div className="space-y-3">
            {candidates.map((c) => (
              <div key={c.id} className="flex items-center gap-2 bg-white border border-gray-300 p-2 rounded">
                <div className="w-8 font-bold text-center text-gray-600 border-r border-gray-300 pr-2">{c.id}</div>
                <div className="flex-1 font-bold">{c.name}</div>
                <div className="w-12 h-12 flex items-center justify-center text-2xl border-l border-gray-300 pl-2">{c.symbol}</div>
                <button
                  onClick={() => handleVote(c.id)}
                  disabled={showVVPAT || isFinished}
                  className={`w-12 h-12 rounded-full border-4 border-blue-900 flex-shrink-0 transition-all ml-4 ${showVVPAT || isFinished ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-800 active:scale-95 shadow-md'}`}
                />
                <div className={`w-4 h-4 rounded-full ml-2 border border-gray-400 ${selectedCandidate === c.id && showVVPAT ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]' : 'bg-red-900'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* VVPAT Unit */}
        <div className="w-full md:w-48 bg-[#e8e8e8] rounded-xl border-4 border-gray-400 p-4 flex flex-col items-center shadow-xl">
          <div className="bg-gray-800 text-white w-full text-center py-1 mb-4 rounded text-sm font-mono">
            {t('ballot.label_vvpat')}
          </div>
          <div className="w-full h-48 bg-black rounded-lg border-4 border-gray-600 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-2 border-2 border-gray-700 rounded bg-gray-900 flex items-center justify-center overflow-hidden">
              <AnimatePresence>
                {showVVPAT && selectedData && (
                  <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-32 bg-white flex flex-col items-center justify-center border border-gray-300 shadow-inner"
                  >
                    <span className="text-xs font-mono">{selectedData.id}</span>
                    <span className="font-bold text-sm text-center px-1 leading-tight">{selectedData.name}</span>
                    <span className="text-3xl mt-1">{selectedData.symbol}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              {showVVPAT && <div className="absolute inset-0 bg-yellow-200 mix-blend-overlay opacity-30"></div>}
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500 text-center font-semibold">{t('ballot.vvpat_hint')}</div>
        </div>
      </div>

      <AnimatePresence>
        {isFinished && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-start gap-4 mb-6"
          >
            <div className="mt-1 bg-green-100 p-1 rounded-full"><Check size={20} /></div>
            <div>
              <h4 className="font-bold text-lg">{t('ballot.success_title')}</h4>
              <p className="text-sm">
                {t('ballot.success_text')} <TermTooltip term={t('ballot.nota_link')} query="None_of_the_above" /> {t('ballot.success_text_end')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
        <Button variant="outline" onClick={() => navigate('/step-4')}>{t('ballot.btn_back')}</Button>
        <Button variant="primary" onClick={handleNext} disabled={!isFinished} className={!isFinished ? 'opacity-50 cursor-not-allowed' : ''}>
          {t('ballot.btn_next')}
        </Button>
      </div>
    </div>
  );
}
