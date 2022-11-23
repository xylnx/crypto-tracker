function toUnixTimestamp(date) {
  const _date = new Date(date);
  const timestamp = Math.floor(_date.getTime() / 1000);
  return timestamp;
}

export { toUnixTimestamp };
