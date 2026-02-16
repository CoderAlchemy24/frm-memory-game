import './SoloResult.css'

export default function SoloResult({ time, moves, resetGame }) {
  return (
    <div className="solo-overlay">
      <div className="solo-result">
        <h2>You did it!</h2>
        <h3>Game over! Here's how you you got on...</h3>

        <p className='result-time'>Time Elapsed: <span className='result'>{time}</span></p>
        <p className='result-moves'>Moves Taken: <span className='result'>{moves} Moves</span></p>
        <div className="btns">
          <button className="reset-btn" onClick={resetGame}>Restart</button>
          <button className="setup-btn" onClick={resetGame}>Setup New Game</button>
        </div>
      </div>
    </div>
  );
}