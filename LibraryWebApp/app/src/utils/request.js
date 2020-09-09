import axios from 'axios';

const source = axios.CancelToken.source();

const baseUrl = process.env.NODE_ENV === 'production' ? "http://120.24.89.48:2005/" : "http://localhost:2005/"


const request = axios.create({
    baseURL:baseUrl + 'api',
    withCredentials:true
});

request.source = source;

export default request;