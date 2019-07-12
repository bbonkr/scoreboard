import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
} from 'react-native';

const ModalMenu = ({ navigation }) => {
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>This is a modal!</Text>
            <Button onPress={() => navigation.goBack()} title="Dismiss" />
            <Button onPress={() => navigation.navigate('Home')} title="Home" />
            <Button onPress={() => navigation.navigate('Info')} title="Info" />
        </View>
    );
};

export default ModalMenu;
