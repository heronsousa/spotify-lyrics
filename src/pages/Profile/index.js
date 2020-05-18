import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ScrollView
} from 'react-native';

import spotifyAPI from '../../services/api/spotifyAPI';

import user_icon from '../../assets/user_default.png';
import styles from './styles';

function Profile({ navigation }) {

    const [name, setName] = useState('Nome de usuário');
    const [image, setImage] = useState('');
    const [tracks, setTracks] = useState([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        async function loadProfile() {
            const response = await spotifyAPI.get();

            setName(response.data.display_name);
            setImage(response.data.images[0].url);
        }

        loadProfile();
    }, []);

    useEffect(() => {
        async function loadTop() {
            const response = await spotifyAPI.get('top/tracks', {
                params: {
                    limit: 5,
                    time_range: 'short_term'
                }
            });

            const data = response.data.items.map(item => ({
                name: item.name,
                artists: item.artists.map(artist => artist.name),
                image: item.album.images[0].url
            }))

            for(var i=0; i<data.length; i+=1) {
                data[i].id = i;
            }

            setTracks(data);
        }

        loadTop();
    }, []);


    async function logout() {
        await AsyncStorage.clear();

        navigation.navigate('AuthLoading');
    }

    function changeActive({ nativeEvent }) {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)/100;

        setActive(slide*100)
    }

    return ( 
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Image style={styles.image} source={image ? {uri: image} : user_icon} />
                <Text style={styles.name}>{name}</Text>
            </View>

            <Text style={styles.topsTitle}>MÚSICAS QUE VOCÊ MAIS TEM ESCUTADO:</Text>

            <ScrollView
                horizontal
                pagingEnabled
                onScroll={changeActive}
                showsHorizontalScrollIndicator={false}
            >
                {tracks.map(track => (
                    <View key={track.id} style={styles.trackItem}>
                        <Image source={{uri: track.image}} style={styles.trackImage}/>
                        <Text numberOfLines={1} style={styles.trackName}>{track.name}</Text>
                        <Text numberOfLines={1} style={styles.trackArtists}>{track.artists ? track.artists.join(', ') : ''}</Text>
                    </View>
                ))}
            </ScrollView>
            
            <View style={styles.pagination}>
                {tracks.map(track => (
                    <Text 
                        key={track.id} 
                        style={track.id==active ? styles.paginActiveText : styles.paginText}
                    >●</Text>
                ))}
            </View>

            <TouchableOpacity onPress={logout} style={styles.button}>
                <Text style={styles.buttonText}>SAIR</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Profile;