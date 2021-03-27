import { all } from 'redux-saga/effects';
import cateSaga from './categorySaga';
import productSaga from './productSaga';
import subSaga from './subSaga';
import userSaga from './userSaga';

export function* rootSaga() {
    yield all([
        userSaga(),
        productSaga(),
        cateSaga(),
        subSaga()
    ])
}