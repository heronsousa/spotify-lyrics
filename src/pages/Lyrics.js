import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, ScrollView, Image } from 'react-native';

import spotifyAPI from '../services/spotifyAPI';
import apiseeds from '../services/apiseeds.js';
import credentials from '../services/credentials.js';
import card_default from './card_default.jpg'

export default function Lyrics() {
    const [lyrics, setLyrics] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [trackName, setTrackName] = useState('');
    const [trackAuthor, setTrackAuthor] = useState([]);

    useEffect(() => {
        
        async function getLyrics() {
            const response = await apiseeds.get(`${trackAuthor[0]}/${trackName}?apikey=${credentials.apiseedsKey}`);

            setLyrics(response.data.result.track.text);
        }
            
        getLyrics();
            
    }, [trackName]);


    async function getCurrentTrack() {

        const currentTrack = await spotifyAPI.get('/me/player/currently-playing');

        console.log(currentTrack);
        
        setTrackAuthor(currentTrack.data?.item?.artists.map(artist => artist.name));
        setTrackName(currentTrack.data?.item?.name);
        setImageUrl(currentTrack.data?.item?.album?.images[0]?.url);
    }

    async function play(){
        await spotifyAPI.put('/me/player/play');
    }

    async function pause(){
        await spotifyAPI.put('/me/player/pause');
    }

    return (
        <View style={styles.container}>

            <View style={styles.musicInfo}>
                <Image source={ imageUrl ? { uri: imageUrl } : card_default} style={styles.musicImage} />
                <View style={styles.musicStrigs}>
                    <Text style={styles.musicName}>{trackName}</Text>
                    <Text style={styles.musicAuthor}>{trackAuthor.join(', ')}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={getCurrentTrack} style={styles.lyrics}>
                <Text>Lyrics</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={pause} style={styles.lyrics}>
                <Text>pause</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={play} style={styles.lyrics}>
                <Text>play</Text>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.lyrics}>{lyrics}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        paddingBottom: 0
    },

    musicInfo: {
        flexDirection: 'row'
    },
    
    musicImage: {
        width: 80, 
        height: 80,
        borderWidth: 2,
        borderColor: '#fff'
    },

    musicStrigs: {
        flexDirection: 'column',
        marginLeft: 10
    },

    musicName: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    musicAuthor: {
        fontSize: 16
    },

    lyrics: {
        marginTop: 10,
        fontSize: 16
    }
});