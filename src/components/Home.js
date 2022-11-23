// Hooks
import { useState, useEffect } from 'react';

// Components
import { CoinPrice } from './CoinPrice';
import { LayoutCard } from './LayoutCard';
import { ComparePrices } from './ComparePrices';
import { DatePicker } from './DatePicker';
import { Chart } from './Chart';
import { HistoricPriceTable } from './HistoricPriceTable';

// Helpers
import { toggleActive } from '../helpers/toogleActive';
import { toUnixTimestamp } from '../helpers/toUnixTimestamp';

// Styles
import './Home.scss';

const Home = () => {
  const [coin, setCoin] = useState('bitcoin');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isTable, setIsTable] = useState(false);

  const toGermanDateString = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('de-DE');
  };

  const handleChangeStartDate = (dateStr) => {
    setStartDate(toUnixTimestamp(dateStr));
  };

  const handleChangeEndDate = (dateStr) => {
    setEndDate(toUnixTimestamp(dateStr));
  };

  const toggleTable = () => {
    setIsTable((prevIsTable) => !prevIsTable);
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

        {/* Chart and Table */}
        <LayoutCard
          cardTitle={`Price trend ${
            startDate && endDate
              ? 'from ' +
                toGermanDateString(startDate) +
                ' to ' +
                toGermanDateString(endDate)
              : ''
          }`}
          classNames="chart"
          fullWidth={true}
        >
          <button onClick={toggleTable}>
            {isTable ? 'Show chart' : 'Show Table'}
          </button>
          <div className="price-table__pick-date grid">
            <DatePicker
              onChangeDate={handleChangeStartDate}
              dpLabel="start date"
            />
            <DatePicker onChangeDate={handleChangeEndDate} dpLabel="end date" />
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
