import React, { useState, useEffect } from 'react';
import { 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    View, 
    ScrollView, 
    Image 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import spotifyAPI from '../services/spotifyAPI';
import apiseeds from '../services/apiseeds.js';
import credentials from '../services/credentials.js';
import card_default from './card_default.jpg'

export default function Lyrics() {
    const [lyrics, setLyrics] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [trackName, setTrackName] = useState('');
    const [trackAuthor, setTrackAuthor] = useState([]);
    const [playButton, setPlayButton] = useState('play-arrow');

    useEffect(() => {

        async function getLyrics() {
            try{
                const response = await apiseeds.get(`${trackAuthor[0]}/${trackName}?apikey=${credentials.apiseedsKey}`);
                setLyrics(response.data.result.track.text); 
            } catch (err) {
                console.log(err)
            }
        }
            
        getLyrics();
            
    }, [trackName]);

    async function getCurrentTrack() {

        const currentTrack = await spotifyAPI.get('/me/player/currently-playing');
        
        setTrackAuthor(currentTrack.data?.item?.artists.map(artist => artist.name));
        setTrackName(currentTrack.data?.item?.name);
        setImageUrl(currentTrack.data?.item?.album?.images[0]?.url);
    }

    async function play_pause(){
        await spotifyAPI.get('/me/player/currently-playing')
            .then( async (response) => {
                if(response) {
                    if(response.data.is_playing) {
                        await spotifyAPI.put('/me/player/pause');
                        setPlayButton('play-arrow')
                    }
                    else {
                        await spotifyAPI.put('/me/player/play');
                        setPlayButton('pause');
                    }
                }
            }
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.musicInfo}>
                
                <Image source={ imageUrl ? { uri: imageUrl } : card_default} style={styles.musicImage} />
                
                <View style={styles.musicStrigs}>
                
                    <View>
                        <Text style={styles.musicName}>{trackName}</Text>
                        <Text style={styles.musicAuthor}>{trackAuthor.join(', ')}</Text>
                    </View>

                    <View style={styles.musicButtons}>
                        
                        <TouchableOpacity onPress={()=>{}}>
                            <MaterialIcons name="skip-previous" size={35} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={play_pause}>
                            <MaterialIcons name={playButton} size={35} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={()=>{}}>
                            <MaterialIcons name="skip-next" size={35} />
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </View>
            
            <TouchableOpacity onPress={getCurrentTrack} style={styles.lyrics}>
                <Text>Lyrics</Text>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.lyrics}>{lyrics}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        paddingBottom: 0
    },

    musicInfo: {
        flexDirection: 'row'
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
        marginLeft: 10
    },

    musicName: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    musicAuthor: {
        fontSize: 14
    },

    musicButtons: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  

    lyrics: {
        marginTop: 10,
        fontSize: 16
    }
});