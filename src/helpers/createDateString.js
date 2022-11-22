function createDateString({ date = 0, offsetDay = 0, offsetMonth = 0 } = {}) {
  let _date;
  if (date) {
    _date = new Date(date);
  } else {
    _date = new Date();
  }

  const prevDate = new Date(
    _date.getFullYear(),
    _date.getMonth() + offsetMonth,
    _date.getDate() + offsetDay
  );

  console.log('*************');
  console.log(prevDate);
  console.log({ offsetMonth });
  console.log({ offsetDay });
  console.log('*************');

  const year = prevDate.getFullYear();
  const month = _dateAddZero(prevDate.getMonth() + 1); // JS month are 0-based
  const day = _dateAddZero(prevDate.getDate());

  // From API docs:
  // The date of data snapshot in dd-mm-yyyy eg. 30-12-2017
  const dateString = `${day}-${month}-${year}`;

  console.log('*************');
  console.log('###');
  console.log(prevDate);
  console.log({ year });
  console.log({ month });
  console.log({ day });
  console.log(dateString);
  console.log('*************');

  return dateString;
}

// Append 0 to single digit days + months
function _dateAddZero(datePart) {
  if (datePart < 10) return '0' + datePart;
  return datePart;
}

export { createDateString };
