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
// import { gameRepository } from '../services/gameRepository';
import { gameRepository } from '../services/gameRepoitory-realm';
import {
    LOAD_GAMES_CALL,
    LOAD_GAMES_FAIL,
    LOAD_GAMES_DONE,
    INIT_DB_CALL,
    INIT_DB_FAIL,
    INIT_DB_DONE,
    SAVE_GAME_CALL,
    SAVE_GAME_FAIL,
    SAVE_GAME_DONE,
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

async function loadGamesApi(data) {
    // throw new Error('Exception in Saga');
    // return new Promise(function(resolve, reject) {
    //     setTimeout(() => {
    //         resolve({
    //             test: `${data.test} and OK! Redux-saga is working.`,
    //         });
    //     }, 1000);
    // });
    const { pageToken, pageSize } = data;

    const c = await gameRepository().getGames(pageToken, pageSize);
    if (c.length === 0) {
        await gameRepository().addItem({
            title: 'Seed Item',
            teamAName: 'Team AAA',
            teamAColor: 'red',
            teamBName: 'Team BBB',
            teamBColor: 'blud',
        });
    }

    return await gameRepository().getGames(pageToken, pageSize);
}
function* loadGames(action) {
    try {
        const { pageToken, pageSize } = action.data;
        const result = yield call(loadGamesApi, action.data);
        yield put({
            type: LOAD_GAMES_DONE,
            data: result,
            pageSize: pageSize,
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

function saveGameApi(game) {
    if (!game) {
        return null;
    }
    let addedOrUpdatedObject = {};
    if (!!game.id) {
        // update
        addedOrUpdatedObject = gameRepository().updateItem(game);
    } else {
        // insert
        addedOrUpdatedObject = gameRepository().addItem(game);
    }

    return addedOrUpdatedObject;
}

function* saveGame(action) {
    try {
        const result = yield call(saveGameApi, action.data);
        yield put({
            type: SAVE_GAME_DONE,
            data: result,
        });
    } catch (error) {
        yield put({
            type: SAVE_GAME_FAIL,
            error: error,
            reason: error.ToString(),
        });
    }
}
function* watchSaveGame() {
    yield takeLatest(SAVE_GAME_CALL, saveGame);
}

export default function* gameSage() {
    yield all([
        fork(watchInitDatabase),
        fork(watchLoadGames),
        fork(watchSaveGame),
    ]);
}
