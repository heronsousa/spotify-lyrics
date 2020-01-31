import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView, AsyncStorage, Image } from 'react-native';
import SpotifyWebAPI from 'spotify-web-api-js';

import apiseeds from '../services/apiseeds.js';
import credentials from '../services/credentials.js';
import { refreshTokens } from '../services/getAcessToken';
import icon from './Spotify_Icon.png'

export default function Lyrics() {
    const [lyrics, setLyrics] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [trackName, setTrackName] = useState('');
    const [trackAuthor, setTrackAuthor] = useState('');

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
        
        const music = await sp.getMyCurrentPlayingTrack();
        
        setTrackAuthor(music.item?.album?.artists[0]?.name);
        setTrackName(music.item?.album?.name);
        setImageUrl(music.item?.album?.images[0]?.url);
    }

    async function getLyrics() {
        const response = await apiseeds.get(`Chris Brown/loyal?apikey=${credentials.apiseedsKey}`);
        
        setLyrics(response.data.result.track.text);
    }

    return (
        <View style={styles.container}>

            <View style={styles.musicInfo}>
                <Image source={{ uri: imageUrl }} style={styles.musicImage} />
                <View style={styles.musicStrigs}>
                    <Text style={styles.musicName}>{trackName}</Text>
                    <Text style={styles.musicAuthor}>{trackAuthor}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={getCurrentTrack} style={styles.lyrics}>
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
        flex: 1,
        backgroundColor: '#191414',
        padding: 20
    },

    musicInfo: {
        flexDirection: 'row'
    },
    
    musicImage: {
        width: 100, 
        height: 100,
        borderWidth: 2,
        borderColor: '#fff'
    },

    musicStrigs: {
        flexDirection: 'column',
        marginLeft: 15
    },

    musicName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },

    musicAuthor: {
        fontSize: 16,
        color: '#fff'
    },

    lyrics: {
        padding: 20,
        fontSize: 16
    }
});