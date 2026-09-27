import { MdDelete } from 'react-icons/md';

const SelectedPlayers = ({ players, onRemovePlayer, onClearTeam, onAddMore }) => {
  if (!players.length) {
    return (
      <div className="empty-team">
        <p>Your team is empty. Add a player to get started.</p>
        <button type="button" className="primary-button" onClick={onAddMore}>Browse players</button>
      </div>
    );
  }

  return (
    <div className="selected-list">
      {players.map((player) => (
        <article key={player.id} className="selected-player">
          <img src={player.playerImg} alt="" className="selected-player-image" loading="lazy" />
          <div className="selected-player-info">
            <h3>{player.playerName}</h3>
            <p>{player.playerRole || player.playerType} · {player.playerCountry}</p>
          </div>
          <p className="selected-player-price">${player.price.toLocaleString()}</p>
          <button
            type="button"
            className="remove-player"
            aria-label={`Remove ${player.playerName}`}
            onClick={() => onRemovePlayer(player.id)}
          >
            <MdDelete aria-hidden="true" />
          </button>
        </article>
      ))}
      <div className="team-actions">
        <button type="button" className="primary-button" onClick={onAddMore}>Add More Players</button>
        <button type="button" className="secondary-button" onClick={onClearTeam}>Clear Team</button>
      </div>
    </div>
  );
};

export default SelectedPlayers;
