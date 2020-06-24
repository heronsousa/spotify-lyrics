import { StyleSheet } from 'react-native';
import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`

export const Button = styled.TouchableOpacity`
    border-width: 3px;
    border-color: #191414;
    align-items: center;
    border-radius: 25px;
    padding: 10px;
`

export const ButtonText = styled.Text`
    color: #191414;
    font-size: 16px;
    font-weight: bold;
`

export default StyleSheet.create({
    image: {
        resizeMode: 'contain',
        height: 10,
        width: 10,
        marginBottom: 120
    }
});