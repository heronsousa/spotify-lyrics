import SpotifyWebAPI from 'spotify-web-api-js';
import { AsyncStorage } from 'react-native';

import { refreshTokens } from '../services/getAcessToken';

const spotifyWebAPI = async () => {
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
    
    let sp = new SpotifyWebAPI();
    
    const accessToken = await AsyncStorage.getItem('accessToken');
    sp.setAccessToken(accessToken);   
    
    console.log()
    
    return sp;
}

export default spotifyWebAPI;