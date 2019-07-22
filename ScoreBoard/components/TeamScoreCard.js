import React, { useEffect, useState, useCallback, memo } from 'react';
import { View, Button, Text, PixelRatio } from 'react-native';
const TeamScoreCard = memo(
    ({ name, score, color, onIncrease, onDecrease, loading }) => {
        const [pixelRatio, setPixelRatio] = useState(1.0);

        useEffect(() => {
            const ratio = PixelRatio.get();
            console.warn('pixel ratio: ', ratio);
            setPixelRatio(ratio);
        }, []);

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
                    flex: 1,
                    flexDirection: 'column',
                    // alignItems: 'stretch',
                    justifyContent: 'space-between',
                    padding: 8 * pixelRatio,
                    backgroundColor: color,
                }}>
                <Text
                    numberOfLines={1}
                    lineBreakMode="tail"
                    style={{
                        alignContent: 'flex-start',
                        textAlign: 'center',
                        fontSize: 8 * pixelRatio /** 36 */,
                    }}>
                    {name}
                </Text>
                <Text
                    style={{
                        alignContent: 'flex-start',
                        textAlign: 'center',
                        fontSize: 8 * pixelRatio /*64*/,
                        fontWeight: 'bold',
                    }}>
                    {score}
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        // alignContent: 'flex-end',
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
