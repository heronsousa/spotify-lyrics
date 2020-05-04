import { put, call, all, takeLatest } from 'redux-saga/effects';

import spotifyAPI from '../services/spotifyAPI';

function* getCurrentTrack() {
    try {
        const currentTrack = yield call(spotifyAPI.get, '/currently-playing');

        const artist = currentTrack.data?.item?.artists.map(artist => artist.name);
        const playButton = currentTrack.data.is_playing ? 'pause' : 'play-arrow';
        const name = currentTrack.data?.item?.name;
        const image = currentTrack.data?.item?.album?.images[0]?.url;
        const duration = currentTrack.data?.item?.duration_ms;
        const progress = currentTrack.data?.progress_ms;

        yield put({ 
                    type: 'GET_CURRENT_TRACK', 
                    data: { 
                        artist, 
                        playButton, 
                        name, 
                        image,
                        duration,
                        progress
                    }
                });
    } catch (err) {
        console.log(err);
    }
}

export default function* root() {
    yield all([
        takeLatest('REQUEST_CURRENT_TRACK', getCurrentTrack),
    ]);
}