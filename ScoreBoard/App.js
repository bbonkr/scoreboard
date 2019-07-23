/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { ThemeProvider } from 'react-native-elements';
import * as RNLocalize from 'react-native-localize';
import i18n from './i18n';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import RootStack from './components/RootStack';
import DrawerNavigator from './components/DrawerNavigator';
import { Provider } from 'react-redux';
import configureStore from './reducers';
import Splash from './views/Splash';

const AppContainer = createAppContainer(DrawerNavigator);

const store = configureStore();

const App = () => {
    const [splash, setSplash] = useState(true);

    useEffect(() => {
        RNLocalize.addEventListener('change', () => {
            // do localization related stuff…
            const locales = RNLocalize.getLocales();
            if (locales.length > 0) {
                const { languageCode } = locales[0];
                i18n.locale = languageCode;
            } else {
                i18n.locale = 'en';
            }
        });
    }, []);

    let timeout;
    // useEffect(() => {
    //     timeout = setTimeout(() => {
    //         setSplash(false);
    //     }, 3000);
    // }, [splash]);

    const onPrepare = () => {
        setSplash(false);
    };

    return (
        <Provider store={store}>
            <ThemeProvider>
                <AppContainer />
            </ThemeProvider>
        </Provider>
    );
};

// const App = () => {
//     const [isMenuOpened, setIsMenuOpened] = useState(false);
//     const onPressTestButton = () => {
//         Toast.info('Hello React-native and Ant design.');
//     };

//     const onPressMenuOpen = () => {
//         setIsMenuOpened(true);
//     };
//     const onOpenChangeMenu = isOpen => {
//         setIsMenuOpened(isOpen);
//     };
//     return (
//         <Provider>
//             <Drawer
//                 sidebar={<Menu />}
//                 position="left"
//                 open={isMenuOpened}
//                 onOpenChange={onOpenChangeMenu}>
//                 <AppContainer>
//                     <View>
//                         <Button onPress={onPressMenuOpen}>
//                             <Icon name="menu" />
//                         </Button>
//                         <Text>ScoreBoard</Text>
//                     </View>
//                     <StatusBar barStyle="dark-content" />
//                     <SafeAreaView>
//                         <ScrollView
//                             contentInsetAdjustmentBehavior="automatic"
//                             style={styles.scrollView}>
//                             <Header />
//                             {global.HermesInternal == null ? null : (
//                                 <View style={styles.engine}>
//                                     <Text style={styles.footer}>
//                                         Engine: Hermes
//                                     </Text>
//                                 </View>
//                             )}

//                             <Button onPress={onPressTestButton}>Start</Button>

//                             <View style={styles.body}>
//                                 <View style={styles.sectionContainer}>
//                                     <Text style={styles.sectionTitle}>
//                                         Step 1
//                                     </Text>
//                                     <Text style={styles.sectionDescription}>
//                                         Edit{' '}
//                                         <Text style={styles.highlight}>
//                                             App.js
//                                         </Text>{' '}
//                                         to change this screen and then come back
//                                         to see your edits.
//                                     </Text>
//                                 </View>
//                                 <View style={styles.sectionContainer}>
//                                     <Text style={styles.sectionTitle}>
//                                         See Your Changes
//                                     </Text>
//                                     <Text style={styles.sectionDescription}>
//                                         <ReloadInstructions />
//                                     </Text>
//                                 </View>
//                                 <View style={styles.sectionContainer}>
//                                     <Text style={styles.sectionTitle}>
//                                         Debug
//                                     </Text>
//                                     <Text style={styles.sectionDescription}>
//                                         <DebugInstructions />
//                                     </Text>
//                                 </View>
//                                 <View style={styles.sectionContainer}>
//                                     <Text style={styles.sectionTitle}>
//                                         Learn More
//                                     </Text>
//                                     <Text style={styles.sectionDescription}>
//                                         Read the docs to discover what to do
//                                         next:
//                                     </Text>
//                                 </View>
//                                 <LearnMoreLinks />
//                             </View>
//                         </ScrollView>
//                     </SafeAreaView>
//                 </AppContainer>
//             </Drawer>
//         </Provider>
//     );
// };

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default App;
