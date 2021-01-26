const config = require('../config/config');
const catchAsync = require('../utils/catchAsync');
const { exchangeRateService } = require('../services');
const { extractCurrencyList, getFormattedToday } = require('./exchangeRates/utils');

const getRates = catchAsync(async (req, res) => {
  const { base, currency } = req.query;
  let currencyList = currency.split(/,/);
  currencyList = currencyList.map((currencyID) => currencyID.toUpperCase());
  const { rates } = await exchangeRateService.getExchangeRates(config.exchange_uri);
  const requestedRates = extractCurrencyList(currencyList, rates);
  const date = getFormattedToday()

  res.send({
    results: {
      base,
      currency,
      rates: requestedRates,
      date,
    },
  });
});

module.exports = {
  getRates,
};
