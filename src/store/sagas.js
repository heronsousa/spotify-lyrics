import { put, call, all, takeLatest } from 'redux-saga/effects';

import spotifyAPI from '../services/spotifyAPI';

function* getCurrentTrack() {
    try {
        const currentTrack = yield call(spotifyAPI.get, '/currently-playing');

        const artist = currentTrack.data?.item?.artists.map(artist => artist.name);
        const playButton = currentTrack.data.is_playing ? 'pause' : 'play-arrow';
        const name = currentTrack.data?.item?.name;
        const image = currentTrack.data?.item?.album?.images[0]?.url;
        
        yield put({ type: 'GET_CURRENT_TRACK', data: { artist, playButton, name, image } });
    } catch (err) {
        console.log(err);
        // yield put({ type: 'GET_CURRENT_TRACK', data: 'MUSICA DAORA' });
    }
}

        
export default function* root() {
    yield all([
        takeLatest('REQUEST_CURRENT_TRACK', getCurrentTrack),
    ]);
}