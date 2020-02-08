import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Lyrics from '../components/Lyrics';
import Header from '../components/Header';

import spotifyAPI from '../services/spotifyAPI';
import apiseeds from '../services/apiseeds.js';
import credentials from '../services/credentials.js';

export default function Track() {
    const [lyrics, setLyrics] = useState(' ');
    const [playButton, setPlayButton] = useState('play-arrow');
    const [trackInfo, setTrackInfo] = useState({});

    useEffect(() => {
        async function getLyrics() {
            try{
                const response = await apiseeds.get(`${trackInfo?.author[0]}/${trackInfo?.name}?apikey=${credentials.apiseedsKey}`);
                setLyrics(response.data.result.track.text);

            } catch (err) {
                console.log(err);
            }
        }

        getLyrics();
    }, [trackInfo]);
    
    async function getCurrentTrack() {
        try{
            const currentTrack = await spotifyAPI.get('/currently-playing');

            const author = currentTrack.data?.item?.artists.map(artist => artist.name);
            const name = currentTrack.data?.item?.name;
            const image = currentTrack.data?.item?.album?.images[0]?.url;

            setTrackInfo({author, name, image, playButton});

        } catch (err) {
            console.log(err);
            
            setLyrics(''); 
            setTrackInfo({});
        }
    }

    async function play_pause() {
        await spotifyAPI.get('/currently-playing')
            .then( async (response) => {
                if(response) {
                    if(response.data.is_playing) {
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
        } catch (error) {
            console.log(error)
        }
    }

    async function previousTrack() {
        try {
            await spotifyAPI.post('/previous');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header trackInfo={trackInfo} />

            <TouchableOpacity onPress={getCurrentTrack}>
                <Text>Lyrics</Text>
            </TouchableOpacity>
            
            <Lyrics lyrics={lyrics} />
        </>
    );
}
