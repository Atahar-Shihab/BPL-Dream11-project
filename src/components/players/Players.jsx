import { useState } from 'react';
import AvailablePlayer from '../AvailablePlayers/AvailablePlayer';
import SelectedPlayers from './SelectedPlayers';

const Players = ({
  players,
  selectedPlayers,
  onAddPlayer,
  onRemovePlayer,
  onClearTeam,
  loading,
  loadError,
  teamLimit,
}) => {
  const [selectedType, setSelectedType] = useState('available');
  const selectedIds = new Set(selectedPlayers.map((player) => player.id));

  return (
    <section id="players" className="players-section page-container">
      <div className="players-heading">
        <h2>{selectedType === 'available' ? 'Available Players' : `Selected Players (${selectedPlayers.length}/${teamLimit})`}</h2>
        <div className="player-tabs" role="tablist" aria-label="Player lists">
          <button
            type="button"
            role="tab"
            aria-selected={selectedType === 'available'}
            onClick={() => setSelectedType('available')}
            className={selectedType === 'available' ? 'player-tab is-active' : 'player-tab'}
          >
            Available
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={selectedType === 'selected'}
            onClick={() => setSelectedType('selected')}
            className={selectedType === 'selected' ? 'player-tab is-active' : 'player-tab'}
          >
            Selected <span className="tab-count">({selectedPlayers.length})</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="players-message" role="status"><span className="loading loading-spinner loading-md" /> Loading players…</div>
      ) : loadError ? (
        <div className="players-message error-message" role="alert">{loadError}</div>
      ) : selectedType === 'available' ? (
        players.length ? (
          <div className="player-grid">
            {players.map((player) => (
              <AvailablePlayer
                key={player.id}
                player={player}
                isSelected={selectedIds.has(player.id)}
                isAtLimit={selectedPlayers.length >= teamLimit}
                onAddPlayer={onAddPlayer}
              />
            ))}
          </div>
        ) : <div className="players-message">No players are available right now.</div>
      ) : (
        <SelectedPlayers
          players={selectedPlayers}
          onRemovePlayer={onRemovePlayer}
          onClearTeam={onClearTeam}
          onAddMore={() => setSelectedType('available')}
        />
      )}
    </section>
  );
};

export default Players;
