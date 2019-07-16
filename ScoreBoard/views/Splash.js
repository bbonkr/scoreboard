import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
} from 'react-native';
import { INIT_DB_CALL } from '../actions/game';

const Splash = ({ onPrepare }) => {
    const dispatch = useDispatch();
    const [start, setStart] = useState(false);
    const { databaseInitializing } = useSelector(s => s.game);

    useEffect(() => {
        dispatch({
            type: INIT_DB_CALL,
        });
        setStart(true);
    }, []);

    useEffect(() => {
        if (start && !databaseInitializing) {
            onPrepare();
        }
    }, [start, databaseInitializing]);

    return (
        <SafeAreaView>
            <Text>Splash</Text>
        </SafeAreaView>
    );
};

export default Splash;
