const calculateValueChange = (curVal, prevVal) => {
  const result = ((curVal - prevVal) / prevVal) * 100;
  return result.toFixed(2);
};

export { calculateValueChange };
