import 'react-native-gesture-handler';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Login from './pages/Login';
import Track from './pages/Track';
import Profile from './pages/Profile';
import AuthLoading from './AuthLoading';

const App = createDrawerNavigator({
    Track,
},{
    contentComponent: Profile
});

const Routes = createAppContainer(
    createSwitchNavigator({
        AuthLoading: AuthLoading,
        Login,
        App: {
            screen: App, 
        }
    })
);

export default Routes;