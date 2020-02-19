import React, { useState, useEffect } from 'react';
import { 
    Text,
    TouchableOpacity, 
    View,
    StyleSheet,
    Image 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import card_default from '../assets/card_default.jpg'

export default function Header({ trackInfo, trackFunctions }) {
    
    const [imageUrl, setImageUrl] = useState('');
    const [trackName, setTrackName] = useState('');
    const [trackAuthor, setTrackAuthor] = useState([]);
    const [playButton, setPlayButton] = useState('play-arrow');

    useEffect(()=>{
        setTrackAuthor(trackInfo.artist ? trackInfo.artist : []);
        setTrackName(trackInfo.name);
        setImageUrl(trackInfo.image); 
        setPlayButton(trackInfo.playButton);
     });

    return (
        <View style={styles.musicInfo}>

            <Image source={imageUrl ? { uri: imageUrl } : card_default} style={styles.musicImage} />

            <View style={styles.musicStrigs}>

                <View>
                    <Text numberOfLines={1} style={styles.musicName}>{trackName}</Text>
                    <Text numberOfLines={1} style={styles.musicAuthor}>{trackAuthor ? trackAuthor.join(', ') : ''}</Text>
                </View>

                <View style={styles.musicButtons}>

                    <TouchableOpacity onPress={trackFunctions.previousTrack}>
                        <MaterialIcons name="skip-previous" size={35} color={'white'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={trackFunctions.play_pause}>
                        <MaterialIcons name={playButton} size={35} color={'white'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={trackFunctions.nextTrack}>
                        <MaterialIcons name="skip-next" size={35} color={'white'} />
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    musicInfo: {
        flexDirection: 'row',
        backgroundColor: '#191414',
        padding: 15,
        borderTopWidth: 1,
        borderBottomColor: 'white'
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
    }
});


