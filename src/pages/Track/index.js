import React from 'react';
import { Provider } from 'react-redux';

import Lyrics from '../../components/Lyrics';
import Header from '../../components/Header';

import store from '../../store';

export default function Track() {

    return (
        <Provider store={store}>
            <Header/>
            <Lyrics/>
        </Provider>
    );
}