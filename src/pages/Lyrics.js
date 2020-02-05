import React, { useState } from 'react';
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
    
    async function getCurrentTrack() {
        try{
            const currentTrack = await spotifyAPI.get('/currently-playing');
            
            setTrackAuthor(currentTrack.data?.item?.artists.map(artist => artist.name));
            setTrackName(currentTrack.data?.item?.name);
            setImageUrl(currentTrack.data?.item?.album?.images[0]?.url);
        
            // const response = await apiseeds.get(`${trackAuthor[0]}/${trackName}?apikey=${credentials.apiseedsKey}`);

            // setLyrics(response.data.result.track.text); 

        } catch (err) {
            console.log(err);

            setTrackAuthor([]);
            setTrackName('');
            setImageUrl('');
            setLyrics(''); 
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
        <View style={styles.container}>

            <View style={styles.musicInfo}>
                
                <Image source={ imageUrl ? { uri: imageUrl } : card_default} style={styles.musicImage} />
                
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
            
            <TouchableOpacity onPress={getCurrentTrack} style={styles.lyrics}>
                <Text>Lyrics</Text>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 10}}>
                <Text style={styles.lyrics}>{lyrics}</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 0
    },

    musicInfo: {
        flexDirection: 'row',
        backgroundColor: '#191414',
        padding: 15
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

    lyrics: {
        fontSize: 16,
        paddingBottom: 0,
        padding: 15,
    }
});