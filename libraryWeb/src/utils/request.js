import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'production' ? "http://120.24.89.48/" : "http://localhost:2003/"
const request = axios.create({
    baseURL:baseUrl + 'api'
});

export default request;