import { useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { Spinner } from './Spinner';

// Helpers
import { calculateValueChange } from '../helpers/calculateValueChange';

// Styles
import './HistoricPriceTable.scss';

const HistoricPriceTable = ({ startDate, endDate, coin }) => {
  const _url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=eur&from=${startDate}&to=${endDate}`;
  const _devUrl = 'http://localhost:3004/market_chart/bitcoin';

  // const { data, isPending } = useFetch(_devUrl);
  const { data, isPending } = useFetch(_url);

  return (
    <div className="price-table__table">
      {isPending && <Spinner />}

      {!isPending && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Price</th>
              <th>Price Change</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              filterDates(data).map((entry, index, array) => {
                if (index >= 20) return;
                const date = formatDate(entry[0]);
                const price = entry[1].toFixed(2);
                const priceChange = calculateValueChange(
                  price,
                  index > 0 ? array[index - 1][1] : price
                );
                return (
                  <>
                    <TableRow
                      date={date}
                      price={price}
                      priceChange={priceChange}
                      key={index}
                    />
                  </>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

function TableRow({ date, price, priceChange }) {
  return (
    <tr>
      <td>{date}</td>
      <td>{price} EUR</td>
      <td>{priceChange} %</td>
    </tr>
  );
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('de-DE');
}

function filterDates(d) {
  // TODO: Catch the 1 day edge case
  const lastIndex = d.prices.length - 1;
  return d.prices.filter((entry, index, array) => {
    const date = new Date(entry[0]);
    if (index === lastIndex) {
      return [entry[0], entry[1]];
    }
    if (date.getHours() !== 23) return;
    return [entry[0], entry[1]];
  });
}

export { HistoricPriceTable };
