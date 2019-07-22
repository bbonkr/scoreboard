import React from 'react';
import { View, Image, TouchableOpacity, ScrollView, Text } from 'react-native';
import {
    createDrawerNavigator,
    SafeAreaView,
    DrawerItems,
} from 'react-navigation';

import MainViewNavigator from './MainViewNavigator';
import InfoViewNavigator from './InfoViewNavigator';
import { HEADER_BACKGROUND_COLOR } from '../constants/colors';

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
            <ScrollView>
                <SafeAreaView style={{ flex: 1 }}>
                    <View
                        style={{
                            backgroundColor: HEADER_BACKGROUND_COLOR,
                            padding: 12,
                        }}>
                        <Text>ScoreBoard</Text>
                    </View>
                    <DrawerItems {...props} />
                </SafeAreaView>
            </ScrollView>
        ),
    },
);

export default DrawerNavigator;
