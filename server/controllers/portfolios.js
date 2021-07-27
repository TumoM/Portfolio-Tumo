const mongoose = require('mongoose');
const Portfolio = mongoose.model('Portfolio');


exports.getPortfolios = async (req, res) => {
    const portfolios = await Portfolio.find({});
    return res.json(portfolios);
  }

exports.getPortfoliosById = async (req, res) => {
    try {
        // const axiosRes = await axios.get('https://jsonplace/')
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio){
            return res.status(404).json({message:"Portfolio not found"})
        }
        return res.status(200).json(portfolio);
      }
      catch(e) {
        console.log(e);
        return res.status(e.status || 422).json({message:e.message});
        
      }
    const portfolios = await Portfolio.find({});
  }