import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';

export default function Lyrics({ lyrics }) {

    console.log(lyrics);

    return (
        // <View style={{backgroundColor: '#191414', height: '100%'}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 10 }}>
                <Text style={styles.lyrics}>{lyrics}</Text>
            </ScrollView>
        // </View>
  );
}

const styles = StyleSheet.create({
    lyrics: {
        fontSize: 16,
        paddingBottom: 0,
        padding: 15
    }
});