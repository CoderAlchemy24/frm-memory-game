import './PlayersPanel.css';

export default function PlayersPanel({ players, activeIndex = 0 }) {
  return (
    <div className="players-panel">
      {players.map((player, index) => {
        
        const isActive = index === activeIndex;
        return (
          <div
            className={`player ${isActive ? 'active' : ''} player-${index + 1}`}
            key={index}
          >
            <div className={`rectangle ${isActive ? 'active' : ''}`}></div>
            <div className="score-panel">
              <div className={`pl-title ${isActive ? 'active' : ''}`}>{player.player}</div>
              <div className={`pl-score ${isActive ? 'active' : ''}`}>{player.score}</div>
            </div>
            <label
              className={isActive ? 'current' : ''}
              htmlFor={`player-${index + 1}`}
            >
              Current turn
            </label>
          </div>
        );
      })}
    </div>
  );
}