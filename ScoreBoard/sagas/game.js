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
    DELETE_GAME_CALL,
    DELETE_GAME_FAIL,
    DELETE_GAME_DONE,
    UPDATE_SCORE_CALL,
    UPDATE_SCORE_FAIL,
    UPDATE_SCORE_DONE,
    OPEN_OR_CLOSE_GAME_CALL,
    OPEN_OR_CLOSE_GAME_FAIL,
    OPEN_OR_CLOSE_GAME_DONE,
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

function deleteGameApi(data) {
    const deletedItem = gameRepository().deleteItem(data);
    return deletedItem;
}

function* deleteGame(action) {
    try {
        const result = yield call(deleteGameApi, action.data);
        console.warn('delete item: ', result);
        yield put({
            type: DELETE_GAME_DONE,
            data: result,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type: DELETE_GAME_FAIL,
            error: error,
            reason: error.toString(),
        });
    }
}

function* watchDeleteGame() {
    yield takeLatest(DELETE_GAME_CALL, deleteGame);
}

function updateScoreApi(data) {
    return gameRepository().updateScore(data);
}

function* updateScore(action) {
    try {
        const result = yield call(updateScoreApi, action.data);
        yield put({
            type: UPDATE_SCORE_DONE,
            data: result,
        });
    } catch (error) {
        yield put({
            type: UPDATE_SCORE_FAIL,
            error: error,
            rease: error.toString(),
        });
    }
}

function* watchUpdateScore() {
    // yield takeLatest(UPDATE_SCORE_CALL, updateScore);
    yield throttle(500, UPDATE_SCORE_CALL, updateScore);
}

function openOrCloseGameAip(id) {
    return gameRepository().updateClose({ id: id });
}

function* openOrCloseGame(action) {
    try {
        const result = yield call(openOrCloseGameAip, action.data.id);
        yield put({
            type: OPEN_OR_CLOSE_GAME_DONE,
            data: result,
        });
    } catch (error) {
        yield put({
            type: OPEN_OR_CLOSE_GAME_FAIL,
            error: error,
            reason: error.toString(),
        });
    }
}

function* watchOpenOrCloseGmae() {
    yield takeLatest(OPEN_OR_CLOSE_GAME_CALL, openOrCloseGame);
}

export default function* gameSage() {
    yield all([
        fork(watchInitDatabase),
        fork(watchLoadGames),
        fork(watchSaveGame),
        fork(watchDeleteGame),
        fork(watchUpdateScore),
        fork(watchOpenOrCloseGmae),
    ]);
}
