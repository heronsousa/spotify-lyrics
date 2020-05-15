import React from 'react';
import { 
    TouchableOpacity,
    View,
    Text,
    AsyncStorage,
    Animated,
    Easing
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
            
            navigation.navigate('App');
        }
    }

    var scale = new Animated.Value(0);
    var opacity = new Animated.Value(0);
    
    Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease
    }).start();

    Animated.timing(opacity, {
        toValue: 1,
        duration: 1500,
        easing: Easing.ease
    }).start();

    return (
        <View style={styles.container}>
            <Animated.Image
                source={icon}
                resizeMode='cover'
                style={[{
                        transform: [
                            {
                                scaleX: scale.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 16]
                                })
                            },
                            {
                                scaleY: scale.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 15]
                                })
                            }
                        ]}, 
                        styles.image]
                }
            />
            <Animated.View style = {{opacity: opacity}} >
                <TouchableOpacity onPress={getSpotifyConnection} style={styles.button}>
                    <Text style={styles.buttonText}>CONECTAR COM O SPOTIFY</Text>
                </TouchableOpacity>
            </Animated.View>

        </View>
    );
}

