import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Text,
    ScrollView,
    RefreshControl,
    View, 
    TouchableOpacity
} from 'react-native';
import { Linking } from 'expo';

import { requestCurrentTrack } from '../../store/actions/track';
import credentials from '../../services/credentials.js';
import vagalumeAPI from '../../services/api/vagalumeAPI.js';

import styles, {
    LyricsContainer,
    Container,
    Letter,
    Button,
    ButtonText
} from './styles';

export default function Lyrics() {

    const [lyrics, setLyrics] = useState('');

    const scrollRef = useRef(null);

    const dispatch = useDispatch();
    const currentTrack = useSelector(state => state.track.data);

    function getCurrentTrack() {
        dispatch(requestCurrentTrack({type: 'REQUEST_CURRENT_TRACK'}));
    }

    async function getLyrics() { 
        try {
            const response = await vagalumeAPI.get(`/search.php?apikey=${credentials.vagalumeAPI}&art=${currentTrack.artist[0]}&mus=${currentTrack.name}`);

            const type = response.data.type;
            setLyrics(type.includes('notfound') ? 'Letra não encontrada.' : response.data?.mus[0]?.text);

            if (scrollRef.current) {
                scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
            }

        } catch (err) { 
            console.log(err);
        }
    }

    if (currentTrack.name) 
        getLyrics();

    return (
        <>
            {lyrics ?
                <LyricsContainer>
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        ref={scrollRef}
                        refreshControl={
                            <RefreshControl 
                                progressViewOffset={40}
                                refreshing={false}
                                onRefresh={getCurrentTrack}
                            />
                        }
                    >
                        <Letter>{lyrics}</Letter>
                    </ScrollView>
                </LyricsContainer>
             : 
                <Container>
                    <Button
                        onPress={() => (
                            Linking.openURL('spotify:'),
                            setTimeout(() => { getCurrentTrack() }, 1)
                            )
                        }
                    >
                        <ButtonText>ENTRAR NO SPOTIFY</ButtonText>
                    </Button>
                </Container> 
            }
        </>
  );
}