// Hooks
import { useState } from 'react';

// Components
import { LayoutCard } from '../LayoutCard';
import { DatePicker } from '../DatePicker';
import { Chart } from '../Chart';
import { HistoricPriceTable } from '../HistoricPriceTable';

// Icons
import { IconTable } from '../icons/IconTable';
import { IconChart } from '../icons/IconChart';

// Helpers
import { toUnixTimestamp } from '../../helpers/toUnixTimestamp';

const ChartAndTable = ({ coin }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isTable, setIsTable] = useState(false);

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
  );
};

export { ChartAndTable };