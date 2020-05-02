import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    musicInfo: {
        flexDirection: 'row',
        backgroundColor: '#191414',
        padding: 15,
        borderTopWidth: 1,
        borderBottomColor: 'white'
    },

    musicImage: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: '#fff'
    },

    musicStrigs: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 10,
        flex: 1
    },

    musicName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },

    musicAuthor: {
        fontSize: 14,
        color: '#fff'
    },

    musicButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});