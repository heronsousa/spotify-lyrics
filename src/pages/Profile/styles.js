import styled from 'styled-components';

export const Background = styled.View`
    flex: 1;
    background-color: #191414;
    align-items: center;
    padding: 0 15px;
`

export const Container = styled.View`
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 15px;
    padding-top: 40px;
    border-radius: 15px;
    height: 85%;
    width: 100%;
    top: 10%;
`

export const Image = styled.Image`
    height: 70px;
    width: 70px;
    border-width: 2px;
    border-color: #fff;
    border-radius: 50px;
    position: absolute;
    top: 5%;
`

export const Name = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #191414;
`

export const TopTracks = styled.View`
    justify-content: center;
    align-items: center;
    height: 62%;
`

export const TopsTitle = styled.Text`
    color: #191414;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`

export const TrackItem = styled.View`
    justify-content: center;
    align-items: center;
    width: 220px;
`

export const TrackName = styled.Text`
    max-width: 220px;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    color: #191414;
`

export const TrackArtists = styled.Text`
    max-width: 220px;
    text-align: center;
    color: #191414;
`

export const TrackImage = styled.Image`
    width: 130px;
    height: 140px;
    border-width: 1px;
    border-color: #191414;
    margin-bottom: 10px;
`

export const Pagination = styled.View`
    flex-direction: row;
    margin-top: -40px;
`

export const PaginationBall = styled.Text`
    font-size: 17px;
    color: #999;
`

export const PaginationActiveBall = styled.Text`
    font-size: 17px;
    color: #191414;
`

export const Button = styled.TouchableOpacity`
    border-width: 2px;
    border-radius: 30px;
    padding: 0 15px;
    border-color: #191414;
`

export const ButtonText = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: #191414;
`