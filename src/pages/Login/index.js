import React from 'react';
import { 
    TouchableOpacity, 
    View, 
    Text, 
    Image, 
    AsyncStorage 
} from 'react-native';

import getAuthorizationCode from '../../services/getAuthorizationCode';
import icon from '../../assets/Spotify_Icon.png'
import styles from './styles';

export default function Login({ navigation }) {

    async function getSpotifyConnection() {
        const response = await getAuthorizationCode();

        if(response.type === "success"){
            await AsyncStorage.setItem('authorizationCode', response.params.code);

            navigation.navigate('Track');
        }
    }

    return (
        <View style={styles.container}>
            <Image source={icon} style={styles.image} />

            <TouchableOpacity style={styles.button} onPress={getSpotifyConnection}>
                <Text style={styles.buttonText}>CONECTAR COM O SPOTIFY</Text>
            </TouchableOpacity>
        </View>
    );
}

