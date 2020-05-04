import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Text,
    TouchableOpacity, 
    View,
    Image 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { requestCurrentTrack } from '../../store/actions';
import card_default from '../../assets/card_default.jpg'
import styles from './styles';
import spotifyAPI from '../../services/spotifyAPI';

export default function Header() {
    
    const dispatch = useDispatch();
    const currentTrack = useSelector(state => state.track.data);

    function getCurrentTrack() {
        dispatch(requestCurrentTrack({type: 'REQUEST_CURRENT_TRACK'}));
    }

    useEffect(() => {
        setTimeout(
            () => { getCurrentTrack() }, 
            currentTrack.duration-currentTrack.progress
        );
    },[currentTrack]);

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
        <View style={styles.musicInfo}>

            <Image source={currentTrack.image ? { uri: currentTrack.image } : card_default} style={styles.musicImage} />

            <View style={styles.musicStrigs}>

                <View>
                    <Text numberOfLines={1} style={styles.musicName}>{currentTrack.name}</Text>
                    <Text numberOfLines={1} style={styles.musicAuthor}>{currentTrack.artist ? currentTrack.artist.join(', ') : ''}</Text>
                </View>

                <View style={styles.musicButtons}>

                    <TouchableOpacity onPress={previousTrack}>
                        <MaterialIcons name="skip-previous" size={35} color={'white'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={play_pause}>
                        <MaterialIcons name={currentTrack.playButton} size={35} color={'white'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={nextTrack}>
                        <MaterialIcons name="skip-next" size={35} color={'white'} />
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );
}