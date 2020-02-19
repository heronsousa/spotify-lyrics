import React, { useState, useEffect } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import { Linking } from 'expo';

// import Lyrics from '../components/Lyrics';
import Header from '../components/Header';

import spotifyAPI from '../services/spotifyAPI';
import vagalumeAPI from '../services/vagalumeAPI.js';
import credentials from '../services/credentials.js';

export default function Track() {
    const [lyrics, setLyrics] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [trackName, setTrackName] = useState('');
    const [trackAuthor, setTrackAuthor] = useState([]);
    const [playButton, setPlayButton] = useState('play-arrow');
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [trackInfo, setTrackInfo] = useState({artist: [], playButton: '', name: '', image: ''});

    useEffect(() => {
        async function getLyrics() {
            try {
                const response = await vagalumeAPI.get(`/search.php?apikey=${credentials.vagalumeAPI}&art=${trackAuthor[0]}&mus=${trackName}`);

                setLyrics(response.data?.mus[0]?.text);

            } catch (err) { 
                console.log(err);
            }
        }

        getLyrics();
    }, [trackName]);

    useEffect(() => {
        setTimeout(() => {getCurrentTrack()}, duration-progress);
    },[progress]);

    async function getCurrentTrack() {
        try {
            const currentTrack = await spotifyAPI.get('/currently-playing');

            const artist = currentTrack.data?.item?.artists.map(artist => artist.name);
            const playButton = currentTrack.data.is_playing ? 'pause' : 'play-arrow';
            const name = currentTrack.data?.item?.name;
            const image = currentTrack.data?.item?.album?.images[0]?.url;
            
            setTrackInfo({artist, playButton, name, image});            
            setDuration(currentTrack.data?.item?.duration_ms);
            setProgress(currentTrack.data?.progress_ms);

        } catch (err) {
            console.log(err);
        }
    }

    async function play_pause() {
        
        await spotifyAPI.get('/currently-playing')
        .then(async (response) => {
            if (response) {
                if (response.data.is_playing) {
                    await spotifyAPI.put('/pause');
                    setPlayButton('play-arrow')
                }
                else {
                    await spotifyAPI.put('/play');
                    setPlayButton('pause');
                }
                getCurrentTrack()
            }
            });
    }

    async function nextTrack() {
        try {
            await spotifyAPI.post('/next');
            getCurrentTrack();
        } catch (error) {
            console.log(error)
        }
    }

    async function previousTrack() {
        try {
            await spotifyAPI.post('/previous');
            getCurrentTrack();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header trackInfo={trackInfo} trackFunctions={{play_pause, nextTrack, previousTrack}}/>

            {lyrics ? 
                <View style={styles.lyricsContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.lyrics}>{lyrics}</Text>
                    </ScrollView>
                </View>
            :    
                <View style={styles.container}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => (
                            Linking.openURL('spotify:'),
                            setTimeout(() => {  getCurrentTrack() }, 1)
                            )
                        }
                    >
                        <Text style={styles.buttonText}>ENTRAR NO SPOTIFY</Text>
                    </TouchableOpacity>
                </View>
            }

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    lyricsContainer: {
        flex: 1,
        padding: 10,
        paddingBottom: 0
    },

    lyrics: {
        fontSize: 16 
    },

    button: {
        height: 50,
        width: 280,
        borderWidth: 3,
        borderColor: '#191414',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },

    buttonText: {
        color: '#191414',
        fontSize: 16,
        fontWeight: 'bold'
    }
});