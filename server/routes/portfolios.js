const express = require('express');
const axios = require('axios')
let router = express.Router()
const { getPortfolios, getPortfoliosById } = require('../controllers/portfolios')

// Get all portfolios
router.get('/', getPortfolios)

// define the home page route
router.get('/:id', getPortfoliosById)


module.exports = router
