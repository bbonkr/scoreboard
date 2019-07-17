import React, { Fragment, useCallback, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
} from 'react-native';
import { useSelector, useDispatch, useStore } from 'react-redux';
import {
    List,
    Toast,
    Button,
    ActivityIndicator,
} from '@ant-design/react-native';
import { LOAD_GAMES_CALL } from '../actions/game';

const PAGE_SIZE = 10;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const MainView = ({ navigation }) => {
    const dispatch = useDispatch();

    const { test, loading } = useSelector(s => s.game);
    const { games, gamesLoading } = useSelector(s => s.game);

    useEffect(() => {
        dispatch({
            type: LOAD_GAMES_CALL,
            data: {
                pageToken: 0,
                pageSize: PAGE_SIZE,
            },
        });
    }, []);

    const onPressTestButton = useCallback(() => {
        console.log('Press Test Button');
        Toast.show('Press Test Button');
        dispatch({
            type: LOAD_GAMES_CALL,
            data: {
                pageToken: 0,
                pageSize: PAGE_SIZE,
            },
        });
    }, []);

    const onRefleshList = () => {
        dispatch({
            type: LOAD_GAMES_CALL,
            data: {
                pageToken: 0,
                pageSize: PAGE_SIZE,
            },
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ActivityIndicator animating={gamesLoading} />
                <Button onPress={onPressTestButton} loading={loading}>
                    <Text>Reload</Text>
                </Button>
                <FlatList
                    data={games}
                    renderItem={({ item }) => (
                        <View key={item.id}>
                            <Text>{item.title}</Text>
                            <Text>{item.teamAName}</Text>
                            <Text>{item.teamBName}</Text>
                        </View>
                    )}
                    refreshing={gamesLoading}
                    onRefresh={onRefleshList}
                />
            </View>
        </SafeAreaView>
    );
};

MainView.navigationOptions = ({ navigation }) => {
    return {
        drawerLabel: 'Home',
        headerRight: (
            <Text
                style={{ marginRight: 5 }}
                onPress={() => {
                    navigation.navigate('Edit');
                }}>
                Add
            </Text>
        ),
    };
};

export default MainView;
