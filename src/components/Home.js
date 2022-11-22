import { CoinPrice } from './CoinPrice';
import { HistoricCoinPrice } from './HistoricCoinPrice';
import { LayoutCard } from './LayoutCard';
import { Button } from './Button';

import { ComparePrices } from './ComparePrices';
import { Chart } from './Chart';
import { PriceTable } from './PriceTable';

import './Home.scss';

const Home = () => {
  const getDate = () => {
    const date = new Date();

    return date.toLocaleDateString('de-DE');
  };

  return (
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
      <ComparePrices />
      <LayoutCard cardTitle="Chart" classNames="chart" fullWidth={true}>
        <Chart />
      </LayoutCard>
      <LayoutCard cardTitle="Table" classNames="table" fullWidth={true}>
        <PriceTable />
      </LayoutCard>
    </div>
  );
};
export { Home };
