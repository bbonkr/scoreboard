import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    TextInput,
    Picker,
    Button,
} from 'react-native';
import TeamEditForm from '../components/TeamEditForm';
import {
    SAVE_GAME_CALL,
    SELECT_GAME,
    NEW_GAME,
    DESELECT_GAME,
} from '../actions/game';

const EditGameView = ({ navigation }) => {
    const dispatch = useDispatch();
    const { game, gameSaving, gameSaveError, gameSaveCompleted } = useSelector(
        s => s.game,
    );

    const [title, setTitle] = useState('');
    const [teamAName, setTeamAName] = useState('');
    const [teamAColor, setTeamAColor] = useState('');

    const [teamBName, setTeamBName] = useState('');
    const [teamBColor, setTeamBColor] = useState('');

    useEffect(() => {
        const selectedGame = navigation.getParam('selectedGame', null);
        if (!!selectedGame) {
            dispatch({ type: SELECT_GAME, data: JSON.parse(selectedGame) });
        } else {
            dispatch({ type: NEW_GAME });
        }
    }, []);

    useEffect(() => {
        if (game) {
            setTitle(game.title);
            setTeamAName(game.teamAName);
            setTeamAColor(game.teamAColor);
            setTeamBName(game.teamBName);
            setTeamBColor(game.teamBColor);
        } else {
            setTitle('');
            setTeamAName('');
            setTeamAColor('');
            setTeamBName('');
            setTeamBColor('');
        }
    }, [game]);

    useEffect(() => {
        if (gameSaveCompleted) {
            dispatch({
                type: DESELECT_GAME,
            });
            navigation.goBack();
        }
    }, [gameSaveCompleted]);

    const onChangeTitle = useCallback(text => {
        setTitle(text);
    }, []);
    const onChangeTeamAName = useCallback(text => {
        setTeamAName(text);
    }, []);

    const onChangeTeamAColor = useCallback(value => {
        setTeamAColor(value);
    }, []);

    const onChangeTeamBName = useCallback(text => {
        setTeamBName(text);
    }, []);

    const onChangeTeamBColor = useCallback(value => {
        setTeamBColor(value);
    }, []);

    const onPressSave = useCallback(() => {
        const saveData = {};

        saveData.id = !!game ? game.id : 0;
        saveData.title = title;
        saveData.teamAName = teamAName;
        saveData.teamAColor = teamAColor;
        saveData.teamBName = teamBName;
        saveData.teamBColor = teamBColor;
        saveData.isClosed = false;

        dispatch({
            type: SAVE_GAME_CALL,
            data: saveData,
        });
    }, [
        game,
        game && game.id,
        title,
        teamAName,
        teamAColor,
        teamBName,
        teamBColor,
    ]);

    return (
        <SafeAreaView>
            <View style={{ padding: 15 }}>
                <Text>Title</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={onChangeTitle}
                    value={title}
                    maxLength={20}
                    placeholder="Input a game title."
                    returnKeyType="next"
                />
                <View style={{ height: 15 }} />
                <Text>Team A</Text>
                <TeamEditForm
                    teamName={teamAName}
                    teamColor={teamAColor}
                    onChangeTeamName={onChangeTeamAName}
                    onChangeTeamColor={onChangeTeamAColor}
                />
                <View style={{ height: 15 }} />
                <Text>Team B</Text>
                <TeamEditForm
                    teamName={teamBName}
                    teamColor={teamBColor}
                    onChangeTeamName={onChangeTeamBName}
                    onChangeTeamColor={onChangeTeamBColor}
                />
                <Button onPress={onPressSave} title="Save" />
                <Text>{JSON.stringify(game)}</Text>
            </View>
        </SafeAreaView>
    );
};

EditGameView.navigationOptions = ({ navigation }) => {
    return {
        drawerLabel: 'Edit',
        title: 'Edit',
        headerRight: (
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}>
                <Text style={{ marginRight: 5 }}>Save</Text>
            </TouchableOpacity>
        ),
    };
};

export default EditGameView;
