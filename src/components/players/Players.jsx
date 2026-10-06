import { useState, useMemo } from 'react';
import AvailablePlayer from '../AvailablePlayers/AvailablePlayer';
import SelectedPlayers from './SelectedPlayers';
import { useStaggerReveal, useScrollReveal } from '../../hooks/useScrollAnimations';
import { playWhooshSound } from '../../utils/soundEffects';
import { Search, Filter } from 'lucide-react';

const PLAYER_TYPES = ['All', 'Batsman', 'Bowler', 'All-Rounder', 'Wicketkeeper-Batsman'];

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
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const selectedIds = new Set(selectedPlayers.map((player) => player.id));

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal({ threshold: 0.05 });

  // Filter and sort available players
  const filteredPlayers = useMemo(() => {
    let result = [...players];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.playerName.toLowerCase().includes(q) ||
          p.playerCountry.toLowerCase().includes(q) ||
          p.playerType.toLowerCase().includes(q)
      );
    }

    // Role filter
    if (filterRole !== 'All') {
      result = result.filter((p) => p.playerType === filterRole);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => a.playerName.localeCompare(b.playerName));
    }

    return result;
  }, [players, searchQuery, filterRole, sortBy]);

  const stagger = useStaggerReveal(filteredPlayers.length, 60);

  return (
    <section
      ref={sectionRef}
      id="players"
      className={`players-section page-container transition-all duration-700 ${
        sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="players-heading">
        <h2>
          {selectedType === 'available'
            ? 'Available Players'
            : `Selected Players (${selectedPlayers.length}/${teamLimit})`}
        </h2>
        <div className="player-tabs" role="tablist" aria-label="Player lists">
          <button
            type="button"
            role="tab"
            aria-selected={selectedType === 'available'}
            onClick={() => {
              playWhooshSound();
              setSelectedType('available');
            }}
            className={selectedType === 'available' ? 'player-tab is-active' : 'player-tab'}
          >
            Available
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={selectedType === 'selected'}
            onClick={() => {
              playWhooshSound();
              setSelectedType('selected');
            }}
            className={selectedType === 'selected' ? 'player-tab is-active' : 'player-tab'}
          >
            Selected <span className="tab-count">({selectedPlayers.length})</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar (visible only for Available tab) */}
      {selectedType === 'available' && !loading && !loadError && (
        <div className="flex flex-wrap items-center gap-3 mb-5 animate-fadeIn">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search players by name, country..."
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-neutral-200 bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition"
            />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="pl-8 pr-8 py-2.5 text-sm rounded-xl border border-neutral-200 bg-white focus:border-yellow-400 outline-none appearance-none cursor-pointer"
            >
              {PLAYER_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2.5 text-sm rounded-xl border border-neutral-200 bg-white focus:border-yellow-400 outline-none appearance-none cursor-pointer"
          >
            <option value="name">Sort: Name</option>
            <option value="rating">Sort: Rating</option>
            <option value="price-low">Sort: Price ↑</option>
            <option value="price-high">Sort: Price ↓</option>
          </select>

          {/* Results count */}
          <span className="text-xs text-neutral-400 font-medium">
            {filteredPlayers.length} player{filteredPlayers.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {loading ? (
        <div className="players-message" role="status">
          <span className="loading loading-spinner loading-md" /> Loading players…
        </div>
      ) : loadError ? (
        <div className="players-message error-message" role="alert">{loadError}</div>
      ) : selectedType === 'available' ? (
        filteredPlayers.length ? (
          <div className="player-grid">
            {filteredPlayers.map((player, index) => (
              <div
                key={player.id}
                ref={stagger.setRef(index)}
                className={`transition-all duration-500 ${
                  stagger.isVisible(index)
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
              >
                <AvailablePlayer
                  player={player}
                  isSelected={selectedIds.has(player.id)}
                  isAtLimit={selectedPlayers.length >= teamLimit}
                  onAddPlayer={onAddPlayer}
                  onRemovePlayer={onRemovePlayer}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="players-message">
            {searchQuery || filterRole !== 'All'
              ? 'No players match your search criteria.'
              : 'No players are available right now.'}
          </div>
        )
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
