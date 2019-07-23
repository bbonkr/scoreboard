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
    BackHandler,
} from 'react-native';
import { useSelector, useDispatch, useStore } from 'react-redux';
import * as RNLocalize from 'react-native-localize';
import Swipeout from 'react-native-swipeout';
import {
    LOAD_GAMES_CALL,
    NEW_GAME,
    SELECT_GAME,
    DELETE_GAME_CALL,
} from '../actions/game';
import TeamCard from '../components/TeamCard';
import { StyledSafeAreaView, StyledTitleText } from '../components/Styled';
import { HEADER_TINT_COLOR } from '../constants/colors';
import i18n from '../i18n';

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
        // const locales = RNLocalize.getLocales();
        // console.warn('locales: ', locales);

        // RNLocalize.addEventListener('change', () => {
        //     // do localization related stuff…
        //     const locales = RNLocalize.getLocales();
        //     if (locales.length > 0) {
        //         const { languageCode } = locales[0];
        //         i18n.locale = languageCode;
        //     } else {
        //         i18n.locale = 'en';
        //     }
        // });

        BackHandler.addEventListener('hardwareBackPress', function() {
            // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
            // Typically you would use the navigator here to go to the last state.

            if (!this.onMainScreen()) {
                this.goBack();
                return true;
            }
            return false;
        });
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
                i18n.t('main.confirmDelete.title'),
                i18n.t('main.confirmDelete.message'),
                [
                    {
                        text: i18n.t('main.confirmDelete.buttons.no'),
                        style: 'cancel',
                        onPress: () => {},
                    },
                    {
                        text: i18n.t('main.confirmDelete.buttons.yes'),
                        style: 'delete',
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
        <StyledSafeAreaView style={{ justifyContent: 'center' }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    useFlatList={true}
                    data={games}
                    renderItem={({ item }) => {
                        let swipeoutButtons = [
                            {
                                text: i18n.t('main.delete') /*'Delete'*/,
                                type: 'delete',
                                backgroundColor: 'red',
                                underlayColor: 'rgba(0,0,0,0.6)',
                                onPress: onPressDelete(item),
                            },
                            {
                                text: i18n.t('main.edit') /*'Edit'*/,
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
                                        <StyledTitleText
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                padding: 3,
                                                fontSize: 24,
                                                fontWeight: 'bold',
                                            }}>
                                            {item.title}
                                        </StyledTitleText>
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
                                    title={i18n.t('main.loadMore')}
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
        </StyledSafeAreaView>
    );
};

MainView.navigationOptions = ({ navigation }) => {
    return {
        drawerLabel: i18n.t('navigation.main'),
        title: i18n.t('main.title'),
        headerRight: (
            <Text
                style={{ marginRight: 5, color: HEADER_TINT_COLOR }}
                onPress={() => {
                    navigation.navigate('Edit', { id: null });
                }}>
                {i18n.t('main.add')}
            </Text>
        ),
    };
};

export default MainView;
