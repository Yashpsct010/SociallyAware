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
    { id: '3', name: t('ballot.nota'), symbol: '✗', isNota: true }
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
        <h2 className="text-2xl font-semibold text-ink mb-2 tracking-tight">
          {t('ballot.heading')} <TermTooltip term={t('ballot.evm')} query="Electronic_voting_in_India" />
        </h2>
        <p className="text-ink-muted text-sm leading-relaxed">
          {t('ballot.subtitle')} <TermTooltip term={t('ballot.vvpat')} query="Voter-verified_paper_audit_trail" /> {t('ballot.subtitle_end')}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* EVM Unit */}
        <div className="flex-1 bg-white border border-surface-border rounded-claude overflow-hidden shadow-warm">
          {/* EVM header bar */}
          <div className="bg-ink text-white px-4 py-2 flex items-center justify-between">
            <span className="text-xs font-mono tracking-widest uppercase text-ink-faint/60">Ballot Unit</span>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
              <div className="w-2 h-2 rounded-full bg-primary/80"></div>
            </div>
          </div>
          <div className="p-4 space-y-2">
            {candidates.map((c) => (
              <div key={c.id} className={`flex items-center gap-3 p-3 rounded-claude border transition-all ${
                selectedCandidate === c.id && showVVPAT
                  ? 'border-primary/40 bg-primary/5'
                  : 'border-surface-border bg-surface hover:bg-surface-raised'
              }`}>
                <span className="w-5 text-xs font-mono text-ink-faint text-center">{c.id}</span>
                <span className="text-base">{c.symbol}</span>
                <span className="flex-1 text-sm font-medium text-ink">{c.name}</span>
                {/* Vote button */}
                <button
                  onClick={() => handleVote(c.id)}
                  disabled={showVVPAT || isFinished}
                  className={`w-8 h-8 rounded-claude border-2 transition-all flex-shrink-0 ${
                    showVVPAT || isFinished
                      ? 'border-surface-border bg-surface-raised cursor-not-allowed'
                      : 'border-primary bg-white hover:bg-primary/5 active:bg-primary active:scale-95 cursor-pointer'
                  }`}
                  title="Press to vote"
                />
                {/* LED */}
                <div className={`w-2.5 h-2.5 rounded-full border border-surface-border transition-all ${
                  selectedCandidate === c.id && showVVPAT
                    ? 'bg-primary shadow-[0_0_6px_rgba(217,119,87,0.8)]'
                    : 'bg-surface-raised'
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* VVPAT Unit */}
        <div className="w-full md:w-44 bg-white border border-surface-border rounded-claude overflow-hidden shadow-warm flex flex-col">
          <div className="bg-ink text-white px-4 py-2">
            <span className="text-xs font-mono tracking-widest uppercase text-ink-faint/60">VVPAT</span>
          </div>
          <div className="flex-1 p-3 flex flex-col items-center">
            {/* Screen */}
            <div className="w-full h-40 bg-ink/95 rounded border border-ink/20 relative overflow-hidden flex items-center justify-center mb-3">
              {/* scanlines */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)'
              }} />
              <AnimatePresence>
                {showVVPAT && selectedData && (
                  <motion.div
                    initial={{ y: -80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="w-20 bg-white border border-gray-200 rounded p-2 flex flex-col items-center gap-1 shadow-md z-10"
                  >
                    <span className="text-[9px] font-mono text-gray-400">{selectedData.id}</span>
                    <span className="text-xs font-semibold text-center text-gray-800 leading-tight">{selectedData.name}</span>
                    <span className="text-xl">{selectedData.symbol}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              {!showVVPAT && !isFinished && (
                <span className="text-ink-faint/30 text-xs font-mono">— — —</span>
              )}
              {isFinished && !showVVPAT && (
                <div className="text-center">
                  <Check size={20} className="text-primary mx-auto mb-1" />
                  <span className="text-xs text-ink-faint/50 font-mono">Done</span>
                </div>
              )}
            </div>
            <p className="text-xs text-ink-faint text-center leading-tight">{t('ballot.vvpat_hint')}</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFinished && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/8 border border-primary/20 text-ink p-4 rounded-claude flex items-start gap-3 mb-6"
          >
            <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
              <Check size={11} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-ink mb-0.5">{t('ballot.success_title')}</h4>
              <p className="text-xs text-ink-muted">
                {t('ballot.success_text')} <TermTooltip term={t('ballot.nota_link')} query="None_of_the_above" /> {t('ballot.success_text_end')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mt-auto pt-6 border-t border-surface-border">
        <Button variant="outline" onClick={() => navigate('/step-4')}>{t('ballot.btn_back')}</Button>
        <Button variant="primary" onClick={handleNext} disabled={!isFinished}>
          {t('ballot.btn_next')} →
        </Button>
      </div>
    </div>
  );
}
