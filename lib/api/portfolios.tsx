
import axios from "axios";

class PortfolioApi {
    private _apiUrl: string;
    // _apiUrl;
    constructor() {
        this._apiUrl = process.env.PORTFOLIO_API_URL+'/portfolios';
    }

getAll() {
    console.log("this._apiUrl:",this._apiUrl);
    
    return axios.get(this._apiUrl)
}

getById(id) {
    return axios.get(`${this._apiUrl}/${id}`)
}
}

export default PortfolioApi;