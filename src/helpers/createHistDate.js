function createHistDate({ date = 0, offsetDay = 0, offsetMonth = 0 } = {}) {
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
  return prevDate;
}

export { createHistDate };
