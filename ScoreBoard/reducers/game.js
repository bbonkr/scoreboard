import produce from 'immer';
import {
    LOAD_GAMES_CALL,
    LOAD_GAMES_DONE,
    LOAD_GAMES_FAIL,
} from '../actions/game';

const initialState = {
    test: 'Hello Redux!',
    loading: false,
};

const reducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
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
