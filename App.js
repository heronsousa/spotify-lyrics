import React from 'react';
import { YellowBox, StatusBar } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings(['Linking requires that you provide a `scheme`']);

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar hidden/>
    </>
  );
}
