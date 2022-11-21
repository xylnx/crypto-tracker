// Hooks
import { useState, useEffect } from 'react';
// Custom Hooks
import { useFetch } from '../hooks/useFetch';

// Components
import { Spinner } from './Spinner';

const CoinPrice = ({ coin, onPriceChange, currency = 'EUR' }) => {
  let _dev = process.env.REACT_APP_DEV_MODE === 'true';

  const url = _dev
    ? `http://localhost:3004/price/${coin}`
    : `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=eur`;

  const [coinPrice, setCoinPrice] = useState(null);
  const { data, isPending } = useFetch(url);

  useEffect(() => {
    if (!data) return;
    try {
      const _price = data[coin].eur;
      setCoinPrice(_price);
      if (onPriceChange) onPriceChange(_price);
    } catch (err) {
      console.log(err);
    }
  }, [data, coin, onPriceChange]);

  return (
    <div>
      {!isPending && data && (
        <div className="coin-price">
          {coinPrice} {currency}
        </div>
      )}
      {isPending && <Spinner />}
    </div>
  );
};

export { CoinPrice };
