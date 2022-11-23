import { toggleActive } from '../../helpers/toogleActive';

const Header = ({ onCoinChange }) => {
  return (
    <header>
      <h1 className="app-heading">CRYPTO TRACKER</h1>
      <div className="compoare-prices__choose-currency grid">
        <button
          className="toggle active"
          onClick={(e) => {
            onCoinChange('bitcoin');
            toggleActive(e);
          }}
        >
          BITCOIN
        </button>
        <button
          className="toggle"
          onClick={(e) => {
            onCoinChange('ethereum');
            toggleActive(e);
          }}
        >
          ETHEREUM
        </button>
      </div>
    </header>
  );
};

export { Header };
