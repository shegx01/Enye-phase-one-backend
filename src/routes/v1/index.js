const express = require('express');
const exchangeRateRoute = require('./exchangeRates.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/rates',
    route: exchangeRateRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
