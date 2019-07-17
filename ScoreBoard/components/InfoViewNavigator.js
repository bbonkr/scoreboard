import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import InfoView from '../views/InfoView';
import NavigationDrawerStructure from './NavigationDrawerStructure';

const InfoViewNavigator = createStackNavigator({
    Info: {
        screen: InfoView,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'Info',
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
});

export default InfoViewNavigator;
