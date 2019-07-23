import React, { Fragment, useEffect } from 'react';
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
import i18n from '../i18n';
import * as RNLocalize from 'react-native-localize';

const InfoView = () => {
    useEffect(() => {
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
    }, []);
    return (
        <StyledSafeAreaView>
            <View>
                <View
                    style={{
                        padding: 24,
                        backgroundColor: IMAGE_BACKGROUND_COLOR,
                    }}>
                    <Image
                        source={require('../images/scoreboard.png')}
                        style={{ width: 150, height: 150, alignSelf: 'center' }}
                    />
                </View>
                <View style={{ height: 6 }} />
                <View style={{ padding: 12 }}>
                    <StyledTitleText>
                        {i18n.t('info.content.title')}
                    </StyledTitleText>
                    <View style={{ height: 6 }} />
                    <Text>{i18n.t('info.content.message1')}</Text>
                    <View style={{ height: 3 }} />
                    <Text>{i18n.t('info.content.message2')}</Text>
                    <View style={{ height: 24 }} />
                    <Button title={i18n.t('info.content.sendACupOfCofee')} />
                </View>
            </View>
        </StyledSafeAreaView>
    );
};

InfoView.navigationOptions = {
    drawerLabel: i18n.t('navigation.info'),
    title: i18n.t('info.title'),
};

export default InfoView;
