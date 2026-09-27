import { FaFlag, FaStar, FaUser } from 'react-icons/fa';

const AvailablePlayer = ({ player, isSelected, isAtLimit, onAddPlayer }) => (
  <article className="player-card">
    <div className="player-photo-wrap">
      <img
        src={player.playerImg}
        alt={player.playerName}
        className="player-photo"
        loading="lazy"
        onError={(event) => { event.currentTarget.src = '/assets/user.png'; }}
      />
    </div>
    <div className="player-card-body">
      <h3 className="player-name"><FaUser aria-hidden="true" />{player.playerName}</h3>
      <div className="player-meta">
        <span><FaFlag aria-hidden="true" />{player.playerCountry}</span>
        <span className="player-role">{player.playerType}</span>
      </div>
      <div className="player-rating"><span>Rating</span><strong><FaStar aria-hidden="true" /> {player.rating}</strong></div>
      <div className="player-styles">
        <span>{player.battingStyle}</span>
        <span>{player.bowlingStyle}</span>
      </div>
      <div className="player-card-footer">
        <strong>${player.price.toLocaleString()}</strong>
        <button
          type="button"
          onClick={() => onAddPlayer(player)}
          disabled={isSelected || isAtLimit}
          className={isSelected ? 'choose-button is-selected' : 'choose-button'}
        >
          {isSelected ? 'Selected' : isAtLimit ? 'Team Full' : 'Choose Player'}
        </button>
      </div>
    </div>
  </article>
);

export default AvailablePlayer;
