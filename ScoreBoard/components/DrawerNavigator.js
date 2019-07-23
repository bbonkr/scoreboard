import React from 'react';
import { View, Image, TouchableOpacity, ScrollView, Text } from 'react-native';
import {
    createDrawerNavigator,
    SafeAreaView,
    DrawerItems,
} from 'react-navigation';

import MainViewNavigator from './MainViewNavigator';
import InfoViewNavigator from './InfoViewNavigator';
import { IMAGE_BACKGROUND_COLOR } from '../constants/colors';

const DrawerNavigator = createDrawerNavigator(
    {
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
    },
    {
        contentComponent: props => (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: IMAGE_BACKGROUND_COLOR,
                }}>
                <View
                    style={{
                        padding: 12,
                    }}>
                    <Image
                        source={require('../images/scoreboard.png')}
                        style={{
                            width: 120,
                            height: 120,
                            alignSelf: 'center',
                        }}
                    />
                </View>
                <ScrollView style={{ backgroundColor: '#fff' }}>
                    <DrawerItems {...props} />
                </ScrollView>
            </SafeAreaView>
        ),
    },
);

export default DrawerNavigator;
