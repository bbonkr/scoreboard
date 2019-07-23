/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import i18n from './i18n';
import * as RNLocalize from 'react-native-localize';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => {
    const locales = RNLocalize.getLocales();
    // console.warn('App.js:locales: ', locales);

    if (locales.length > 0) {
        const { languageCode } = locales[0];
        console.warn('App.js:languageCode: ', languageCode);
        i18n.locale = languageCode;
    } else {
        i18n.locale = 'en';
    }
    return App;
});
