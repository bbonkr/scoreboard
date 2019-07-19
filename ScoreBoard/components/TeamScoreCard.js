import React, { useCallback, memo } from 'react';
import { View, Button, Text } from 'react-native';
const TeamScoreCard = memo(
    ({ name, score, color, onIncrease, onDecrease, loading }) => {
        const onPressIncrease = useCallback(() => {
            if (onIncrease) {
                onIncrease();
            }
        }, [score]);
        const onPressDecrease = useCallback(() => {
            if (onDecrease) {
                onDecrease();
            }
        }, [score]);

        return (
            <View
                style={{
                    flex: 4,
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'space-between',
                    padding: 24,
                    backgroundColor: color,
                }}>
                <Text
                    style={{
                        alignContent: 'flex-start',
                        textAlign: 'center',
                        fontSize: 36,
                    }}>
                    {name}
                </Text>
                <Text
                    style={{
                        alignContent: 'flex-start',
                        textAlign: 'center',
                        fontSize: 64,
                        fontWeight: 'bold',
                    }}>
                    {score}
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        alignContent: 'stretch',
                        backgroundColor: '#ffffffd3',
                    }}>
                    <View style={{ flex: 1 }}>
                        <Button
                            disabled={loading}
                            onPress={onPressIncrease}
                            title="+"
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Button
                            disabled={score === 0 || loading}
                            onPress={onPressDecrease}
                            title="-"
                        />
                    </View>
                </View>
            </View>
        );
    },
);

export default TeamScoreCard;
