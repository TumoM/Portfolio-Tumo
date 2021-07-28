const mongoose = require('mongoose');
const Portfolio = mongoose.model('Portfolio');

exports.getPortfolios = async (req, res) => {
    const portfolios = await Portfolio.find({});
    return res.json(portfolios);
  }

exports.createPortfolio = async (req, res) => {
    // const portfolios = await Portfolio.find({});
    const portfolioData = req.body;
    // TODO Update the userId properly
    const userId = 'google-oauth2|100400768772540074722'
    const portfolio = new Portfolio(portfolioData);
    portfolio.userId = userId;

    try{
      const resPortfolio = await portfolio.save();
      return res.status(200).json({"Res":resPortfolio}).end();
    }
    catch(e){
      res.status(e.status || 422).json({message:e.message});
    }
  }

exports.getPortfolioById = async (req, res) => {
    try {
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
  }