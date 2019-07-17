import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';

import MainViewNavigator from './MainViewNavigator';
import InfoViewNavigator from './InfoViewNavigator';

const DrawerNavigator = createDrawerNavigator({
    Main: {
        screen: MainViewNavigator,
        navigationOptions: {
            drawerLabel: 'Main',
        },
    },
    Info: {
        screen: InfoViewNavigator,
        navigationOptions: {
            drawerLabel: 'Info',
        },
    },
});

export default DrawerNavigator;
