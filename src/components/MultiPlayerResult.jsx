import './SoloResult.css'
import './MultiPlayerResult.css'
import { buildPlayerSummaries, clampPlayersCount } from '../game/gameLogic';

export default function MultiPlayerResult({ winners = [], scores = [], playersCount = 2, resetGame }) {
  const visiblePlayers = buildPlayerSummaries(scores, clampPlayersCount(playersCount));

  // single winner
  if (winners.length === 1) {
    const winner = winners[0];
    const winnerSummary = visiblePlayers.find((player) => player.player === winner);
    const notWinners = visiblePlayers.filter((player) => player.player !== winner);

    return (
      <div className="multiplayer-overlay">
        <div className="multi-result">
          <div className="texts">
            <h2>{winner} Wins!</h2>
            <h3>Game over! Here are the results...</h3>
          </div>
          <div className="results-board">
            <p className='winner'>{winner}  (Winner!) <span className='scores'>{winnerSummary?.score ?? 0} Pairs</span></p>
            { notWinners.map((player) => (
              <p key={player.player} className='not-winner'>{player.player} <span className='scores'>{player.score} Pairs</span></p>
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
  const notWinners = visiblePlayers.filter((player) => !winners.includes(player.player));
 
  return (
    <div className="multiplayer-overlay">
      <div className="multi-result">
        <div className="texts">
          <h2>{`It's a tie!`}</h2>
          <h3>Players with the top score:</h3>
        </div>
        <div className="results-board">
          {winners.map((player) => {
            const summary = visiblePlayers.find((item) => item.player === player);
            return (<div key={player}>
              <p className='winner'>{player} <span className='scores'>{summary?.score ?? 0} Pairs</span></p>
            </div>
            );
          })}
          { notWinners.map((player) => (
            <p key={player.player} className='not-winner'>{player.player} <span className='scores'>{player.score} Pairs</span>
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