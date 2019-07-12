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

import MainStack from './MainStack';
import ModalMenu from '../views/ModalMenu';

const RootStack = createStackNavigator(
    {
        Main: {
            screen: MainStack,
        },
        ModalMenu: {
            screen: ModalMenu,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    },
);

export default RootStack;
