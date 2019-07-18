import React, { Fragment, useState, useCallback, useEffect } from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    ListView,
    Alert,
} from 'react-native';
import { useSelector, useDispatch, useStore } from 'react-redux';
import {
    List,
    Toast,
    Button,
    ActivityIndicator,
} from '@ant-design/react-native';
import Swipeout from 'react-native-swipeout';
import { LOAD_GAMES_CALL, NEW_GAME, SELECT_GAME } from '../actions/game';

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

    const [sectionId, setSectionId] = useState(null);
    const [rowId, setRowId] = useState(null);

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

    const onPressEdit = useCallback(
        item => () => {
            setRowId(item.id);
            navigation.navigate('Edit', { selectedGame: JSON.stringify(item) });
        },
        [],
    );
    const onPressGame = useCallback(
        item => () => {
            // dispatch({ type: SELECT_GAME, data: item });
            // navigation.navigate('Edit', { selectedGame: JSON.stringify(item) });
        },
        [],
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ActivityIndicator animating={gamesLoading} />
                <Button onPress={onPressTestButton} loading={loading}>
                    <Text>Reload</Text>
                </Button>
                <FlatList
                    useFlatList={true}
                    data={games}
                    renderItem={({ item }) => {
                        let swipeoutButtons = [
                            {
                                text: 'Delete',
                                type: 'delete',
                                backgroundColor: 'red',
                                underlayColor: 'rgba(0,0,0,0.6)',
                                onPress: () => {
                                    setRowId(item.id);
                                    Alert.alert(`delete ${item.id}`);
                                },
                            },
                            {
                                text: 'Edit',
                                type: 'default',
                                backgroundColor: 'green',
                                underlayColor: 'rgba(0,0,0,0.6)',
                                onPress: onPressEdit(item),
                            },
                        ];
                        return (
                            <Swipeout
                                autoClose={true}
                                backgroundColor="transparent"
                                right={swipeoutButtons}
                                close={!(rowId === item.id)}
                                onOpen={(sectionId, rowId) => {
                                    setRowId(item.id);
                                }}>
                                <View
                                    key={item.id}
                                    style={{ backgroundColor: 'white' }}>
                                    <TouchableOpacity
                                        onPress={onPressGame(item)}>
                                        <Text>{item.title}</Text>
                                        <Text>{item.teamAName}</Text>
                                        <Text>{item.teamBName}</Text>
                                    </TouchableOpacity>
                                </View>
                            </Swipeout>
                        );
                    }}
                    ItemSeparatorComponent={() => {
                        return (
                            <View
                                style={{
                                    height: 0.5,
                                    width: '100%',
                                    backgroundColor: '#c8c8c8',
                                }}
                            />
                        );
                    }}
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
