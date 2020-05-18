import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 25
    },

    userInfo: {
        alignItems: 'center',
    },

    image: {
        height: 100,
        width: 100,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 50,
        marginBottom: 15
    },

    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    topsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        top: 45
    },

    trackItem: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    trackName: {
        maxWidth: 230,
        fontWeight: 'bold',
        fontSize: 16
    },

    trackArtists: {
        maxWidth: 230
    },

    trackImage: {
        width: 230, 
        height: 230, 
        resizeMode: 'contain'
    },

    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        top: '90%'
    },

    paginText: {
        fontSize: 20,
    },

    paginActiveText: {
        color: '#999',
        fontSize: 20
    },

    button: {
        borderWidth: 2,
        borderRadius: 30,
        paddingHorizontal: 15
    },

    buttonText: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});