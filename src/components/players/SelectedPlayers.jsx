import { MdDelete } from 'react-icons/md';
import { Users, UserPlus, Trash2, Trophy } from 'lucide-react';
import { playRemoveSound } from '../../utils/soundEffects';
import { triggerGrandCelebration } from '../../utils/confetti';
import { useStaggerReveal } from '../../hooks/useScrollAnimations';
import { useEffect, useRef } from 'react';

const SelectedPlayers = ({ players, onRemovePlayer, onClearTeam, onAddMore }) => {
  const stagger = useStaggerReveal(players.length, 70);
  const celebratedRef = useRef(false);

  // Celebrate when team is complete (6 players)
  useEffect(() => {
    if (players.length === 6 && !celebratedRef.current) {
      celebratedRef.current = true;
      triggerGrandCelebration();
    }
    if (players.length < 6) {
      celebratedRef.current = false;
    }
  }, [players.length]);

  if (!players.length) {
    return (
      <div className="empty-team">
        <Users className="w-10 h-10 text-neutral-300 mb-2" />
        <p>Your team is empty. Add a player to get started.</p>
        <button type="button" className="primary-button" onClick={onAddMore}>
          <UserPlus className="w-4 h-4 mr-1.5" />
          Browse players
        </button>
      </div>
    );
  }

  return (
    <div className="selected-list">
      {/* Team completion progress */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 mb-2">
        <Trophy className={`w-5 h-5 flex-none ${players.length === 6 ? 'text-yellow-500' : 'text-neutral-300'}`} />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-bold text-neutral-700">
              Team Completion
            </span>
            <span className="text-xs font-bold text-yellow-600">
              {players.length}/6
            </span>
          </div>
          <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                players.length === 6
                  ? 'bg-linear-to-r from-yellow-400 via-emerald-400 to-yellow-400 animate-pulse'
                  : 'bg-linear-to-r from-yellow-400 to-emerald-400'
              }`}
              style={{ width: `${(players.length / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {players.length === 6 && (
        <div className="text-center py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold animate-bounce">
          🏆 Dream XI Complete! Your championship squad is ready!
        </div>
      )}

      {players.map((player, index) => (
        <article
          key={player.id}
          ref={stagger.setRef(index)}
          className={`selected-player transition-all duration-400 ${
            stagger.isVisible(index)
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-6'
          }`}
        >
          <img
            src={player.playerImg}
            alt=""
            className="selected-player-image"
            loading="lazy"
            onError={(e) => { e.currentTarget.src = '/assets/user.png'; }}
          />
          <div className="selected-player-info">
            <h3>{player.playerName}</h3>
            <p>{player.playerRole || player.playerType} · {player.playerCountry}</p>
          </div>
          <p className="selected-player-price">${player.price.toLocaleString()}</p>
          <button
            type="button"
            className="remove-player"
            aria-label={`Remove ${player.playerName}`}
            onClick={() => {
              playRemoveSound();
              onRemovePlayer(player.id);
            }}
          >
            <MdDelete aria-hidden="true" />
          </button>
        </article>
      ))}
      <div className="team-actions">
        <button type="button" className="primary-button" onClick={onAddMore}>
          <UserPlus className="w-4 h-4 mr-1" /> Add More Players
        </button>
        <button type="button" className="secondary-button" onClick={onClearTeam}>
          <Trash2 className="w-4 h-4 mr-1" /> Clear Team
        </button>
      </div>
    </div>
  );
};

export default SelectedPlayers;
