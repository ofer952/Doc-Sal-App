import React, { useState } from 'react';
import { Analytics } from "@vercel/analytics/react";
import Home from './screens/Home';
import Simulator from './screens/Simulator';
import Info from './screens/Info';
import Forms from './screens/Forms';

const App = () => {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onNavigate={setCurrentView} />;
      case 'simulator':
        return <Simulator onNavigate={setCurrentView} />;
      case 'info':
        return <Info onBack={() => setCurrentView('home')} />;
      case 'forms':
        return <Forms onBack={() => setCurrentView('home')} />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div style={{ direction: 'rtl', minHeight: '100vh', backgroundColor: '#0D0D12' }}>
      {renderView()}
      <Analytics />
    </div>
  );
};

export default App;