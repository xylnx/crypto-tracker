import { LayoutCard } from '../LayoutCard';
import { CoinPrice } from '../CoinPrice';

const CurrentPrices = () => {
  return (
    <LayoutCard cardTitle="Current Prices" classNames="current-prices">
      <div className="current-price">
        <span className="current-price__coin-name">Bitcoin:</span>
        <CoinPrice coin="bitcoin" />
      </div>
      <div className="current-price">
        <span className="current-price__coin-name">Ethereum:</span>
        <CoinPrice coin="ethereum" />
      </div>
    </LayoutCard>
  );
};

export { CurrentPrices };
