const express = require('express');
const axios = require('axios')
let router = express.Router()
import { getPortfolios, getPortfolioById, createPortfolio } from '../controllers/portfolios'
const { withAuth } = require('../middleware/auth')
// Get all portfolios
router.get('', getPortfolios)

// Get a portfolio by id
router.get('/:id', getPortfolioById)

// Post new portfolio
router.post('', withAuth, createPortfolio)



module.exports = router

