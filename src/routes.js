import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Track from './pages/Track';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Track
    })
);

export default Routes;