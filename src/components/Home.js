// Hooks
import { useState, useEffect } from 'react';

// Components
import { CoinPrice } from './CoinPrice';
import { HistoricCoinPrice } from './HistoricCoinPrice';
import { LayoutCard } from './LayoutCard';
import { Button } from './Button';

import { ComparePrices } from './ComparePrices';

import { Chart } from './Chart';
import { PriceTable } from './PriceTable';

// Helpers
import { toggleActive } from '../helpers/toogleActive';

// Styles
import './Home.scss';

const Home = () => {
  const [coin, setCoin] = useState('bitcoin');
  const getDate = () => {
    const date = new Date();

    return date.toLocaleDateString('de-DE');
  };

  return (
    <>
      <header>
        <h1 className="app-heading">CRYPTO TRACKER</h1>
        <div className="compoare-prices__choose-currency grid">
          <button
            className="toggle active"
            onClick={(e) => {
              setCoin('bitcoin');
              toggleActive(e);
            }}
          >
            BITCOIN
          </button>
          <button
            className="toggle"
            onClick={(e) => {
              setCoin('ethereum');
              toggleActive(e);
            }}
          >
            ETHEREUM
          </button>
        </div>
      </header>
      <div className="home">
        <LayoutCard cardTitle="Current Prices" classNames="current-prices">
          <div className="current-price">
            <span className="current-price__coin-name">Bitcoin</span>
            <CoinPrice coin="bitcoin" />
          </div>
          <div className="current-price">
            <span className="current-price__coin-name">Ethereum</span>
            <CoinPrice coin="ethereum" />
          </div>
        </LayoutCard>
        <ComparePrices coin={coin} />
        <LayoutCard cardTitle="Chart" classNames="chart" fullWidth={true}>
          <Chart />
        </LayoutCard>
        <LayoutCard cardTitle="Table" classNames="table" fullWidth={true}>
          <PriceTable />
        </LayoutCard>
      </div>
    </>
  );
};
export { Home };
