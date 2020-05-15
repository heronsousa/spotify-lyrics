import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StyleSheet
} from 'react-native';

function AuthLoading({ navigation }) {

    useEffect(() => {
        async function checkAuth() {
            const authCode = await AsyncStorage.getItem('authorizationCode');

            authCode ? navigation.navigate('App') : navigation.navigate('Login');
        }

        checkAuth();
    }, []);

    return ( 
        <ActivityIndicator style={styles.container}/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default AuthLoading;