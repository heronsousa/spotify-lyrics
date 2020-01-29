import axios from 'axios';

const apiseeds = axios.create({
    baseURL: 'https://orion.apiseeds.com/api/music/lyric'
});

export default apiseeds;