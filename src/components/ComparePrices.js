// Hooks
import { useState, useEffect } from 'react';

// Components
import { CoinPrice } from './CoinPrice';
import { HistoricCoinPrice } from './HistoricCoinPrice';
import { DatePicker } from './DatePicker';
import { Button } from './Button';

// Helpers
import { createHistDate } from '../helpers/createHistDate';
import { calculateValueChange } from '../helpers/calculateValueChange';

// Layout
import { LayoutCard } from './LayoutCard';

import './ComparePrices.scss';

const ComparePrices = () => {
  const curDate = 'Today';
  const [histDate, setHistDate] = useState(null);
  const [coin, setCoin] = useState('bitcoin');
  const [dateOptions, setDateOptions] = useState({ offsetDay: -7 });

  const [curPrice, setCurPrice] = useState(null);
  const [histPrice, setHistPrice] = useState(null);
  const [valChange, setValChange] = useState(null);

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

  const handleChangeDate = (dateStr) => {
    setDateOptions({ date: dateStr });
  };

  const handleChangeCurPrice = (curPrice) => {
    setCurPrice(curPrice);
  };

  const handleChangeHistPrice = (histPrice) => {
    setHistPrice(histPrice);
  };

  useEffect(() => {
    setHistDate(createHistDate(dateOptions).toLocaleDateString('de-DE'));
  }, [dateOptions]);

  useEffect(() => {
    setValChange(calculateValueChange(curPrice, histPrice));
  }, [curPrice, histPrice]);

  return (
    <div className="compare-prices flow">
      <LayoutCard cardTitle={`Price trend since ${histDate}:`} sub={coin}>
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

        {/*
      <div className="compare-prices__choose-time-span grid">
        <button
          className="toggle active"
          onClick={(e) => {
            setDateOptions({ offsetDay: -7 });
            toggleActive(e);
          }}
        >
          1 Week ago
        </button>
        <button
          className="toggle"
          onClick={(e) => {
            setDateOptions({ offsetMonth: -1 });
            toggleActive(e);
          }}
        >
          1 Month ago
        </button>
        <DatePicker
          onChangeDate={handleChangeDate}
          dpClasses="toggle grid-fw"
        />

      </div>
      */}

        <div className="current-price">
          <span className="current-price__coin-name">{coin}</span>
          <CoinPrice coin={coin} onPriceChange={handleChangeCurPrice} />
        </div>

        <span>{histDate}: </span>
        <HistoricCoinPrice
          coin={coin}
          dateOptions={dateOptions}
          onPriceChange={handleChangeHistPrice}
        />

        {valChange && <div>{valChange} %</div>}
      </LayoutCard>
    </div>
  );
};

export { ComparePrices };
