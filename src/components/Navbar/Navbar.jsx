import { useState, useEffect } from 'react';
import { Coins, Menu, X, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import Currency from '/assets/Currency.png';
import AnimatedCounter from '../common/AnimatedCounter';
import { isSoundEnabled, setSoundEnabled, playWhooshSound } from '../../utils/soundEffects';

const Navbar = ({ coin, onOpenClaimModal, isDarkMode, onToggleDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playWhooshSound();
  };

  return (
    <header className="site-header">
      <nav className="navbar page-container" aria-label="Main navigation">
        <a href="#top" className="brand" aria-label="Dream 11 Cricket home">
          <img src="/assets/logo.png" alt="Dream 11 Cricket" />
        </a>

        {/* Desktop Nav */}
        <div className="nav-right">
          <div className="nav-links">
            <a href="#top">Home</a>
            <a href="#players">Players</a>
            <a href="#footer">About</a>
          </div>

          {/* Sound FX Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:text-yellow-500 transition"
            title={soundOn ? 'Mute Stadium Audio' : 'Unmute Stadium Audio'}
            aria-label="Toggle Sound Effects"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-neutral-400" />}
          </button>

          {/* Dark / Stadium Night Match Theme Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:text-yellow-500 transition"
            title={isDarkMode ? 'Switch to Day Match' : 'Switch to Floodlight Night Match'}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-neutral-600" />}
          </button>

          {/* Claim Coins Button */}
          <button
            type="button"
            onClick={onOpenClaimModal}
            className="claim-coins-btn"
            title="Claim free coins"
          >
            <Coins className="w-4 h-4" />
            <span>Claim</span>
          </button>

          {/* Coin Balance */}
          <div className="coin-balance" aria-label={`${coin.toLocaleString()} coins available`}>
            <AnimatedCounter value={coin} suffix=" Coins" />
            <img src={Currency} alt="" />
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer animate-slideDown">
          <a href="#top" onClick={() => setMobileOpen(false)}>Home</a>
          <a href="#players" onClick={() => setMobileOpen(false)}>Players</a>
          <a href="#footer" onClick={() => setMobileOpen(false)}>About</a>
          <div className="flex items-center justify-between py-2 border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Audio Effects</span>
            <button
              type="button"
              onClick={toggleSound}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-neutral-100 dark:border-neutral-800">
            <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400">Stadium Mode</span>
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
          <button
            type="button"
            onClick={() => { onOpenClaimModal(); setMobileOpen(false); }}
            className="claim-coins-btn w-full justify-center mt-2"
          >
            <Coins className="w-4 h-4" />
            Claim Free Coins
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
