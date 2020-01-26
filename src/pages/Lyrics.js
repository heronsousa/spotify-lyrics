import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Lyrics() {
  return (
    <View style={styles.container}>
      <Text>Lyrics</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
  }
});