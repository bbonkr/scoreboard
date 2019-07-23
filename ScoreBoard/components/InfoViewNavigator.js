import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import InfoView from '../views/InfoView';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import {
    HEADER_BACKGROUND_COLOR,
    HEADER_TINT_COLOR,
} from '../constants/colors';

const InfoViewNavigator = createStackNavigator({
    Info: {
        screen: InfoView,
        navigationOptions: ({ navigation }) => {
            return {
                // title: 'Info',
                headerLeft: (
                    <NavigationDrawerStructure navigation={navigation} />
                ),
                headerStyle: {
                    backgroundColor: HEADER_BACKGROUND_COLOR,
                },
                headerTintColor: HEADER_TINT_COLOR,
            };
        },
    },
});

export default InfoViewNavigator;
