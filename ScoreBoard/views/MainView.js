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

import { List, Toast } from '@ant-design/react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const MainView = () => {
    return (
        <SafeAreaView>
            <Text>MainView</Text>
        </SafeAreaView>
    );
};

MainView.navigationOptions = {
    drawerLabel: 'Home',
};

export default MainView;
