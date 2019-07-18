import React, { useState, useCallback } from 'react';
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

const EditGameView = () => {
    const [teamAName, setTeamAName] = useState('');
    const [teamAColor, setTeamAColor] = useState('');
    const [teamAColorLabel, setTeamAColorLabel] = useState('');
    const [showTeamAColorPicker, setShowTeamAColorPicker] = useState(false);

    const colors = [
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'white', label: 'White' },
        { value: 'green', label: 'Green' },
    ];
    const onChangeTeamAName = useCallback(text => {
        setTeamAName(text);
    }, []);

    const onValueChangeTeamAColor = useCallback((itemValue, itemIndex) => {
        const arr = colors.filter(v => v.value === itemValue);
        if (arr && arr.length > 0) {
            setTeamAColorLabel(arr[0].label);
        }
        setTeamAColor(itemValue);

        setShowTeamAColorPicker(false);
    }, []);

    const onPressCancelPickerTeamAColor = useCallback(() => {
        setShowTeamAColorPicker(false);
    }, []);

    const onPressShowTeamAColorPicker = useCallback(() => {
        setShowTeamAColorPicker(true);
    }, []);

    return (
        <SafeAreaView>
            <View style={{ padding: 15 }}>
                <Text>Team A</Text>
                <Text>Name</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={onChangeTeamAName}
                    value={teamAName}
                    maxLength={20}
                    placeholder="Input a team name."
                    returnKeyType="next"
                />
                <Text>Color</Text>
                <View>
                    <View>
                        {!showTeamAColorPicker && (
                            <TouchableOpacity
                                style={{
                                    heigth: 40,
                                    paddingTop: 6,
                                    paddingBottom: 6,
                                    backgroundColor: teamAColor,
                                }}
                                onPress={onPressShowTeamAColorPicker}>
                                <Text>
                                    {teamAColorLabel || "Select a team's color"}
                                </Text>
                            </TouchableOpacity>
                        )}

                        {showTeamAColorPicker && (
                            <View>
                                <View>
                                    <Text>Select color.</Text>
                                    <Button
                                        onPress={onPressCancelPickerTeamAColor}
                                        title="Cancel"
                                    />
                                </View>
                                <Picker
                                    selectedValue={teamAColor}
                                    style={{ heigth: 50 }}
                                    onValueChange={onValueChangeTeamAColor}>
                                    {colors.map(v => {
                                        return (
                                            <Picker.Item
                                                style={{
                                                    backgroundColor: v.value,
                                                }}
                                                key={v.value}
                                                value={v.value}
                                                label={v.label}
                                            />
                                        );
                                    })}
                                </Picker>
                            </View>
                        )}
                    </View>
                </View>
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
