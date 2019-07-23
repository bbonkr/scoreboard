/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import i18n from './i18n';
import * as RNLocalize from 'react-native-localize';
import App from './App';
import { name as appName } from './app.json';
// import appName from './appName.js';

AppRegistry.registerComponent(appName, () => {
    const locales = RNLocalize.getLocales();

    return App;
});
