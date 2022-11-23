// Hooks
import { useState, useEffect } from 'react';

// Components
import { Header } from './header/Header';

import { CoinPrice } from './CoinPrice';
import { LayoutCard } from './LayoutCard';
import { ComparePrices } from './ComparePrices';
import { DatePicker } from './DatePicker';
import { Chart } from './Chart';
import { HistoricPriceTable } from './HistoricPriceTable';
import { IconBitcoin } from './icons/IconBitcoin';
import { IconEthereum } from './icons/IconEthereum';
import { IconTable } from './icons/IconTable';
import { IconChart } from './icons/IconChart';

// Helpers
import { toUnixTimestamp } from '../helpers/toUnixTimestamp';

// Styles
import './Home.scss';

const Home = () => {
  const [coin, setCoin] = useState('bitcoin');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isTable, setIsTable] = useState(false);

  console.log({ coin });
  const handleChangeStartDate = (dateStr) => {
    setStartDate(toUnixTimestamp(dateStr));
    console.log('Change Start Date');
  };

  const handleChangeEndDate = (dateStr) => {
    setEndDate(toUnixTimestamp(dateStr));
  };

  const toggleTable = () => {
    setIsTable((prevIsTable) => !prevIsTable);
  };

  return (
    <>
      <Header onCoinChange={setCoin} />
      <div className="home">
        {/* Current Price */}
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

        {/* Compare prices: one week/month/any date */}
        <ComparePrices coin={coin} />

        <LayoutCard classNames="currency-symbols card--blanche">
          {coin === 'bitcoin' ? <IconBitcoin /> : <IconEthereum />}
        </LayoutCard>

        {/* Chart and Table */}
        <LayoutCard
          cardTitle={`${coin} Price Trend`}
          classNames="price-trend"
          fullWidth={true}
        >
          <button onClick={toggleTable}>
            {!isTable && <IconTable />}
            {isTable && <IconChart />}
            {isTable ? 'Show chart' : 'Show Table'}
          </button>
          <div className="price-trend__pick-dates">
            <DatePicker
              onChangeDate={handleChangeStartDate}
              dpLabel="Start Date"
              id="picker-1"
            />
            <DatePicker
              id="picker-2"
              onChangeDate={handleChangeEndDate}
              dpLabel="End Date"
            />
          </div>
          {!isTable && (
            <Chart coin={coin} startDate={startDate} endDate={endDate} />
          )}
          {isTable && (
            <HistoricPriceTable
              coin={coin}
              startDate={startDate}
              endDate={endDate}
            />
          )}
        </LayoutCard>
      </div>
    </>
  );
};
export { Home };
