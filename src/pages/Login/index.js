import React from 'react';
import { 
    TouchableOpacity, 
    View, 
    Text, 
    Image, 
    AsyncStorage 
} from 'react-native';

import getAuthorizationCode from '../../services/auth/getAuthorizationCode';
import icon from '../../assets/spotify-lyrics-black.png'
import styles from './styles';

export default function Login({ navigation }) {

    async function getSpotifyConnection() {
        await AsyncStorage.clear();

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

