// Hooks
import { useState, useEffect } from 'react';

// Custom hooks
import { useFetch } from '../hooks/useFetch';

// Components
import { Button } from './Button';
import { DatePicker } from './DatePicker';
import { HistoricPriceTable } from './HistoricPriceTable';

const PriceTable = () => {
  const [coin, setCoin] = useState('bitcoin');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const toggleActive = (e) => {
    const children = e.target.parentElement.querySelectorAll('.toggle');
    children.forEach((child) => {
      if (child.classList.contains('active')) {
        child.classList.remove('active');
      }
      if (e.target.classList.contains('toggle'))
        e.target.classList.add('active');
    });
  };

  const handleChangeStartDate = (dateStr) => {
    setStartDate(toUinxTimestamp(dateStr));
  };

  const handleChangeEndDate = (dateStr) => {
    setEndDate(toUinxTimestamp(dateStr));
  };

  return (
    <div className="price-table flow">
      <h1 className="price-table__heading">
        Compare Prices:{' '}
        <span className="price-table__heading--coin text-accent">{coin}</span>
      </h1>
      <div className="price-table__choose-currency">
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

      <div className="price-table__pick-date grid">
        <DatePicker
          onChangeDate={handleChangeStartDate}
          dpLabel="Pick a start date"
        />
        <DatePicker
          onChangeDate={handleChangeEndDate}
          dpLabel="Pick an end date"
        />
      </div>

      {startDate && endDate && (
        <HistoricPriceTable
          startDate={startDate}
          endDate={endDate}
          coin={coin}
        />
      )}

      <div>{startDate}</div>
      <div>{endDate}</div>
    </div>
  );
};

function toUinxTimestamp(date) {
  const _date = new Date(date);
  const timestamp = Math.floor(_date.getTime() / 1000);
  return timestamp;
}

export { PriceTable };
