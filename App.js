import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import _ from "lodash";

import Routes from './src/routes';

YellowBox.ignoreWarnings(["Setting a timer"]);

const _console = _.clone(console);

console.warn = (message) => {
    if (message.indexOf("Setting a timer") <= -1) {
        _console.warn(message);
    }
};

export default function App() {
    return (
        <>
            <Routes />
            <StatusBar hidden/>
        </>
    );
}
