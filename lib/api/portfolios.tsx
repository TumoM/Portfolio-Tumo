
import axios from "axios";

class PortfolioApi {
    private _apiUrl: string;
    private _config?: {headers?:object};

    constructor(accessToken=null) {
        this._config = {}

        if (accessToken) {
            console.log("Setting Headers");
            console.log('This.config1:',this._config)
            this._config.headers = {
            authorization: `Bearer ${accessToken}`
            }
            console.log('This.config2:',this._config)

        }

        // this.apiUrl = process.env.PORTFOLIO_API_URL + '/portfolios';
        this._apiUrl = process.env.PORTFOLIO_API_URL + '/portfolios';
    }


    getAll() {
        console.log("this._apiUrl:",this._apiUrl);
        return axios.get(this._apiUrl)
    }

    getById(id) {
        return axios.get(`${this._apiUrl}/${id}`)
    }

    create(data) {
        console.log("Making Post to:",this._apiUrl);
        return axios.post(this._apiUrl, data, this._config);
    }

    update(id, data) {
        debugger
        console.log("Making Patch to:",this._apiUrl);
        return axios.patch(`${this._apiUrl}/${id}`, data, this._config);
    }

    delete(id) {
        console.log("Making Delete to:",this._apiUrl);
        return axios.delete(`${this._apiUrl}/${id}`, this._config);
    }

}

export default PortfolioApi;
