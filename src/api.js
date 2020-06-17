import axios from 'axios';

const api = axios.create({
    baseURL: 'https://versaosoftwarecliente-backend2.herokuapp.com'
});

export default api;