import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AuthSession } from 'expo';

export default function App() {

  const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                   'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                   'playlist-modify-private','user-read-recently-played','user-top-read'];
  
  const scopes = scopesArr.join(' ');

  
  
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
