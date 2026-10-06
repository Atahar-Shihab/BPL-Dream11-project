import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Banner from './components/banner/Banner';
import Players from './components/players/Players';
import Footer from './components/Footer/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import ClaimCoinsModal from './components/modals/ClaimCoinsModal';
import { triggerConfetti } from './utils/confetti';
import { playCoinSound, playBatShotSound } from './utils/soundEffects';

const STARTING_COINS = 50000;
const TEAM_LIMIT = 6;

function App() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [coin, setCoin] = useState(STARTING_COINS);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [claimModalOpen, setClaimModalOpen] = useState(false);

  useEffect(() => {
    let isActive = true;

    fetch('/data.json')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load the player list.');
        return response.json();
      })
      .then((data) => {
        if (isActive) setPlayers(data);
      })
      .catch(() => {
        if (isActive) setLoadError('Players could not be loaded. Please refresh the page.');
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => { isActive = false; };
  }, []);

  const addPlayer = (player) => {
    if (selectedPlayers.some((selected) => selected.id === player.id)) {
      toast.info(`${player.playerName} is already in your team.`);
      return;
    }
    if (selectedPlayers.length >= TEAM_LIMIT) {
      toast.error(`Your team can have up to ${TEAM_LIMIT} players.`);
      return;
    }
    if (coin < player.price) {
      toast.error('You do not have enough coins for this player.');
      return;
    }

    setSelectedPlayers((current) => [...current, player]);
    setCoin((current) => current - player.price);
    playBatShotSound();
    triggerConfetti();
    toast.success(`${player.playerName} added to your team!`);
  };

  const removePlayer = (playerId) => {
    const player = selectedPlayers.find((selected) => selected.id === playerId);
    if (!player) return;

    setSelectedPlayers((current) => current.filter((selected) => selected.id !== playerId));
    setCoin((current) => current + player.price);
    toast.info(`${player.playerName} removed from your team.`);
  };

  const clearTeam = () => {
    setCoin((current) => current + selectedPlayers.reduce((total, player) => total + player.price, 0));
    setSelectedPlayers([]);
    toast.info('Your team has been cleared.');
  };

  const handleClaimCoins = (amount) => {
    setCoin((current) => current + amount);
    playCoinSound();
  };

  return (
    <>
      <ScrollProgress />
      <Navbar coin={coin} onOpenClaimModal={() => setClaimModalOpen(true)} />
      <main>
        <Banner />
        <Players
          players={players}
          selectedPlayers={selectedPlayers}
          onAddPlayer={addPlayer}
          onRemovePlayer={removePlayer}
          onClearTeam={clearTeam}
          loading={loading}
          loadError={loadError}
          teamLimit={TEAM_LIMIT}
        />
      </main>
      <Footer />
      <ClaimCoinsModal
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        onClaimCoins={handleClaimCoins}
      />
      <ToastContainer position="top-right" autoClose={2600} newestOnTop />
    </>
  );
}

export default App;
