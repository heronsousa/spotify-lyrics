import React, { useState, useEffect } from 'react';

import Lyrics from '../components/Lyrics';
import Header from '../components/Header';

import spotifyAPI from '../services/spotifyAPI';
import vagalumeAPI from '../services/vagalumeAPI.js';
import credentials from '../services/credentials.js';

export default function Track() {
    const [lyrics, setLyrics] = useState('');
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [trackInfo, setTrackInfo] = useState({artist: [], playButton: 'play-arrow', name: '', image: ''});

    useEffect(() => {
        async function getLyrics() { 
            try {
                const response = await vagalumeAPI.get(`/search.php?apikey=${credentials.vagalumeAPI}&art=${trackInfo.artist[0]}&mus=${trackInfo.name}`);
                
                setLyrics(response.data.type == 'song_notfound' ? 
                            'Letra não encontrada. =(' :
                            response.data?.mus[0]?.text);

            } catch (err) { 
                console.log(err);
            }
        }

        getLyrics();
    }, [trackInfo]);

    useEffect(() => {
        setTimeout(() => { getCurrentTrack() }, duration-progress);
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
                }
                else {
                    await spotifyAPI.put('/play');
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
            <Header 
                trackInfo={trackInfo} 
                trackFunctions={{play_pause, nextTrack, previousTrack}}
            />

            <Lyrics lyrics={lyrics} getCurrentTrack={getCurrentTrack}/>
        </>
    );
}