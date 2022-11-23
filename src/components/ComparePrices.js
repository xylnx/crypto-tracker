// Hooks
import { useState, useEffect } from 'react';

// Components
import { CoinPrice } from './CoinPrice';
import { HistoricCoinPrice } from './HistoricCoinPrice';
import { DatePicker } from './DatePicker';

// Helpers
import { createHistDate } from '../helpers/createHistDate';
import { calculateValueChange } from '../helpers/calculateValueChange';
import { toggleActive } from '../helpers/toogleActive';

// Layout
import { LayoutCard } from './LayoutCard';

// Styles
import './ComparePrices.scss';

const ComparePrices = ({ coin }) => {
  const [histDate, setHistDate] = useState(null);
  const [dateOptions, setDateOptions] = useState({ offsetDay: -7 });
  const [curPrice, setCurPrice] = useState(null);
  const [histPrice, setHistPrice] = useState(null);
  const [valChange, setValChange] = useState(null);

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
    <div className="compare-prices">
      <LayoutCard cardTitle={`${coin} since ${histDate}`} sub={coin}>
        <div class="compare-prices__container">
          <div className="compare-prices__choose-time-span">
            <button
              className="toggle active"
              onClick={(e) => {
                setDateOptions({ offsetDay: -7 });
                toggleActive(e);
              }}
            >
              1 Week
            </button>
            <button
              className="toggle"
              onClick={(e) => {
                setDateOptions({ offsetMonth: -1 });
                toggleActive(e);
              }}
            >
              1 Month
            </button>
            <DatePicker
              onChangeDate={handleChangeDate}
              dpClasses="toggle grid-fw"
            />
          </div>

          <div className="prices">
            <div className="prices__current-price">
              <span class="text-accent">Current Price:</span>
              <CoinPrice coin={coin} onPriceChange={handleChangeCurPrice} />
            </div>

            <div className="prices__historic-price">
              <span class="text-accent">{histDate}: </span>
              <HistoricCoinPrice
                coin={coin}
                dateOptions={dateOptions}
                onPriceChange={handleChangeHistPrice}
              />
            </div>

            {valChange && (
              <div className="prices__difference">
                <span class="text-accent">Change: </span>
                <span>{valChange} %</span>
              </div>
            )}
          </div>
        </div>
      </LayoutCard>
    </div>
  );
};

export { ComparePrices };
