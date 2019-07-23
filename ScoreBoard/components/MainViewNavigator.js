import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MainView from '../views/MainView';
import EditGameView from '../views/EditGameView';
import GameView from '../views/GameView';
import NavigationDrawerStructure from './NavigationDrawerStructure';
import {
    HEADER_BACKGROUND_COLOR,
    HEADER_TINT_COLOR,
} from '../constants/colors';
import i18n from '../i18n';

const MainViewNavigator = createStackNavigator({
    Main: {
        screen: MainView,
        navigationOptions: ({ navigation }) => {
            return {
                // title: i18n.t('main.title'),
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
    Edit: {
        screen: EditGameView,
    },
    Game: {
        screen: GameView,
    },
});

export default MainViewNavigator;
