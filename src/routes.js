import React from 'react';

import Login from './pages/Login';
import Lyrics from './pages/Lyrics';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Lyrics
    })
);

export default Routes;