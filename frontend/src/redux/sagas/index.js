import { all } from 'redux-saga/effects';
import cartSaga from './cartSaga';
import cateSaga from './categorySaga';
import productSaga from './productSaga';
import subSaga from './subSaga';
import userSaga from './userSaga';
import wishlistSaga from './wishListSaga';

export function* rootSaga() {
    yield all([
        userSaga(),
        productSaga(),
        cateSaga(),
        subSaga(),
        cartSaga(),
        wishlistSaga()
    ])
}