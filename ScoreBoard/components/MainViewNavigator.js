import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MainView from '../views/MainView';
import EditGameView from '../views/EditGameView';
import GameView from '../views/GameView';
import NavigationDrawerStructure from './NavigationDrawerStructure';

const MainViewNavigator = createStackNavigator({
    Main: {
        screen: MainView,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'Games',
                headerLeft: (
                    <NavigationDrawerStructure navigation={navigation} />
                ),
                headerStyle: {
                    backgroundColor: '#FF9800',
                },
                headerTintColor: '#fff',
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
