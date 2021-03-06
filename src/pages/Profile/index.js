import React, { useEffect, useState } from 'react';
import {
    AsyncStorage,
    ScrollView
} from 'react-native';

import spotifyAPI from '../../services/api/spotifyAPI';

import user_icon from '../../assets/user_default.png';
import { 
    Background, 
    Container, 
    Image, 
    Name, 
    TopTracks, 
    TopsTitle, 
    TrackItem,
    TrackName,
    TrackArtists,
    TrackImage,
    Pagination,
    Button,
    ButtonText,
    PaginationActiveBall,
    PaginationBall
} from './styles';

function Profile({ navigation }) {

    const [name, setName] = useState('Nome de usuário');
    const [image, setImage] = useState('');
    const [tracks, setTracks] = useState([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        async function loadProfile() {
            try {
                const response = await spotifyAPI.get();
                
                setName(response.data.display_name);
                setImage(response.data?.images[0]?.url ? response.data?.images[0]?.url : '');
            } catch (error) {
                console.log(error)
            }
        }

        loadProfile();
    }, []);

    useEffect(() => {
        async function loadTop() {
            try {
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
            } catch (error) {
                console.log(error)
            }
        }

        loadTop();
    }, );


    async function logout() {
        await AsyncStorage.clear();

        navigation.navigate('AuthLoading');
    }

    function changeActive({ nativeEvent }) {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)/100;

        setActive(slide*100)
    }

    return ( 
        <Background>
            <Container>
                <Name>{name.toUpperCase()}</Name>

                <TopTracks>
                    <TopsTitle>MÚSICAS QUE VOCÊ MAIS TEM ESCUTADO:</TopsTitle>

                    <ScrollView
                        horizontal
                        pagingEnabled
                        onScroll={changeActive}
                        showsHorizontalScrollIndicator={false}
                    >
                        {tracks.map(track => (
                            <TrackItem key={track.id}>
                                <TrackImage source={{uri: track.image}}/>
                                <TrackName>{track.name}</TrackName>
                                <TrackArtists>{track.artists ? track.artists.join(', ') : ''}</TrackArtists>
                            </TrackItem>
                        ))}
                    </ScrollView>
                    
                    <Pagination>
                        {tracks.map(track => (
                            track.id==active ? 
                                <PaginationActiveBall key={track.id}>●</PaginationActiveBall> :
                                <PaginationBall key={track.id}>●</PaginationBall>
                        ))}
                    </Pagination>
                </TopTracks>
                
                <Button onPress={logout}>
                    <ButtonText>SAIR</ButtonText>
                </Button>
            </Container>
            
            <Image source={image ? {uri: image} : user_icon} />
        </Background>
    );
}

export default Profile;