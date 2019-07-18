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
                break;
            case LOAD_GAMES_DONE:
                draft.games = action.data;
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
            default:
                break;
        }
    });

export default reducer;
