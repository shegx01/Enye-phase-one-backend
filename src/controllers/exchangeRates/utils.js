const extractCurrencyList = (currencyList, rates) => {
  const rateEntries = Object.entries(rates);
  return currencyList.reduce((accum, currentVal) => {
    rateEntries.forEach((rateProps) => {
      if (currentVal === rateProps[0]) {
        const key = rateProps[0];
        const value = rateProps[1];
        accum[key] = value;
      }
    });
    return accum;
  }, {});
};

const getFormattedToday = () => {
  const now = new Date();
  const _month = now.getMonth()
  return `${now.getFullYear()}-${_month + 1}-${now.getDate()}`;
}

module.exports = {
  extractCurrencyList,
  getFormattedToday,
};
