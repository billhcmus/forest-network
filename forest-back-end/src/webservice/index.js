import axios from 'axios';
import {API_URL} from '../config';

export default class WebService {
    constructor() {
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
    }

    get(endpoint, options=null) {
        const url = `${API_URL}/${endpoint}`;
        return axios.get(url)
    }

    post(endpoint="", data={}, options = {headers: {'Content-Type': 'application/json'}}) {
        const url = `${API_URL}/${endpoint}`;

        console.log(data)
        return axios.post(url, data, options);
    }
    // post(endpoint="", data={}, options = {headers: {'Content-Type': 'multipart/form-data'}}) {
    //     const url = `${API_URL}/${endpoint}`;
    //     return axios.post(url, data, options);
    // }
}