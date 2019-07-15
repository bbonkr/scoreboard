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
import {
    LOAD_GAMES_CALL,
    LOAD_GAMES_FAIL,
    LOAD_GAMES_DONE,
} from '../actions/game';

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
    yield all([fork(watchLoadGames)]);
}
