import { put, call, all, takeLatest } from 'redux-saga/effects';

import spotifyAPI from '../services/spotifyAPI';

function* getCurrentTrack() {
    try {
        const response = yield call(spotifyAPI.get, '/currently-playing');
        
        yield put({ type: 'GET_CURRENT_TRACK', data: { data: response.data } });
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