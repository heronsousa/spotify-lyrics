import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: '100%',
        height: '90%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
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