import * as AuthSession from 'expo-auth-session';

import credentials from '../credentials';

const { spotifyCredentials } = credentials;

const scopesArr = ['user-modify-playback-state','user-read-currently-playing','playlist-read-private','user-top-read'];
const scopes = scopesArr.join(' ');

const getAuthorizationCode = async () => {
    try {
        const redirectUrl = AuthSession.getRedirectUrl();

        const result = await AuthSession.startAsync({
            authUrl:
                'https://accounts.spotify.com/authorize' +
                '?response_type=code' +
                '&client_id=' +
                spotifyCredentials.clientId +
                (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
                '&redirect_uri=' +
                encodeURIComponent(redirectUrl) +
                '&show_dialog=true',
        })
        return result;

    } catch (err) {
        console.error(err)
    }
}

export default getAuthorizationCode;