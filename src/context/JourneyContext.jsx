import React, { createContext, useContext, useState } from 'react';

const JourneyContext = createContext();

export function useJourney() {
  return useContext(JourneyContext);
}

export function JourneyProvider({ children }) {
  const [journeyData, setJourneyData] = useState({
    location: '',
    persona: '',
    registration: '',
    method: '',
    ballotExperience: false
  });

  const updateJourney = (key, value) => {
    setJourneyData(prev => ({ ...prev, [key]: value }));
  };

  const resetJourney = () => {
    setJourneyData({
      location: '',
      persona: '',
      registration: '',
      method: '',
      ballotExperience: false
    });
  };

  return (
    <JourneyContext.Provider value={{ journeyData, updateJourney, resetJourney }}>
      {children}
    </JourneyContext.Provider>
  );
}
