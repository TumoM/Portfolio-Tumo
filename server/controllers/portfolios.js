module.exports.getPortfolios = async (req, res) => {
    try {
        // const axiosRes = await axios.get('https://jsonplace/')
        // const axiosRes = await axios.get('https://jsonplaceholder.typicode.com/posts')
        // const posts = axiosRes.data
        return res.status(200).json({data:[1,2,3,4]});
      }
      catch(e) {
        console.log(e);
        return res.status(e.status || 400).json({message:'Api Error!'});
        
      }
};