import './SoloResult.css'
import './MultiPlayerResult.css'

export default function MultiPlayerResult({ winners = [], scores = [], resetGame }) {
  const allPlayer = [ 'Player 1', 'Player 2', 'Player 3', 'Player 4' ];



  // single winner
  if (winners.length === 1) {
    const winner = winners[0];
    const winnerScore = scores[allPlayer.indexOf(winner)];
    const notWinners = allPlayer.filter(player => player !== winner);
    const notWinnerScores = notWinners.map((player )=> {return (scores[allPlayer.indexOf(player)]== 0) ?
       0 : (scores[allPlayer.indexOf(player)]);})
    return (
      <div className="multiplayer-overlay">
        <div className="multi-result">
          <div className="texts">
            <h2>{winner} Wins!</h2>
            <h3>Game over! Here are the results...</h3>
          </div>
          <div className="results-board">
            <p className='winner'>{winner}  (Winner!) <span className='scores'>{winnerScore} Paires</span></p>
            { notWinners.map((player, index) => (
              <p key={index} className='not-winner'>{player} <span className='scores'>{notWinnerScores[index]>0 ? notWinnerScores[index]: 0} Paires</span></p>
            ))}
          </div>
          <div className="btns">
            <button className="setup-btn" onClick={resetGame}>Setup New Game</button>
          </div>
        </div>
      </div>
    );
  } 

  // tie ( 2 - 4 winners)
  const winnerScore = scores[allPlayer.indexOf(winners[0])];
  const notWinners = allPlayer.filter(player => !winners.includes(player));
  const notWinnerScores = notWinners.map(player => scores[allPlayer.indexOf(player)]);
 
  return (
    <div className="multiplayer-overlay">
      <div className="multi-result">
        <div className="texts">
          <h2>It's a tie!</h2>
          <h3>Players with the top score:</h3>
        </div>
        <div className="results-board">
          {winners.map((player, idx) => {
            const score = scores[allPlayer.indexOf(player)];
            return (<div key={idx}>
              <p className='winner'>{player} <span className='scores'>{score} Paires</span></p>
            </div>
            );
          })}
          { notWinners.map((player, index) => (
            <p key={index} className='not-winner'>{player} <span className='scores'>{notWinnerScores[index]>0? notWinnerScores[index]:0} Paires</span>
            </p>
          ))}
        </div>
        <div className="btns">
          <button className="setup-btn" onClick={resetGame}>Setup New Game</button>
        </div>
      </div>
    </div>
  );
}