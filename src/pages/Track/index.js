import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';

import Lyrics from '../../components/Lyrics';
import Header from '../../components/Header';

import store from '../../store';

export default function Track() {

    // useEffect(() => {
    //     setTimeout(() => { getCurrentTrack() }, duration-progress);
    // },[progress]);

    return (
        <Provider store={store} >
            <Header/>
            <Lyrics/>
        </Provider>
    );
}