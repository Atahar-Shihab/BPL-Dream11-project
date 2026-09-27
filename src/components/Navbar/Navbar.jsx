import Currency from '/assets/Currency.png';

const Navbar = ({ coin }) => (
  <header className="site-header">
    <nav className="navbar page-container" aria-label="Main navigation">
      <a href="#top" className="brand" aria-label="Dream 11 Cricket home">
        <img src="/assets/logo.png" alt="Dream 11 Cricket" />
      </a>
      <div className="nav-right">
        <div className="nav-links">
          <a href="#top">Home</a>
          <a href="#players">Players</a>
          <a href="#footer">About</a>
        </div>
        <div className="coin-balance" aria-label={`${coin.toLocaleString()} coins available`}>
          <span>{coin.toLocaleString()} Coins</span>
          <img src={Currency} alt="" />
        </div>
      </div>
    </nav>
  </header>
);

export default Navbar;
