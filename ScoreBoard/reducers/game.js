import produce from 'immer';
import {
    INIT_DB_CALL,
    INIT_DB_DONE,
    INIT_DB_FAIL,
    LOAD_GAMES_CALL,
    LOAD_GAMES_DONE,
    LOAD_GAMES_FAIL,
    SAVE_GAME_CALL,
    SAVE_GAME_DONE,
    SAVE_GAME_FAIL,
    SELECT_GAME,
    NEW_GAME,
    DESELECT_GAME,
    DELETE_GAME_CALL,
    DELETE_GAME_DONE,
    DELETE_GAME_FAIL,
    UPDATE_SCORE_CALL,
    UPDATE_SCORE_DONE,
    UPDATE_SCORE_FAIL,
    OPEN_OR_CLOSE_GAME_CALL,
    OPEN_OR_CLOSE_GAME_DONE,
    OPEN_OR_CLOSE_GAME_FAIL,
} from '../actions/game';

const initialState = {
    databaseInitializing: false,

    test: 'Hello Redux!',
    loading: false,

    games: [],
    gamesLoading: false,
    gamesErrorMessage: '',
    gamesHasMore: false,

    game: null,

    gameSaving: false,
    gameSaveError: '',
    gameSaveCompleted: false,

    gameDeleting: false,
    gameDeleteError: '',
    gameDeleteCompleted: false,

    gameScoreUpdating: false,
    gameOpenCloseUpdating: false,
};

const reducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case INIT_DB_CALL:
                draft.databaseInitializing = true;
                break;
            case INIT_DB_DONE:
                draft.databaseInitializing = false;
                break;
            case INIT_DB_FAIL:
                draft.databaseInitializing = false;
                break;
            case LOAD_GAMES_CALL:
                // console.log('data', action.data);
                // draft.test = action.data.test;
                // draft.loading = true;
                draft.gamesLoading = true;
                if (action.data.pageToken === 0) {
                    draft.games = [];
                }
                break;
            case LOAD_GAMES_DONE:
                action.data.forEach(v => {
                    const foundItem = draft.games.find(x => x.id === v.id);
                    if (!foundItem) {
                        draft.games.push(v);
                    }
                });
                // draft.games = action.data;
                draft.gamesHasMore = action.data.length === action.pageSize;
                draft.gamesLoading = false;
                break;
            case LOAD_GAMES_FAIL:
                draft.gamesLoading = false;
                break;
            case SELECT_GAME:
                draft.game = action.data;
                draft.gameSaveCompleted = false;
                break;
            case NEW_GAME:
                draft.game = null;
                draft.gameSaveCompleted = false;
                break;
            case SAVE_GAME_CALL:
                draft.gameSaving = true;
                draft.gameSaveError = '';
                draft.gameSaveCompleted = false;
                break;
            case SAVE_GAME_DONE:
                draft.game = action.data;
                const index = draft.games.findIndex(
                    v => v.id === action.data.id,
                );

                if (index >= 0) {
                    draft.games[index] = action.data;
                } else {
                    draft.games = [action.data].concat(draft.games);
                }

                draft.gameSaving = false;
                draft.gameSaveCompleted = true;
                break;
            case SAVE_GAME_FAIL:
                draft.gameSaveError = action.reason;
                draft.gameSaving = false;
                draft.gameSaveCompleted = false;
                break;
            case DESELECT_GAME:
                draft.game = null;
                draft.gameSaveCompleted = false;
                break;

            case DELETE_GAME_CALL:
                draft.gameDeleting = true;
                draft.gameDeleteError = '';
                draft.gameDeleteCompleted = false;
                break;
            case DELETE_GAME_DONE:
                draft.games = draft.games.filter(v => v.id !== action.data.id);
                draft.gameDeleting = false;
                draft.gameDeleteCompleted = true;
                break;
            case DELETE_GAME_FAIL:
                draft.gameDeleting = false;
                draft.gameDeleteError = action.reason;
                draft.gameDeleteCompleted = false;
                break;
            case UPDATE_SCORE_CALL:
                draft.gameScoreUpdating = true;
                break;
            case UPDATE_SCORE_DONE:
                const foundIndex = draft.games.findIndex(
                    v => v.id == action.data.id,
                );
                if (foundIndex >= 0) {
                    draft.games[foundIndex] = action.data;
                    draft.game = action.data;
                }
                draft.gameScoreUpdating = false;
                break;
            case UPDATE_SCORE_FAIL:
                draft.gameScoreUpdating = false;
                break;
            case OPEN_OR_CLOSE_GAME_CALL:
                draft.gameOpenCloseUpdating = true;
                break;
            case OPEN_OR_CLOSE_GAME_DONE:
                draft.game = action.data;
                draft.gameOpenCloseUpdating = false;
                break;
            case OPEN_OR_CLOSE_GAME_FAIL:
                draft.gameOpenCloseUpdating = false;
                break;
            default:
                break;
        }
    });

export default reducer;
