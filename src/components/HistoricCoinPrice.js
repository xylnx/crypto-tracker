// Hooks
import { useState, useEffect } from 'react';
// Custom Hooks
import { useFetch } from '../hooks/useFetch';

// Helpers
import { createDateString } from '../helpers/createDateString';

// Components
import { Spinner } from './Spinner';

let _dev = process.env.REACT_APP_DEV_MODE === 'true';

const HistoricCoinPrice = ({
  coin,
  dateOptions,
  currency = 'EUR',
  onPriceChange,
}) => {
  const dateString = createDateString(dateOptions);
  const url = _dev
    ? `http://localhost:3004/history/${coin}`
    : `https://api.coingecko.com/api/v3/coins/${coin}/history?date=${dateString}`;

  const { data, isPending } = useFetch(url);
  const [prevCoinPrice, setPrevCoinPrice] = useState(null);

  function test() {}

  useEffect(() => {
    if (!data) return;
    let newPrice = data?.market_data?.current_price?.eur;
    setPrevCoinPrice(newPrice.toFixed(2));
    onPriceChange(newPrice);
  }, [data]);

  return (
    <>
      {!isPending && data && coin && (
        <div className="coin-price--historic">
          {prevCoinPrice} {currency}
        </div>
      )}
      {isPending && (
        <div>
          <Spinner />
        </div>
      )}
    </>
  );
};

export { HistoricCoinPrice };
