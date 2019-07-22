import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigation } from 'react-navigation';

import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Button,
} from 'react-native';
import { SELECT_GAME, NEW_GAME, UPDATE_SCORE_CALL } from '../actions/game';
import TeamScoreCard from '../components/TeamScoreCard';
import { ScrollView } from 'react-native-gesture-handler';
import {
    HEADER_BACKGROUND_COLOR,
    HEADER_TINT_COLOR,
} from '../constants/colors';

const GameView = ({ navigation }) => {
    const dispatch = useDispatch();
    const { game, gameScoreUpdating } = useSelector(s => s.game);
    const [mainFlexDirection, setMainFlexDirection] = useState('column');

    const onLayout = useCallback(e => {
        const width = e.nativeEvent.layout.width;
        const height = e.nativeEvent.layout.height;
        if (width < height) {
            setMainFlexDirection('column');
        } else {
            setMainFlexDirection('row');
        }
    }, []);

    const onIncreaseTeamAScore = useCallback(() => {
        dispatch({
            type: UPDATE_SCORE_CALL,
            data: {
                id: game.id,
                teamAScore: (game.teamAScore || 0) + 1,
                teamBScore: game.teamBScore,
            },
        });
    }, [game && game.id, game.teamAScore, game.teamBScore]);

    const onDecreaseTeamAScore = useCallback(() => {
        dispatch({
            type: UPDATE_SCORE_CALL,
            data: {
                id: game.id,
                teamAScore: (game.teamAScore || 0) - 1,
                teamBScore: game.teamBScore,
            },
        });
    }, [game && game.id, game.teamAScore, game.teamBScore]);

    const onIncreaseTeamBScore = useCallback(() => {
        dispatch({
            type: UPDATE_SCORE_CALL,
            data: {
                id: game.id,
                teamAScore: game.teamAScore,
                teamBScore: (game.teamBScore || 0) + 1,
            },
        });
    }, [game && game.id, game.teamAScore, game.teamBScore]);

    const onDecreaseTeamBScore = useCallback(() => {
        dispatch({
            type: UPDATE_SCORE_CALL,
            data: {
                id: game.id,
                teamAScore: game.teamAScore,
                teamBScore: (game.teamBScore || 0) - 1,
            },
        });
    }, [game && game.id, game.teamAScore, game.teamBScore]);

    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'center' }}
            onLayout={onLayout}>
            {!game && (
                <View>
                    <Text>Loading...</Text>
                </View>
            )}
            {game && (
                <View
                    style={{
                        flex: 1,
                        flexDirection: mainFlexDirection,
                        alignItems: 'stretch',
                    }}>
                    <TeamScoreCard
                        style={{ flex: 4 }}
                        name={game.teamAName}
                        score={game.teamAScore}
                        color={game.teamAColor}
                        onIncrease={onIncreaseTeamAScore}
                        onDecrease={onDecreaseTeamAScore}
                        loading={gameScoreUpdating}
                    />
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center' }}>VS</Text>
                    </View>
                    <TeamScoreCard
                        style={{ flex: 4 }}
                        name={game.teamBName}
                        score={game.teamBScore}
                        color={game.teamBColor}
                        onIncrease={onIncreaseTeamBScore}
                        onDecrease={onDecreaseTeamBScore}
                        loading={gameScoreUpdating}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

GameView.navigationOptions = ({ navigation }) => {
    return {
        drawerLabel: 'Game',
        title: navigation.getParam('title', 'Game'),
        headerStyle: {
            backgroundColor: HEADER_BACKGROUND_COLOR,
        },
        headerTintColor: HEADER_TINT_COLOR,
        headerRight: (
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}>
                <Text style={{ marginRight: 5, color: HEADER_TINT_COLOR }}>
                    Close
                </Text>
            </TouchableOpacity>
        ),
    };
};

export default GameView;
