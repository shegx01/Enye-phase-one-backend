const fetch = require('node-fetch');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const getExchangeRates = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (e) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal Error:  Exchange Service Unavailable');
  }
};

module.exports = {
  getExchangeRates,
};
