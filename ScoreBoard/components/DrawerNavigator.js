import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import MainView from '../views/MainView';
import InfoView from '../views/InfoView';

const NavigationDrawerStructure = ({ navigation }) => {
    const onPressDrawerButton = () => {
        navigation.toggleDrawer();
    };
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={onPressDrawerButton}>
                <Image
                    source={require('../images/menu.png')}
                    style={{ width: 25, height: 25, marginLeft: 5 }}
                />
            </TouchableOpacity>
        </View>
    );
};

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
});

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
