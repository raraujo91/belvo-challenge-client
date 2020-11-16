import axios from 'axios';

const BASE_URL = "https://belvo-renan-app.herokuapp.com"

const api = axios.create({
    baseURL: `${BASE_URL}/sandbox`
});

export default api;