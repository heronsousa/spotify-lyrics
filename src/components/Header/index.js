import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Text,
    TouchableOpacity, 
    View,
    Image 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { requestCurrentTrack } from '../../store/actions/track';
import spotifyAPI from '../../services/api/spotifyAPI';

import card_default from '../../assets/card_default.jpg'
import styles from './styles';

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
                        await spotifyAPI.put('/pause')
                            .catch(err => console.error(err));
                    }
                    else {
                        await spotifyAPI.put('/play')
                            .catch(err => console.error(err));
                    }
                    getCurrentTrack()
                }
            });
    }

    async function nextTrack() {
        await spotifyAPI.post('/next')
            .then(getCurrentTrack)
            .catch(err => console.error(err));
    }

    async function previousTrack() {
        await spotifyAPI.post('/previous')
            .then(getCurrentTrack)
            .catch(err => console.error(err));
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