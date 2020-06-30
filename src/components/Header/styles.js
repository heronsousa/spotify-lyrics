import styled from 'styled-components';

export const Container = styled.View`
    flex-direction: row;
    background-color: #191414;
    border-top-width: 1px;
    padding: 15px;
`

export const Image = styled.Image`
    width: 100px;
    height: 100px;
    border-width: 2px;
    border-color: #fff;
`

export const Music = styled.View`
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    flex: 1;
`

export const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

export const MusicName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #fff
`

export const MusicArtists = styled.Text`
    font-size: 14px;
    color: #fff
`