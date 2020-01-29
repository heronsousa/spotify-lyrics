import { encode as btoa } from 'base-64';
import getAuthorizationCode from './getAuthorizationCode';
import credentials from './credentials';

const { spotifyCredentials } = credentials;

const getAcessToken = async () => {

    const responseAuthCode = await getAuthorizationCode();
    const authorizationCode = responseAuthCode.params.code;

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
    
    return responseJson;
}

export default getAcessToken;