import React from 'react';
import { useSelector } from 'react-redux';
import { 
    Text,
    ScrollView, 
    View, 
    TouchableOpacity 
} from 'react-native';
import { Linking } from 'expo';

import styles from './styles';

export default function Lyrics({ getCurrentTrack, lyrics }) {

    // const lyrics = useSelector(state => state.track.data);

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