/** store */

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import gameReducer from './game';

const rootReducer = combineReducers({
    game: gameReducer,
});

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    // const middlewares = [sagaMiddleware];
    // const enhancers = compose(applyMiddleware(...middlewares));

    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

    sagaMiddleware.run(rootSaga);

    return store;
};

export default configureStore;
