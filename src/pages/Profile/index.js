import React, { useEffect } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import user_icon from '../../assets/user_default.png';
import styles from './styles';

function Profile() {

    return ( 
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image style={styles.image} source={user_icon} />
                <Text style={styles.name}>Heron</Text>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>SAIR</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Profile;