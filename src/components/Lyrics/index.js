import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Text,
    ScrollView, 
    View, 
    TouchableOpacity 
} from 'react-native';
import { Linking } from 'expo';

import { requestCurrentTrack } from '../../store/actions/track';
import credentials from '../../services/credentials.js';
import vagalumeAPI from '../../services/api/vagalumeAPI.js';

import styles from './styles';

export default function Lyrics() {

    const [lyrics, setLyrics] = useState('');

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

        } catch (err) { 
            console.log(err);
        }
    }

    if (currentTrack.name) 
        getLyrics();

    return (
        <>
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
                            setTimeout(() => { getCurrentTrack() }, 1)
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