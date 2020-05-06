import axios from 'axios';

const vagalumeAPI = axios.create({
    baseURL: 'https://api.vagalume.com.br'
});

export default vagalumeAPI;