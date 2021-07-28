
import axios from "axios";

class PortfolioApi {
    private _apiUrl: string;
    // _apiUrl;
    constructor() {
        // this._apiUrl = process.env.PORTFOLIO_API_URL+'/portfolios';
        this._apiUrl = 'http://localhost:3001/api/v1/portfolios';
    }

    getAll() {
        console.log("this._apiUrl:",this._apiUrl);
        return axios.get(this._apiUrl)
    }

    getById(id) {
        return axios.get(`${this._apiUrl}/${id}`)
    }

    createPortfolio(data) {
        console.log("this._apiUrl2:",this._apiUrl);
        console.log("this._apiUrl Data:",data);
        return axios.post(this._apiUrl, data)
    }

}

export default PortfolioApi;