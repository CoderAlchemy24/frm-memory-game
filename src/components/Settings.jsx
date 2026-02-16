import './Settings.css'
import logo from '../assets/logo-dark.svg'
import { useState } from 'react';

export const createCardsArray = (is4x4) => {
  if (is4x4) {
    const numbers = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    return numbers.sort(() => Math.random() - 0.5);
  } else {
    const numbers = [
      1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,
      1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18
    ];
    return numbers.sort(() => Math.random() - 0.5);
  }
};

export default function Settings({ onStart }) {
  const [set4x4, setSet4x4] = useState(true);
  const [set6x6, setSet6x6] = useState(false);
  const [icons, setIcons] = useState(true);
  const [players, setPlayers] = useState(1);

  const handleButtonClick = (event) => {
    const clickedButton = event.target;
    const buttonGroup = clickedButton.closest('.btns');

    if (buttonGroup) {
      const buttonsInGroup = Array.from(buttonGroup.querySelectorAll('button'));
      buttonsInGroup.forEach(button => button.classList.remove('active'));
    }

    clickedButton.classList.add('active');

    if (clickedButton.classList.contains('theme-selector-button')) {
      if (clickedButton.classList.contains('numbers')) {
        setIcons(false);
        console.log('Theme: numbers');
      } else if (clickedButton.classList.contains('icons')) {
        setIcons(true);
        console.log('Theme: icons');
      }
    }

    if (clickedButton.classList.contains('num-of-players-button')) {
      let newPlayers = players;
      if (clickedButton.classList.contains('one')) newPlayers = 1;
      else if (clickedButton.classList.contains('two')) newPlayers = 2;
      else if (clickedButton.classList.contains('three')) newPlayers = 3;
      else if (clickedButton.classList.contains('four')) newPlayers = 4;
      setPlayers(newPlayers);
      console.log('Players:', newPlayers);
    }

    if (clickedButton.classList.contains('size-setting-button')) {
      if (clickedButton.classList.contains('4x4')) {
        setSet4x4(true);
        setSet6x6(false);
        console.log('Grid: 4x4');
      } else if (clickedButton.classList.contains('6x6')) {
        setSet6x6(true);
        setSet4x4(false);
        console.log('Grid: 6x6');
      }
    }
  };

  const handleStart = () => {
    const settings = {
      set4x4,
      set6x6,
      icons,
      players,
      cards: createCardsArray(set4x4)
    };
    console.log('Starting game with', settings);
    if (typeof onStart === 'function') onStart(settings);
  };

  return (
    <div className='settings'>
      <header>
        <img src={logo} alt='memory game logo-darkblue'/>
      </header>
      <main>
        <section className='theme-selection'>
          <label htmlFor='theme-selector-button'>Select Theme:</label>
          <div className='btns'>
            <button className='theme-selector-button numbers' onClick={handleButtonClick}>Numbers</button>
            <button className='theme-selector-button icons active' onClick={handleButtonClick}>Icons</button>
          </div>
        </section>

        <section className='players-selection'>
          <label htmlFor='num-of-players'>Number of Players:</label>
          <div className='btns'>
            <button className='num-of-players-button one active' onClick={handleButtonClick}>1</button>
            <button className='num-of-players-button two' onClick={handleButtonClick}>2</button>
            <button className='num-of-players-button three' onClick={handleButtonClick}>3</button>
            <button className='num-of-players-button four' onClick={handleButtonClick}>4</button>
          </div>
        </section>

        <section className='size-selection'>
          <label htmlFor='size-setting-button'>Grid Size:</label>
          <div className='btns'>
            <button className='size-setting-button 4x4 active' onClick={handleButtonClick}>4x4</button>
            <button className='size-setting-button 6x6' onClick={handleButtonClick}>6x6</button>
          </div>
        </section>

        <button className='start-game-button' onClick={handleStart}>Start Game</button>
      </main>
    </div>
  );
}