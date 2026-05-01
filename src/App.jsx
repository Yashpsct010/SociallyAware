import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { JourneyProvider } from './context/JourneyContext';
import { MainLayout } from './layouts/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { LocationStep } from './pages/LocationStep';
import { PersonaStep } from './pages/PersonaStep';
import { RegistrationStep } from './pages/RegistrationStep';
import { VotingMethodStep } from './pages/VotingMethodStep';
import { BallotSimulatorStep } from './pages/BallotSimulatorStep';
import { SummaryPage } from './pages/SummaryPage';
import { Chatbot } from './components/ui/Chatbot';

function App() {
  return (
    <JourneyProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/step-1" element={<LocationStep />} />
            <Route path="/step-2" element={<PersonaStep />} />
            <Route path="/step-3" element={<RegistrationStep />} />
            <Route path="/step-4" element={<VotingMethodStep />} />
            <Route path="/step-5" element={<BallotSimulatorStep />} />
            <Route path="/summary" element={<SummaryPage />} />
          </Routes>
          <Chatbot />
        </MainLayout>
      </Router>
    </JourneyProvider>
  );
}

export default App;
