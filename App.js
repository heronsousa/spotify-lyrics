import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AuthSession } from 'expo';

export default function App() {

  const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read'];
  
  const scopes = scopesArr.join(' ');

  const redirectUrl = AuthSession.getRedirectUrl();
  const clientId = 'fc7dc9a6988248058a464e6000d91988';

  const getAuthorizationCode = async () => {
    try {
      const result = await AuthSession.startAsync({
        authUrl:
          'https://accounts.spotify.com/authorize' +
          '?response_type=code' +
          '&client_id=' +
          clientId +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' +
          encodeURIComponent(redirectUrl),
      })

      console.log(result.params.code)
      
    } catch (err) {
      console.error(err)
    }
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={getAuthorizationCode}>
        <Text>Botao</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
