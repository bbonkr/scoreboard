import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const InfoView = () => {
    return (
        <SafeAreaView>
            <Text>InfoView</Text>
        </SafeAreaView>
    );
};

InfoView.navigationOptions = {
    drawerLabel: 'Info',
};

export default InfoView;
