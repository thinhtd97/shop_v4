import { all } from 'redux-saga/effects'
import cateSaga from './cateSaga'
import userAdminSaga from './userAdminSaga'
import subSaga from './subSaga'
import productSaga from './productSaga'
import variationSaga from './variationSaga'
import sizeSaga from './SizeSaga'

export function* rootSaga() {
  yield all([
    userAdminSaga(),
    cateSaga(),
    subSaga(),
    productSaga(),
    variationSaga(),
    sizeSaga()
  ])
}
