import {
    all,
    fork,
    call,
    delay,
    takeLatest,
    put,
    actionChannel,
    throttle,
} from 'redux-saga/effects';
import { gameRepository } from '../services/gameRepository';
import {
    LOAD_GAMES_CALL,
    LOAD_GAMES_FAIL,
    LOAD_GAMES_DONE,
    INIT_DB_CALL,
    INIT_DB_FAIL,
    INIT_DB_DONE,
} from '../actions/game';

function initDatabaseApi() {
    return gameRepository().init();
}

function* initDatabase(action) {
    try {
        yield call(initDatabaseApi);
        yield put({
            type: INIT_DB_DONE,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: INIT_DB_FAIL,
            error: error,
        });
    }
}

function* watchInitDatabase() {
    yield takeLatest(INIT_DB_CALL, initDatabase);
}

function loadGamesApi(data) {
    // throw new Error('Exception in Saga');
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve({
                test: `${data.test} and OK! Redux-saga is working.`,
            });
        }, 1000);
    });
}
function* loadGames(action) {
    try {
        const result = yield call(loadGamesApi, action.data);
        yield put({
            type: LOAD_GAMES_DONE,
            data: result,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_GAMES_FAIL,
            error: e,
        });
    }
}

function* watchLoadGames() {
    yield takeLatest(LOAD_GAMES_CALL, loadGames);
}

export default function* gameSage() {
    yield all([fork(watchInitDatabase), fork(watchLoadGames)]);
}
