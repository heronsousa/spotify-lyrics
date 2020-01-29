import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Lyrics from './pages/Lyrics';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Lyrics
    })
);

export default Routes;