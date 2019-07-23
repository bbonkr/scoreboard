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
import i18n from '../i18n';

/**
 * 메뉴 컴포넌트
 * 서랍장 메뉴
 *    - 경기
 *    - 정보
 */
const DrawerNavigator = createDrawerNavigator(
    {
        Main: {
            screen: MainViewNavigator,
            navigationOptions: {
                drawerLabel: i18n.t('navigation.main'),
                title: i18n.t('main.title'),
            },
        },
        Info: {
            screen: InfoViewNavigator,
            navigationOptions: {
                drawerLabel: i18n.t('navigation.info'),
                title: i18n.t('info.title'),
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
