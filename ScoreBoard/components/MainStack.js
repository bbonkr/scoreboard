import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import MainView from '../views/MainView';
import InfoView from '../views/InfoView';

const MainStack = createStackNavigator({
    Home: { screen: MainView },
    Info: { screen: InfoView },
});

export default MainStack;
