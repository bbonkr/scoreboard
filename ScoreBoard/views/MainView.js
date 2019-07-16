import React, { Fragment, useCallback } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
} from 'react-native';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { List, Toast, Button as AntdButton } from '@ant-design/react-native';
import { LOAD_GAMES_CALL } from '../actions/game';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const MainView = () => {
    const dispatch = useDispatch();
    const store = useStore();
    const { test, loading } = useSelector(s => s.game);
    const { games, gamesLoading } = useSelector(s => s.game);

    const onPressTestButton = useCallback(() => {
        console.log('Press Test Button');
        Toast.show('Press Test Button');
        // store.dispatch({
        //     type: LOAD_GAMES_CALL,
        //     data: {
        //         test: 'Hey! Redux is working.',
        //     },
        // });
        dispatch({
            type: LOAD_GAMES_CALL,
            data: {
                pageToken: 0,
                pageSize: 10,
            },
        });
    }, []);

    return (
        <SafeAreaView>
            <Text>MainView</Text>
            <Text>{test}</Text>
            <Text>{games.length}</Text>
            {/* <Button onPress={onPressTestButton} title="Test Redux" /> */}
            <AntdButton onPress={onPressTestButton} loading={loading}>
                Test Redux
            </AntdButton>
        </SafeAreaView>
    );
};

MainView.navigationOptions = {
    drawerLabel: 'Home',
};

export default MainView;
