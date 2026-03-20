import './Settings.css'
import logo from '../assets/logo-dark.svg'
import { useState } from 'react';
import { createShuffledDeck } from '../game/gameLogic';

export default function Settings({ onStart }) {
  const [set4x4, setSet4x4] = useState(true);
  const [set6x6, setSet6x6] = useState(false);
  const [icons, setIcons] = useState(true);
  const [players, setPlayers] = useState(1);

  const handleButtonClick = (event) => {
    const clickedButton = event.target;

    if (clickedButton.classList.contains('theme-selector-button')) {
      if (clickedButton.classList.contains('numbers')) {
        setIcons(false);
      } else if (clickedButton.classList.contains('icons')) {
        setIcons(true);
      }
    }

    if (clickedButton.classList.contains('num-of-players-button')) {
      let newPlayers = players;
      if (clickedButton.classList.contains('one')) newPlayers = 1;
      else if (clickedButton.classList.contains('two')) newPlayers = 2;
      else if (clickedButton.classList.contains('three')) newPlayers = 3;
      else if (clickedButton.classList.contains('four')) newPlayers = 4;
      setPlayers(newPlayers);
    }

    if (clickedButton.classList.contains('size-setting-button')) {
      if (clickedButton.classList.contains('4x4')) {
        setSet4x4(true);
        setSet6x6(false);
      } else if (clickedButton.classList.contains('6x6')) {
        setSet6x6(true);
        setSet4x4(false);
      }
    }
  };

  const handleStart = () => {
    const settings = {
      set4x4,
      set6x6,
      icons,
      players,
      cards: createShuffledDeck(set4x4)
    };
    if (typeof onStart === 'function') onStart(settings);
  };

  return (
    <div className='settings'>
      <header>
        <img src={logo} alt='memory game logo-darkblue'/>
      </header>
      <main>
        <section className='theme-selection'>
          <label htmlFor='btns'>Select Theme:</label>
          <div id="btns" className='btns'>
            
            <button type="button" className={`theme-selector-button numbers ${!icons ? 'active' : ''}`.trim()} onClick={handleButtonClick}>Numbers</button>
            <button type="button" className={`theme-selector-button icons ${icons ? 'active' : ''}`.trim()} onClick={handleButtonClick}>Icons</button>
            
          </div>
        </section>

        <section className='players-selection'>
          <label htmlFor='num-of-players'>Number of Players:</label>
          <div id="num-of-players" className='btns'>
            <button type="button" className={`num-of-players-button one ${players === 1 ? 'active' : ''}`.trim()} onClick={handleButtonClick}>1</button>
            <button type="button" className={`num-of-players-button two ${players === 2 ? 'active' : ''}`.trim()} onClick={handleButtonClick}>2</button>
            <button type="button" className={`num-of-players-button three ${players === 3 ? 'active' : ''}`.trim()} onClick={handleButtonClick}>3</button>
            <button type="button" className={`num-of-players-button four ${players === 4 ? 'active' : ''}`.trim()} onClick={handleButtonClick}>4</button>
          </div>
        </section>

        <section className='size-selection'>
          <label htmlFor='size-setting-button'>Grid Size:</label>
          <div id="size-setting-button" className='btns'>
            <button type="button" className={`size-setting-button 4x4 ${set4x4 ? 'active' : ''}`.trim()} onClick={handleButtonClick}>4x4</button>
            <button type="button" className={`size-setting-button 6x6 ${set6x6 ? 'active' : ''}`.trim()} onClick={handleButtonClick}>6x6</button>
          </div>
        </section>

        <button type="button" className='start-game-button' onClick={handleStart}>Start Game</button>
      </main>
    </div>
  );
}