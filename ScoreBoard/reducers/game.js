import produce from 'immer';
import {
    INIT_DB_CALL,
    INIT_DB_DONE,
    INIT_DB_FAIL,
    LOAD_GAMES_CALL,
    LOAD_GAMES_DONE,
    LOAD_GAMES_FAIL,
} from '../actions/game';

const initialState = {
    databaseInitializing: false,

    test: 'Hello Redux!',
    loading: false,
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
                draft.loading = true;
                break;
            case LOAD_GAMES_DONE:
                draft.test = action.data.test;
                draft.loading = false;
                break;
            case LOAD_GAMES_FAIL:
                draft.loading = false;
                break;
            default:
                break;
        }
    });

export default reducer;
