import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';

import getAcessToken from '../services/getAcessToken';

import icon from './Spotify_Icon.png'

export default function Login({ navigation }) {

    async function getAcess() {
        const response = await getAcessToken();
        console.log(response);
    }

    return (
        <View style={styles.container}>
            <Image source={icon} style={styles.image} />

            <TouchableOpacity style={styles.button} onPress={getAcess}>
                <Text style={styles.buttonText}>CONECTAR-SE COM O SPOTIFY</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191414',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        height: 80,
        width: 80,
        marginBottom: 50
    },

    button: {
        height: 50,
        width: 280,
        backgroundColor: '#1DB954',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    }
});