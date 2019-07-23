import React, { memo } from 'react';
import { View, Text } from 'react-native';

const TeamCard = memo(({ name, color, score }) => {
    return (
        <View
            style={{
                backgroundColor: color,
                padding: 6,
                heigth: 50,
                width: '30%',
            }}>
            <Text
                style={{
                    textAlign: 'center',
                    marginBottom: 3,
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {name}
            </Text>
            <Text
                style={{
                    textAlign: 'center',
                }}>
                {score}
            </Text>
        </View>
    );
});

export default TeamCard;
