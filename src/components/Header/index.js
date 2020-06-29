import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { requestCurrentTrack } from '../../store/actions/track';
import spotifyAPI from '../../services/api/spotifyAPI';

import card_default from '../../assets/card_default.jpg'
import {
    Container,
    Image,
    MusicInfo,
    ButtonsContainer,
    MusicName,
    MusicArtists
} from './styles';

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

    function handleError(status) {
        switch (status) {
            case 404:
                alert("Spotify está desconectado.");
                break;
            
            case 403:
                alert("Infelizmente o spotify disponibilza esse recurso apenas para usuários premium.");
                break;

            case "Network Error":
                alert("Verifique sua conexão com a internet.");
                break;

            default:
                break;
        }
    }

    async function play_pause() {
        if (currentTrack.playButton === 'pause') {
            try {
                await spotifyAPI.put('player/pause');
            } catch (error) {
                handleError(error.message==="Network Error" ? "Network Error" : error.response.status);
            }
        }
        else {
            try {
                await spotifyAPI.put('player/play');
            } catch (error) {
                handleError(error.message==="Network Error" ? "Network Error" : error.response.status);
            }
        }
        getCurrentTrack();
    }

    async function nextTrack() {
        try {
            await spotifyAPI.post('player/next');
        } catch (error) {
            handleError(error.message==="Network Error" ? "Network Error" : error.response.status);
        }
        getCurrentTrack();
    }

    async function previousTrack() {
        try {
            await spotifyAPI.post('player/previous');
        } catch (error) {
            handleError(error.message==="Network Error" ? "Network Error" : error.response.status);
        }
        getCurrentTrack();
    }

    return (
        <Container>
            <Image source={currentTrack.image ? { uri: currentTrack.image } : card_default} />

            <MusicInfo>
                <>
                    <MusicName numberOfLines={1}>{currentTrack.name}</MusicName>
                    <MusicArtists numberOfLines={1}>{currentTrack.artist ? currentTrack.artist.join(', ') : ''}</MusicArtists>
                </>

                <ButtonsContainer>
                    <TouchableOpacity onPress={previousTrack}>
                        <MaterialIcons name="skip-previous" size={35} color={'#fff'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={play_pause}>
                        <MaterialIcons name={currentTrack.playButton} size={35} color={'#fff'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={nextTrack}>
                        <MaterialIcons name="skip-next" size={35} color={'#fff'} />
                    </TouchableOpacity>
                </ButtonsContainer>
            </MusicInfo>
        </Container>
    );
}