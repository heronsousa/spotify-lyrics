import axios from 'axios';

const api = axios.create({
    baseURL: 'https://orion.apiseeds.com/api/music/lyric'
});

export default api;