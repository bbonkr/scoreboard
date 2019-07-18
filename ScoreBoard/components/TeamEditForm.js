import React, { useState, useCallback, useEffect } from 'react';
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
const colors = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'white', label: 'White' },
    { value: 'green', label: 'Green' },
];

const TeamEditForm = ({
    teamName,
    teamColor,
    onChangeTeamName,
    onChangeTeamColor,
}) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [colorLabel, setColorLabel] = useState('');
    const [showColorPicker, setShowColorPicker] = useState(false);

    const onColorChanged = color => {
        if (!color) {
            setColor('');
            setColorLabel('');
        } else {
            const arr = colors.filter(v => v.value === color);
            if (arr && arr.length > 0) {
                setColorLabel(arr[0].label);
            }
            setColor(color);
        }
    };

    useEffect(() => {
        // if (!!teamName) {
        //     setName(teamName);
        // }
        // if (!!teamColor) {
        //     onColorChanged(teamColor);
        // }

        setName(teamName);
        onColorChanged(teamColor);
    }, [teamName, teamColor]);

    const onChangeName = useCallback(text => {
        setName(text);
        if (!!onChangeTeamName) {
            onChangeTeamName(text);
        }
    }, []);

    const onValueChangeColor = useCallback((itemValue, itemIndex) => {
        onColorChanged(itemValue);
        if (!!onChangeTeamColor) {
            onChangeTeamColor(itemValue);
        }
        setShowColorPicker(false);
    }, []);

    const onPressCancelPickerColor = useCallback(() => {
        setShowColorPicker(false);
    }, []);

    const onPressShowColorPicker = useCallback(() => {
        setShowColorPicker(true);
    }, []);

    return (
        <View style={{ padding: 15 }}>
            <Text>Name</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={onChangeName}
                value={name}
                maxLength={20}
                placeholder="Input a team name."
                returnKeyType="next"
            />
            <Text>Color</Text>
            <View>
                <View>
                    {!showColorPicker && (
                        <TouchableOpacity
                            style={{
                                heigth: 40,
                                paddingTop: 6,
                                paddingBottom: 6,
                                backgroundColor: color,
                            }}
                            onPress={onPressShowColorPicker}>
                            <Text>{colorLabel || "Select a team's color"}</Text>
                        </TouchableOpacity>
                    )}

                    {showColorPicker && (
                        <View>
                            <View>
                                <Text>Select color.</Text>
                                <Button
                                    onPress={onPressCancelPickerColor}
                                    title="Cancel"
                                />
                            </View>
                            <Picker
                                selectedValue={color}
                                style={{ heigth: 50 }}
                                onValueChange={onValueChangeColor}>
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
    );
};

export default TeamEditForm;
