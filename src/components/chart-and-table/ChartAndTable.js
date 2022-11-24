// Hooks
import { useState, useEffect } from 'react';

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
import { createDateString } from '../../helpers/createDateString';

const ChartAndTable = ({ coin }) => {
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [isTable, setIsTable] = useState(false);

  const handleChangeStartDate = (dateStr) => {
    setStartDate(toUnixTimestamp(dateStr));
  };

  const handleChangeEndDate = (dateStr) => {
    setEndDate(toUnixTimestamp(dateStr));
  };

  const toggleTable = () => {
    setIsTable((prevIsTable) => !prevIsTable);
  };

  useEffect(() => {
    /** Load price trend of the last week */
    const dateStrNow = createDateString({ reverse: true });
    const dateStrAWeekAgo = createDateString({ offsetDay: -7, reverse: true });
    setStartDate(toUnixTimestamp(dateStrAWeekAgo));
    setEndDate(toUnixTimestamp(dateStrNow));
  }, []);

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
      {!isTable && startDate && endDate && (
        <Chart coin={coin} startDate={startDate} endDate={endDate} />
      )}
      {isTable && startDate && endDate && (
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
