import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MainView from '../views/MainView';
import EditGameView from '../views/EditGameView';
import NavigationDrawerStructure from './NavigationDrawerStructure';

const MainViewNavigator = createStackNavigator({
    Main: {
        screen: MainView,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'Main',
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
});

export default MainViewNavigator;
