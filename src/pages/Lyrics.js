import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

import api from '../services/apiseeds.js';
import credentials from '../services/credentials.js';

export default function Lyrics() {

  const [lyrics, setLyrics] = useState('');

  async function getLyrics() {
    const response = await api.get(`Chris Brown/loyal?apikey=${credentials.apiseedsKey}`);
    
    setLyrics(response.data.result.track.text);
  }

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={getLyrics}>
          <Text>Lyrics</Text>
        </TouchableOpacity>
      <ScrollView>

        <Text>{ lyrics }</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      marginTop: 100,
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
  }
});