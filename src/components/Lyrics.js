import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity    } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Lyrics({ lyrics }) {

    const [fontColor, setFontColor] = useState('#191414');
    const [backColor, setBackColor] = useState('white');
    const [fontScale, setFontScale] = useState(16);
    const [settingsVis, setSettingsVis] = useState(false);

    const Settings = () => {
        return(
            <>
                <TouchableOpacity onPress={()=>{
                    setFontColor(fontColor=='white' ? '#191414' : 'white')
                    setBackColor(backColor=='white' ? '#191414' : 'white')
                }}>
                    <MaterialIcons name="brightness-4" size={30} color={'white'} />
                </TouchableOpacity>
        
                <TouchableOpacity onPress={()=>{
                    setFontScale(fontScale + 1)
                }}>
                    <MaterialCommunityIcons name="format-font-size-increase" size={30} color={'white'} />
                </TouchableOpacity>
        
                <TouchableOpacity onPress={()=>{
                    setFontScale(fontScale - (fontScale>10 ? 1 : 0))
                }}>
                    <MaterialCommunityIcons name="format-font-size-decrease" size={30} color={'white'} />
                </TouchableOpacity>
            </>
        );
    }

    return (
        <View style={{backgroundColor: backColor, height: '100%', padding: 10}}>

            {/* <View style={styles.settings}>
                <TouchableOpacity onPress={() => {setSettingsVis( settingsVis ? false : true)}}>
                    <MaterialIcons name="more-vert" size={30} color={'white'} />
                </TouchableOpacity>

                {settingsVis ? <Settings /> : null}
            </View> */}

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.lyrics, {color: fontColor, fontSize: fontScale}}>{lyrics}</Text>
            </ScrollView>
            
        </View>
  );
}

const styles = StyleSheet.create({
    settings: {
        alignSelf: 'flex-end',
        backgroundColor: '#666',
        borderRadius: 5
    },
    
    lyrics: {
        paddingBottom: 0,
        padding: 15
    }
});