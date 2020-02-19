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

    return (
        <View style={styles.musicInfo}>

            <Image source={trackInfo.image ? { uri: trackInfo.image } : card_default} style={styles.musicImage} />

            <View style={styles.musicStrigs}>

                <View>
                    <Text numberOfLines={1} style={styles.musicName}>{trackInfo.name}</Text>
                    <Text numberOfLines={1} style={styles.musicAuthor}>{trackInfo.artist ? trackInfo.artist.join(', ') : ''}</Text>
                </View>

                <View style={styles.musicButtons}>

                    <TouchableOpacity onPress={trackFunctions.previousTrack}>
                        <MaterialIcons name="skip-previous" size={35} color={'white'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={trackFunctions.play_pause}>
                        <MaterialIcons name={trackInfo.playButton} size={35} color={'white'} />
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


