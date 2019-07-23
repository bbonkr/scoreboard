/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import { ThemeProvider } from 'react-native-elements';
import * as RNLocalize from 'react-native-localize';
import i18n from './i18n';
import { createAppContainer } from 'react-navigation';

import DrawerNavigator from './components/DrawerNavigator';
import { Provider } from 'react-redux';
import configureStore from './reducers';

const AppContainer = createAppContainer(DrawerNavigator);

const store = configureStore();

const App = () => {
    useEffect(() => {
        RNLocalize.addEventListener('change', () => {
            const locales = RNLocalize.getLocales();
            if (locales.length > 0) {
                const { languageCode } = locales[0];
                i18n.locale = languageCode;
            } else {
                i18n.locale = 'en';
            }
        });
    }, []);

    return (
        <Provider store={store}>
            <ThemeProvider>
                <AppContainer />
            </ThemeProvider>
        </Provider>
    );
};

export default App;
