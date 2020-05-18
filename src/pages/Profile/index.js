import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import spotifyAPI from '../../services/api/spotifyAPI';

import user_icon from '../../assets/user_default.png';
import styles from './styles';

function Profile({ navigation }) {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        async function loadProfile() {
            const response = await spotifyAPI.get();

            setName(response.data.display_name);
            setImage(response.data.images[0].url);
        }

        loadProfile();
    }, []);

    async function logout() {
        await AsyncStorage.clear();

        navigation.navigate('AuthLoading');
    }

    return ( 
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image style={styles.image} source={image ? {uri: image} : user_icon} />
                <Text style={styles.name}>{name}</Text>
            </View>

            <TouchableOpacity onPress={logout} style={styles.button}>
                <Text style={styles.buttonText}>SAIR</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Profile;