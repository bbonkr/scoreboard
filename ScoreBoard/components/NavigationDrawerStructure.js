import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

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

export default NavigationDrawerStructure;
