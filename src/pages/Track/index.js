import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';

import Lyrics from '../../components/Lyrics';
import Header from '../../components/Header';

import store from '../../store';
import spotifyAPI from '../../services/spotifyAPI';
import vagalumeAPI from '../../services/vagalumeAPI.js';

export default function Track() {

    // useEffect(() => {
    //     setTimeout(() => { getCurrentTrack() }, duration-progress);
    // },[progress]);

    return (
        <Provider store={store} >
            <Header/>

            <Lyrics lyrics='asd' getCurrentTrack={() => {}}/>
        </Provider>
    );
}