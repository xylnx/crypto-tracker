// Hooks
import { useState } from 'react';

// Components
import { Header } from './header/Header';
import { CurrentPrices } from './current-prices/CurrentPrices';
import { ComparePrices } from './ComparePrices';
import { CurrencySymbols } from './currency-symbols/CurrencySymbols';
import { ChartAndTable } from './chart-and-table/ChartAndTable';

// Helpers
import { toUnixTimestamp } from '../helpers/toUnixTimestamp';

// Styles
import './Home.scss';

const Home = () => {
  const [coin, setCoin] = useState('bitcoin');

  return (
    <>
      <Header onCoinChange={setCoin} />

      <div className="home">
        <CurrentPrices />
        <ComparePrices coin={coin} />
        <CurrencySymbols coin={coin} />
        <ChartAndTable coin={coin} />
      </div>
    </>
  );
};
export { Home };
