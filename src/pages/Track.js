import React, { useState, useEffect } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Linking } from 'expo';

// import Lyrics from '../components/Lyrics';
// import Header from '../components/Header';

import card_default from '../assets/card_default.jpg'
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

    useEffect(() => {
        async function getLyrics() {
            try {
                const response = await vagalumeAPI.get(`/search.php?apikey=${credentials.vagalumeAPI}&art=${trackAuthor[0]}&mus=${trackName}`);

                setLyrics(response.data?.mus[0]?.text);

            } catch (err) {
                setLyrics(' ');
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

            setPlayButton(currentTrack.data.is_playing ? 'pause' : 'play-arrow');
            setTrackAuthor(currentTrack.data?.item?.artists.map(artist => artist.name));
            setTrackName(currentTrack.data?.item?.name);
            setImageUrl(currentTrack.data?.item?.album?.images[0]?.url);
            setDuration(currentTrack.data?.item?.duration_ms);
            setProgress(currentTrack.data?.progress_ms);

        } catch (err) {
            console.log(err);
        }
    }

    async function play_pause() {
        getCurrentTrack()

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
            <View style={styles.musicInfo}>

                <Image source={imageUrl ? { uri: imageUrl } : card_default} style={styles.musicImage} />

                <View style={styles.musicStrigs}>

                    <View>
                        <Text numberOfLines={1} style={styles.musicName}>{trackName}</Text>
                        <Text numberOfLines={1} style={styles.musicAuthor}>{trackAuthor.join(', ')}</Text>
                    </View>

                    <View style={styles.musicButtons}>

                        <TouchableOpacity onPress={previousTrack}>
                            <MaterialIcons name="skip-previous" size={35} color={'white'} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={play_pause}>
                            <MaterialIcons name={playButton} size={35} color={'white'} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={nextTrack}>
                            <MaterialIcons name="skip-next" size={35} color={'white'} />
                        </TouchableOpacity>

                    </View>

                </View>

            </View>


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
                            setTimeout(() => {  getCurrentTrack() }, 2000)
                            )}>
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

    musicInfo: {
        flexDirection: 'row',
        backgroundColor: '#191414',
        padding: 15,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: 'white'
    },

    musicImage: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: '#fff'
    },

    musicStrigs: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 10,
        flex: 1
    },

    musicName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },

    musicAuthor: {
        fontSize: 14,
        color: '#fff'
    },

    musicButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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