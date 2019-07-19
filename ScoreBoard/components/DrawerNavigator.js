import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

import MainViewNavigator from './MainViewNavigator';
import InfoViewNavigator from './InfoViewNavigator';

const DrawerNavigator = createDrawerNavigator({
    Main: {
        screen: MainViewNavigator,
        navigationOptions: {
            drawerLabel: 'Games',
            title: 'Games',
        },
    },
    Info: {
        screen: InfoViewNavigator,
        navigationOptions: {
            drawerLabel: 'Info',
            title: 'Info',
        },
    },
});

export default DrawerNavigator;
