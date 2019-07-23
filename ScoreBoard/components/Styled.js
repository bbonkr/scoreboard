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
import styled from 'styled-components';

export const StyledSafeAreaView = styled(SafeAreaView)`
    flex: 1;
`;

export const StyledDefaultTextInput = styled(TextInput)`
    height: 36;
    border-color: gray;
    border-width: 1;
`;

export const StyledErrorText = styled(Text)`
    color: red;
`;

export const StyledTitleText = styled(Text)`
    font-size: 24;
    font-weight: bold;
    padding: 3px;
`;

export const StyledSubtitleText = styled(Text)`
    font-size: 18;
    font-weight: bold;
    padding: 3px;
`;

export const StyledText = styled(Text)`
    font-size: 12;
    font-weight: bold;
    line-height: 1.3;
`;
