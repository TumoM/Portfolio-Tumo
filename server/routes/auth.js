const express = require('express');
const axios = require('axios')
let router = express.Router()

// define the home page route
router.get('/', async (req, res) => {
    res.status(200).json({message:"This is the login route"})
})


module.exports = router
