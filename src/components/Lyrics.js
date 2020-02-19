import React, { useState, useEffect } from 'react';
import { 
    Text, 
    StyleSheet, 
    ScrollView, 
    View, 
    TouchableOpacity 
} from 'react-native';
import { Linking } from 'expo';

export default function Lyrics({ lyrics, getCurrentTrack }) {

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    lyricsContainer: {
        flex: 1,
        padding: 10,
        paddingBottom: 0
    },

    lyrics: {
        fontSize: 16 
    },

    button: {
        height: 50,
        width: 280,
        borderWidth: 3,
        borderColor: '#191414',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },

    buttonText: {
        color: '#191414',
        fontSize: 16,
        fontWeight: 'bold'
    }
});