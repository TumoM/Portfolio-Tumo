const express = require('express');
const axios = require('axios')
let router = express.Router()

const { data } = require('../data');

// // middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })
// define the home page route
router.get('/', async (req, res) => {
    try {
        // const axiosRes = await axios.get('https://jsonplace/')
        const axiosRes = await axios.get('https://jsonplaceholder.typicode.com/posts')
        const posts = axiosRes.data
        return res.status(200).json(posts.slice(0,10));
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
