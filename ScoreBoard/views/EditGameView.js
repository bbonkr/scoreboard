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
    Switch,
} from 'react-native';
import {
    StyledSafeAreaView,
    StyledDefaultTextInput,
    StyledErrorText,
} from '../components/Styled';
import TeamEditForm from '../components/TeamEditForm';
import {
    SAVE_GAME_CALL,
    SELECT_GAME,
    NEW_GAME,
    DESELECT_GAME,
} from '../actions/game';

const EditFormValidator = () => {
    const getValidState = () => {
        return {
            valid: true,
            message: '',
        };
    };

    return {
        validateTitle: data => {
            const { title } = data;
            if (!title || title.trim().length === 0) {
                return {
                    valid: false,
                    message: 'Please input a title of game.',
                };
            }
            return getValidState();
        },
        validateTeamAName: data => {
            const { teamAName } = data;
            if (!teamAName || teamAName.trim().length === 0) {
                return {
                    valid: false,
                    message: 'Please input a name of team A',
                };
            }
            return getValidState();
        },
        validateTeamBName: data => {
            const { teamBName } = data;
            if (!teamBName || teamBName.trim().length === 0) {
                return {
                    valid: false,
                    message: 'Please input a name of team B',
                };
            }
            return getValidState();
        },
    };
};

const EditGameView = ({ navigation }) => {
    const dispatch = useDispatch();
    const { game, gameSaving, gameSaveError, gameSaveCompleted } = useSelector(
        s => s.game,
    );

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');
    const [teamAName, setTeamAName] = useState('');
    const [teamANameError, setTeamANameError] = useState('');
    const [teamAColor, setTeamAColor] = useState('');

    const [teamBName, setTeamBName] = useState('');
    const [teamBNameError, setTeamBNameError] = useState('');
    const [teamBColor, setTeamBColor] = useState('');
    const [isClosed, setIsClosed] = useState(false);
    const validator = EditFormValidator();

    // useEffect(() => {
    //     const selectedGame = navigation.getParam('selectedGame', null);
    //     if (!!selectedGame) {
    //         dispatch({ type: SELECT_GAME, data: JSON.parse(selectedGame) });
    //     } else {
    //         dispatch({ type: NEW_GAME });
    //     }
    // }, []);

    useEffect(() => {
        if (game) {
            setTitle(game.title);
            setTeamAName(game.teamAName);
            setTeamAColor(game.teamAColor);
            setTeamBName(game.teamBName);
            setTeamBColor(game.teamBColor);
            setIsClosed(game.isClosed);
        } else {
            setTitle('');
            setTeamAName('');
            setTeamAColor('');
            setTeamBName('');
            setTeamBColor('');
            setIsClosed(false);
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
        const { message } = validator.validateTitle({ title: text });
        setTitleError(message);
    }, []);
    const onChangeTeamAName = useCallback(text => {
        setTeamAName(text);
        const { message } = validator.validateTeamAName({ teamAName: text });
        setTeamANameError(message);
    }, []);

    const onChangeTeamAColor = useCallback(value => {
        setTeamAColor(value);
    }, []);

    const onChangeTeamBName = useCallback(text => {
        setTeamBName(text);
        const { message } = validator.validateTeamBName({ teamBName: text });
        setTeamBNameError(message);
    }, []);

    const onChangeTeamBColor = useCallback(value => {
        setTeamBColor(value);
    }, []);

    const onValueChangeIsClosed = useCallback(value => {
        setIsClosed(value);
    }, []);

    const onPressSave = useCallback(() => {
        const saveData = {};

        saveData.id = !!game ? game.id : 0;
        saveData.title = title;
        saveData.teamAName = teamAName;
        saveData.teamAColor = teamAColor;
        saveData.teamBName = teamBName;
        saveData.teamBColor = teamBColor;
        saveData.isClosed = isClosed;

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
        isClosed,
    ]);

    return (
        <StyledSafeAreaView>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 15 }}>
                    <View>
                        <View>
                            <Text>Title</Text>
                            <StyledDefaultTextInput
                                onChangeText={onChangeTitle}
                                value={title}
                                maxLength={50}
                                placeholder="Input a game title."
                                returnKeyType="next"
                            />
                        </View>
                        {!!titleError && (
                            <StyledErrorText>
                                {titleError || ''}
                            </StyledErrorText>
                        )}
                    </View>

                    <View style={{ height: 15 }} />
                    <Text>Team A</Text>
                    <TeamEditForm
                        teamName={teamAName}
                        teamNameError={teamANameError}
                        teamColor={teamAColor}
                        onChangeTeamName={onChangeTeamAName}
                        onChangeTeamColor={onChangeTeamAColor}
                    />
                    <View style={{ height: 6 }} />
                    <Text>Team B</Text>
                    <TeamEditForm
                        teamName={teamBName}
                        teamNameError={teamBNameError}
                        teamColor={teamBColor}
                        onChangeTeamName={onChangeTeamBName}
                        onChangeTeamColor={onChangeTeamBColor}
                    />
                    <View style={{ height: 15 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ flex: 1 }}>Closed</Text>
                        <Switch
                            style={{ flex: 1 }}
                            value={isClosed}
                            onValueChange={onValueChangeIsClosed}
                        />
                    </View>
                    <View style={{ height: 6 }} />
                    <View>
                        <Button
                            onPress={onPressSave}
                            title="Save"
                            type="solid"
                        />
                    </View>
                    <View>
                        <Text>{JSON.stringify(game)}</Text>
                    </View>
                </View>
            </ScrollView>
        </StyledSafeAreaView>
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
