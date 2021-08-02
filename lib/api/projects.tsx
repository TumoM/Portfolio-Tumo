
import axios from "axios";

class ProjectApi {
    private _apiUrl: string;
    private _config?: {headers?:object};

    constructor(accessToken=null) {
        this._config = {}

        if (accessToken) {
            console.log("Setting Project Headers");
            console.log('This.config1:',this._config)
            this._config.headers = {
            authorization: `Bearer ${accessToken}`
            }
            console.log('This.config2:',this._config)

        }

        this._apiUrl = process.env.API_URL + '/projects';
    }


    getAll() {
        console.log("this._apiUrl:",this._apiUrl);
        return axios.get(this._apiUrl)
    }

    getById(id) {
        return axios.get(`${this._apiUrl}/${id}`)
    }

    create(data) {
        console.log("Making Project Post to:",this._apiUrl);
        return axios.post(this._apiUrl, data, this._config);
    }

    update(id, data) {
        debugger
        console.log("Making Project Patch to:",this._apiUrl);
        return axios.patch(`${this._apiUrl}/${id}`, data, this._config);
    }

    delete(id) {
        console.log("Making Project Delete to:",this._apiUrl);
        return axios.delete(`${this._apiUrl}/${id}`, this._config);
    }

}

export default ProjectApi;
