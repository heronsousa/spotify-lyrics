import { AsyncStorage } from 'react-native';
import { encode as btoa } from 'base-64';
import getAuthorizationCode from './getAuthorizationCode';
import credentials from './credentials';

const { spotifyCredentials } = credentials;

async function getAcessToken() {

    try {
        const responseAuthCode = await getAuthorizationCode();
        const authorizationCode = responseAuthCode && responseAuthCode.params.code;

        const credsB64 = btoa(`${spotifyCredentials.clientId}:${spotifyCredentials.clientSecret}`);

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${spotifyCredentials.redirectUri}`,
        });
        const responseJson = await response.json();

        const {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: expiresIn,
        } = responseJson;

        const expirationTime = new Date().getTime() + expiresIn * 1000;
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        await AsyncStorage.setItem('expirationTime', JSON.stringify(expirationTime));

    } catch (err) {
        console.error(err);
    }
}

async function refreshTokens() {
    await getAcessToken();

    try {

        const credsB64 = btoa(`${spotifyCredentials.clientId}:${spotifyCredentials.clientSecret}`);
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
        });
        const responseJson = await response.json();

        if (responseJson.error) {
            await getTokens();
        } else {
            const {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
                expires_in: expiresIn,
            } = responseJson;

            const expirationTime = new Date().getTime() + expiresIn * 1000;
            await AsyncStorage.setItem('accessToken', newAccessToken);
            if (newRefreshToken) {
                await AsyncStorage.setItem('refreshToken', newRefreshToken);
            }
            await AsyncStorage.setItem('expirationTime', JSON.stringify(expirationTime));
        }
    } catch (err) {
        console.error(err)
    }
}

export {
    getAcessToken,
    refreshTokens
}