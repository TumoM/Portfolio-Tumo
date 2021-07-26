const express = require('express');
const axios = require('axios')
let router = express.Router()
const { getPortfolios } = require('../controllers/portfolios')

// define the home page route
router.get('/', getPortfolios)

// define the home page route
router.get('/:id', async (req, res) => {
  console.log("Getting Post by ID");  
  const id = req.params.id;
    try {
        // const axiosRes = await axios.get('https://jsonplace/')
        const axiosRes = await axios.get('https://jsonplaceholder.typicode.com/posts/'+id)
        const post = axiosRes.data
        return res.status(200).json(post);
      }
      catch(e) {
        console.log(e);
        return res.status(e.status || 400).json({message:'Api Error!'});
        
      }
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
