import { all, takeLatest } from 'redux-saga/effects';

import { getCurrentTrack } from './track'

export default function* root() {
    yield all([
        takeLatest('REQUEST_CURRENT_TRACK', getCurrentTrack),
    ]);
}