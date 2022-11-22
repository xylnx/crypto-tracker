import { CoinPrice } from './CoinPrice';
import { HistoricCoinPrice } from './HistoricCoinPrice';
import { LayoutCard } from './LayoutCard';
import { Button } from './Button';

const Home = () => {
  const getDate = () => {
    const date = new Date();

    return date.toLocaleDateString('de-DE');
  };

  return (
    <div className="home flow">
      <h1>
        Current Currency Prices:{' '}
        <span className="text-accent">{getDate()}</span>
      </h1>
      <LayoutCard cardTitle="Bitcoin">
        <CoinPrice coin="bitcoin" />
      </LayoutCard>
      <LayoutCard cardTitle="Ethereum">
        <CoinPrice coin="ethereum" />
      </LayoutCard>
      <Button btnDest="/compare" btnCopy="Compare with historic price data" />
    </div>
  );
};
export { Home };
