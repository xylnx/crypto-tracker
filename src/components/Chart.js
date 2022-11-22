import { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';

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
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      // data: ['12', '19', '3', '5', '2', '3'].reverse(),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function Chart() {
  const [chartData, setChartData] = useState(data);
  const _devUrl = 'http://localhost:3004/market_chart/bitcoin';
  const { data: coinData, isPending } = useFetch(_devUrl);

  useEffect(() => {
    if (coinData) {
      const _prices = setChartData((prevChartData) => {
        return {
          ...prevChartData,
          labels: getDates(coinData),
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: getPrices(coinData),
            },
            {
              ...prevChartData.datasets[1],
            },
          ],
        };
      });
    }
  }, [coinData]);

  return <Line options={options} data={chartData} />;
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
  return _coinData.data.prices.map((entry, index, array) => {
    return entry[1].toFixed(2);
  });
}

function getDates(_coinData) {
  console.log(_coinData);
  return _coinData.data.prices.map((entry, index, array) => {
    return new Date(entry[0]).toLocaleDateString('de-DE');
  });
}

/*
const Chart = ({ startDate, endDate, coin }) => {
  const _url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=eur&from=${startDate}&to=${endDate}`;

  const labels = ['Jan', 'Feb', 'March', 'June'];
  return (
    <div className="chart">
      <Line height={400} width={600} data={{ labels }} />
    </div>
  );
};
*/

export { Chart };
