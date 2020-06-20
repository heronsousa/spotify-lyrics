import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#191414',
        alignItems: 'center',
        paddingHorizontal: 15
    },

    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        paddingTop: 40,
        backgroundColor: 'white',
        borderRadius: 15,
        height: '85%',
        width: '100%',
        top: '10%',
    },

    image: {
        height: 70,
        width: 70,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 50,
        position: 'absolute',
        top: '5%',
    },

    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#191414'
    },

    topsTracks: {
        justifyContent: "center",
        alignItems: 'center',
        height: '52%'
    },

    topsTitle: {
        color: '#191414',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    trackItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 220
    },

    trackName: {
        maxWidth: 220,
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        color: '#191414',
    },

    trackArtists: {
        maxWidth: 220,
        textAlign: 'center',
        color: '#191414',
    },

    trackImage: {
        resizeMode: 'contain',
        width: 130,
        height: 140,
        borderWidth: 1,
        borderColor: '#191414',
        marginBottom: 10
    },

    pagination: {
        flexDirection: 'row',
        marginTop: -30
    },

    paginText: {
        fontSize: 11,
        color: '#999',
    },

    paginActiveText: {
        color: '#191414',
        fontSize: 11
    },

    button: {
        borderWidth: 2,
        borderRadius: 30,
        paddingHorizontal: 15,
        borderColor: '#191414'
    },

    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#191414'
    }
});