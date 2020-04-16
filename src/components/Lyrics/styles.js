import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    lyricsContainer: {
        flex: 1,
        padding: 10,
        paddingBottom: 0
    },

    lyrics: {
        fontSize: 16 
    },

    button: {
        height: 50,
        width: 280,
        borderWidth: 3,
        borderColor: '#191414',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },

    buttonText: {
        color: '#191414',
        fontSize: 16,
        fontWeight: 'bold'
    }
});