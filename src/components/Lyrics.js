import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity    } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Lyrics({ lyrics }) {

    const [fontColor, setFontColor] = useState('#191414');
    const [backColor, setBackColor] = useState('white');
    const [fontScale, setFontScale] = useState(16);

    return (
        <View style={{backgroundColor: backColor, height: '100%'}}>
            
            <View >
                <TouchableOpacity onPress={()=>{}}>
                    <MaterialIcons name="more-vert" size={35} color={fontColor} />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    setFontColor(fontColor=='white' ? '#191414' : 'white')
                    setBackColor(backColor=='white' ? '#191414' : 'white')
                }}>
                    <MaterialIcons name="brightness-4" size={35} color={fontColor} />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    setFontScale(fontScale + 1)
                }}>
                    <MaterialCommunityIcons name="format-font-size-increase" size={35} color={fontColor} />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    setFontScale(fontScale - (fontScale>10 ? 1 : 0))
                }}>
                    <MaterialCommunityIcons name="format-font-size-decrease" size={35} color={fontColor} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 10 }}>
                <Text style={styles.lyrics, {color: fontColor, fontSize: fontScale}}>asdsadsda</Text>
            </ScrollView>
        </View>
  );
}

const styles = StyleSheet.create({
    lyrics: {
        paddingBottom: 0,
        padding: 15
    }
});