import { StyleSheet } from 'react-native';
import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const LyricsContainer = styled.View`
    flex: 1;
    padding: 0 15px;
`

export const Letter = styled.Text`
    font-size: 16px;
`

export const Button = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    border-width: 3px;
    border-color: #191414;
    border-radius: 25px;
    padding: 8px;
`

export const ButtonText = styled.Text`
    color: #191414;
    font-size: 16px;
    font-weight: bold;
`