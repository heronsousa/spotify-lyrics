import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    lyricsContainer: {
        flex: 1,
        paddingHorizontal: 10
    },

    lyrics: {
        fontSize: 16 
    },

    button: {
        borderWidth: 3,
        borderColor: '#191414',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        padding: 8
    },

    buttonText: {
        color: '#191414',
        fontSize: 16,
        fontWeight: 'bold'
    }
});