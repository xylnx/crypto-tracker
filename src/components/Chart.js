import { useState, useEffect } from 'react';

// Custom Hooks
import { useFetch } from '../hooks/useFetch';

import { Spinner } from './Spinner';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      // data: ['12', '19', '3', '5', '2', '3'],
      borderColor: '#f1f2f4',
      backgroundColor: '#f1f2f4',
    },
    {
      // label: 'Dataset 2',
      // data: ['12', '19', '3', '5', '2', '3'].reverse(),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function Chart({ coin, startDate, endDate }) {
  const [chartData, setChartData] = useState(data);
  const [filteredCoinData, setFilterdCoinData] = useState(null);
  // const _devUrl = 'http://localhost:3004/market_chart/bitcoin';
  const _url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=eur&from=${startDate}&to=${endDate}`;

  const { data: coinData, isPending } = useFetch(_url);

  useEffect(() => {
    if (filteredCoinData) {
      setChartData((prevChartData) => {
        return {
          ...prevChartData,
          labels: getDates(filteredCoinData),
          datasets: [
            {
              ...prevChartData.datasets[0],
              label: coin,
              data: getPrices(filteredCoinData),
            },
            {
              ...prevChartData.datasets[1],
            },
          ],
        };
      });
    }
  }, [filteredCoinData, coin]);

  useEffect(() => {
    if (coinData) {
      setFilterdCoinData(filterDates(coinData));
    }
  }, [coinData]);

  return (
    <>
      {isPending && <Spinner />}
      {!isPending && <Line options={options} data={chartData} />}
    </>
  );
}

function filterDates(d) {
  // TODO: Catch the 1 day edge case
  console.log(d.prices);
  const lastIndex = d.prices.length - 1;
  console.log(lastIndex);
  return d.prices.filter((entry, index, array) => {
    const date = new Date(entry[0]);
    console.log(date);
    if (index === lastIndex) {
      return [entry[0], entry[1]];
    }
    if (date.getHours() !== 23) return;
    return [entry[0], entry[1]];
  });
}

function getPrices(_coinData) {
  console.log(_coinData);
  return _coinData.map((entry, index, array) => {
    return entry[1].toFixed(2);
  });
}

function getDates(_coinData) {
  console.log(_coinData);
  return _coinData.map((entry, index, array) => {
    return new Date(entry[0]).toLocaleDateString('de-DE');
  });
}

export { Chart };
