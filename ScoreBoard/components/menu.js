import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import { List, Button, Toast } from '@ant-design/react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
const Menu = () => {
    const onPressList = () => {
        Toast.info('목록 뷰로 이동');
    };
    const onPressInfo = () => {
        Toast.info('정보 뷰로 이동');
    };
    return (
        <ScrollView style={styles.container}>
            <List>
                <List.Item key="main">
                    <View>
                        <Button onPress={onPressList}>목록</Button>
                    </View>
                </List.Item>
                <List.Item key="info">
                    <View>
                        <Button onPress={onPressList}>목록</Button>
                    </View>
                </List.Item>
            </List>
        </ScrollView>
    );
};

export default Menu;
