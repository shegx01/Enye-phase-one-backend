/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const catchAsync = require('../utils/catchAsync');
const { exchangeRateService } = require('../services');
const { extractCurrencyList, getFormattedToday } = require('./exchangeRates/utils');

const getRates = catchAsync(async (req, res) => {
  const { base, currency } = req.query;
  // Error support for when there's no base, currency or both
  if ((!base && !currency) || !base || !currency)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Request Error: Please check base & currency list supplied, valid query string example: ?base=ZAR&currency=USD,GBP,USD`
    );
  const { rates } = await exchangeRateService.getExchangeRates(config.exchange_uri);
  const validBase = Object.entries(rates).some((curr) => curr[0] === base);
  // Error support for when base currency is not valid
  if (!validBase) throw new ApiError(httpStatus.BAD_REQUEST, `Request Error: base currency ${base} is not supported yet`);
  let currencyList = currency.split(/,/);
  currencyList = currencyList.map((currencyID) => currencyID.toUpperCase());
  const requestedRates = extractCurrencyList(currencyList, rates);
  // Error support for when no valid currency is specified
  if (Object.keys(requestedRates).length === 0)
    throw new ApiError(httpStatus.BAD_REQUEST, `Request Error: no valid currency to return for currencies ${currency}`);
  const date = getFormattedToday();

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
