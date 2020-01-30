import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView, AsyncStorage } from 'react-native';
import SpotifyWebAPI from 'spotify-web-api-js';

import apiseeds from '../services/apiseeds.js';
import credentials from '../services/credentials.js';

export default function Lyrics() {
    const [lyrics, setLyrics] = useState('');

    async function getCurrentTrack() {
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
        
        const user = await sp.getMe();
        const music = await sp.getMyCurrentPlayingTrack();
        console.log(music);
    }

    async function getLyrics() {
        const response = await apiseeds.get(`Chris Brown/loyal?apikey=${credentials.apiseedsKey}`);
        
        setLyrics(response.data.result.track.text);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={getCurrentTrack}>
                <Text>Lyrics</Text>
            </TouchableOpacity>

            <ScrollView>
                <Text style={styles.lyrics}>{lyrics}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    lyrics: {
        padding: 20,
        fontSize: 16
    }
});