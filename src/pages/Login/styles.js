import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        resizeMode: 'contain',
        height: 10,
        width: 10,
        marginBottom: 120
    },

    button: {
        borderWidth: 3,
        borderColor: '#191414',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        padding: 10
    },

    buttonText: {
        color: '#191414',
        fontSize: 16,
        fontWeight: 'bold'
    }
});