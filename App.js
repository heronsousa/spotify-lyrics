import React from 'react';
import { YellowBox } from 'react-native';

import Routes from './src/routes';

YellowBox.ignoreWarnings(['Linking requires']);

export default function App() {
  return <Routes />
}
