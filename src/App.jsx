import { useState } from 'react'
import Settings from './components/Settings';
import { createCardsArray } from './components/Settings';

import './App.css'

import MultiPlayerBoard from './components/MultiPlayerBoard';
import SoloPlayerBoard from './components/SoloPlayerBoard';

function App() {
  const [started, setStarted] = useState(false);
  const [settings, setSettings] = useState(null);
  const [cards, setCards] = useState([]);

  const handleStart = (s) => {
    setSettings(s);
    setCards(s.cards);
    setStarted(true);
  };

  const handleResetToSettings = () => {
    setStarted(false);
    setSettings(null);
    setCards([]);
  };

  const appStyle = {
    backgroundColor: started ? 'var(--blue-950)' : 'var(--grey-50)',
    minHeight: '100vh',
    };  

  return(
    <>
      {!started && <Settings onStart={handleStart} style={{backgroundColor:'#ff2233'}}/>}

      {started && settings && settings.players === 1 && (
        <SoloPlayerBoard
          cards={cards}
          set4x4={settings.set4x4}
          icons={settings.icons}
          onSetup={handleResetToSettings}
        />
      )}

      {started && settings && settings.players > 1 && (
        <MultiPlayerBoard
          cards={cards}
          set4x4={settings.set4x4}
          icons={settings.icons}
          solo={false}
          playersCount={settings.players}
          onSetup={handleResetToSettings}
        />
      )}
    </>
  )
}

export default App