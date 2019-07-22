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
    ActivityIndicator,
    Button,
} from 'react-native';
import { useSelector, useDispatch, useStore } from 'react-redux';
// import { Button } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import {
    LOAD_GAMES_CALL,
    NEW_GAME,
    SELECT_GAME,
    DELETE_GAME_CALL,
} from '../actions/game';
import TeamCard from '../components/TeamCard';
import { HEADER_TINT_COLOR } from '../constants/colors';

const PAGE_SIZE = 10;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const MainView = ({ navigation }) => {
    const dispatch = useDispatch();

    const { test, loading } = useSelector(s => s.game);
    const { games, gamesLoading, gamesHasMore } = useSelector(s => s.game);

    const [sectionId, setSectionId] = useState(null);
    const [rowId, setRowId] = useState(null);

    navigation.addListener('didFocus', () => {
        dispatch({ type: NEW_GAME });
    });

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

            dispatch({ type: SELECT_GAME, data: item });

            navigation.navigate('Edit', { selectedGame: JSON.stringify(item) });
        },
        [],
    );

    const onPressLoadMore = useCallback(() => {
        if (gamesHasMore)
            if (!!games && games.length > 1) {
                const pageToken = games[games.length - 1].createdAt;

                dispatch({
                    type: LOAD_GAMES_CALL,
                    data: {
                        pageToken: pageToken,
                        pageSize: PAGE_SIZE,
                    },
                });
            }
    }, [games]);

    const onPressDelete = useCallback(
        item => () => {
            setRowId(item.id);
            Alert.alert(
                'Delete a game',
                'Do you want to this game',
                [
                    { text: 'Cancel', style: 'cancel', onPress: () => {} },
                    {
                        text: 'Delete',
                        style: '',
                        onPress: () => {
                            dispatch({
                                type: DELETE_GAME_CALL,
                                data: item,
                            });
                        },
                    },
                ],
                { cancelable: false },
            );
        },
        [],
    );

    const onPressGame = useCallback(
        item => () => {
            setRowId(item.id);

            dispatch({ type: SELECT_GAME, data: item });

            navigation.navigate('Game', { id: item.id, title: item.title });
        },
        [],
    );

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ flex: 1 }}>
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
                                onPress: onPressDelete(item),
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
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                padding: 3,
                                                fontSize: 24,
                                                fontWeight: 'bold',
                                            }}>
                                            {item.title}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                padding: 3,
                                            }}>
                                            <TeamCard
                                                name={item.teamAName}
                                                color={item.teamAColor}
                                                score={item.teamAScore}
                                            />

                                            <View
                                                style={{
                                                    height: 50,
                                                    padding: 16,
                                                }}>
                                                <Text>VS</Text>
                                            </View>

                                            <TeamCard
                                                name={item.teamBName}
                                                color={item.teamBColor}
                                                score={item.teamBScore}
                                            />
                                        </View>
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
                    ListFooterComponent={() =>
                        gamesHasMore && (
                            <View>
                                <Button
                                    title="Load more"
                                    onPress={onPressLoadMore}
                                />
                            </View>
                        )
                    }
                    keyExtractor={(item, index) => `${item.id}`}
                    refreshing={gamesLoading}
                    onRefresh={onRefleshList}
                />
            </View>
        </SafeAreaView>
    );
};

MainView.navigationOptions = ({ navigation }) => {
    return {
        drawerLabel: 'Games',
        title: 'Games',
        headerRight: (
            <Text
                style={{ marginRight: 5, color: HEADER_TINT_COLOR }}
                onPress={() => {
                    navigation.navigate('Edit', { id: null });
                }}>
                Add
            </Text>
        ),
    };
};

export default MainView;
