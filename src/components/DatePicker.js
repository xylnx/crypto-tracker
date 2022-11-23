import { useEffect } from 'react';

const DatePicker = ({
  id,
  dpLabel,
  onChangeDate,
  dpClasses = '',
  hasVisLabel = true,
} = {}) => {
  const handleChange = (e) => {
    onChangeDate(e.target.value);
  };

  useEffect(() => {
    setMaxDate(); // set max date to today's date
  }, []);

  return (
    <div
      className={`date-picker ${dpClasses} ${
        hasVisLabel ? 'label-visible' : ''
      }`}
    >
      <label
        htmlFor={id}
        className={`${hasVisLabel ? '' : 'sr-only'} date-picker__label`}
      >
        {dpLabel ? dpLabel : 'Pick a date:'}
      </label>
      <input
        onChange={handleChange}
        type="date"
        id={id}
        className={`date-picker__input `}
        name="date"
        min="2009-01-03"
        max="1970-01-01"
      />
    </div>
  );

  function setMaxDate() {
    const inputs = document.querySelectorAll('.date-picker__input');
    inputs.forEach(
      (input) => (input.max = new Date().toLocaleDateString('en-ca'))
    );
  }
};

export { DatePicker };
