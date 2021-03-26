import { all } from 'redux-saga/effects';
import productSaga from './productSaga';
import userSaga from './userSaga';

export function* rootSaga() {
    yield all([
        userSaga(),
        productSaga(),
    ])
}