const express = require('express');
const exchangeController = require('../../controllers/exchangeRates.controller');

const router = express.Router();

router.get('/', exchangeController.getRates);

module.exports = router;
