import { useState } from 'react';
import { Coins, Menu, X } from 'lucide-react';
import Currency from '/assets/Currency.png';
import AnimatedCounter from '../common/AnimatedCounter';

const Navbar = ({ coin, onOpenClaimModal }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

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

          <button
            type="button"
            onClick={onOpenClaimModal}
            className="claim-coins-btn"
            title="Claim free coins"
          >
            <Coins className="w-4 h-4" />
            <span>Claim</span>
          </button>

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
          <button
            type="button"
            onClick={() => { onOpenClaimModal(); setMobileOpen(false); }}
            className="claim-coins-btn w-full justify-center"
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
