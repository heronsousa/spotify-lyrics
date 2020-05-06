import axios from 'axios';
import { AsyncStorage } from 'react-native';

import { refreshTokens } from '../auth/getAcessToken';

const instance = axios.create({
    baseURL: 'https://api.spotify.com/v1/me/player'
});

instance.interceptors.request.use(
    
    async config => {
        
        const tokenExpirationTime = await AsyncStorage.getItem('expirationTime', (err, value) => {
            if (err) {
                console.log(err)
            } else {
                JSON.parse(value)
            }
        })
        
        if (new Date().getTime() > tokenExpirationTime) {
            await refreshTokens();
        }

        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;