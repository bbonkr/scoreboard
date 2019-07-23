import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    Image,
} from 'react-native';
import { StyledSafeAreaView, StyledTitleText } from '../components/Styled';
import { IMAGE_BACKGROUND_COLOR } from '../constants/colors';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const InfoView = () => {
    return (
        <StyledSafeAreaView>
            <View>
                <View
                    style={{
                        padding: 6,
                        backgroundColor: IMAGE_BACKGROUND_COLOR,
                    }}>
                    <Image
                        source={require('../images/scoreboard.png')}
                        style={{ width: 150, height: 150, alignSelf: 'center' }}
                    />
                </View>
                <View style={{ height: 6 }} />
                <View style={{ padding: 12 }}>
                    <StyledTitleText>너와 나의 점수판</StyledTitleText>
                    <View style={{ height: 6 }} />
                    <Text>
                        이 응용프로그램으로 경기 점수를 어디에서나 편리하게
                        기록하세요.
                    </Text>
                    <View style={{ height: 3 }} />
                    <Text>
                        유용하게 사용하시고, 이 응용프로그램이 마음에 드시면
                        저에게 커피 한잔을 보내실 수 있습니다.
                    </Text>
                    <View style={{ height: 24 }} />
                    <Button title="커피 한잔 보내기 (금액 표시)" />
                </View>
            </View>
        </StyledSafeAreaView>
    );
};

InfoView.navigationOptions = {
    drawerLabel: 'Info',
};

export default InfoView;
