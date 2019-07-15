import { all, call } from 'redux-saga/effects';
import game from './game';

export default function* rootSaga() {
    yield all([call(game)]);
}
