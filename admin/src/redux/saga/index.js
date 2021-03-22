import { all } from 'redux-saga/effects'
import cateSaga from './cateSaga'
import userAdminSaga from './userAdminSaga'
import subSaga from './subSaga'

export function* rootSaga() {
  yield all([
    userAdminSaga(),
    cateSaga(),
    subSaga(),
  ])
}
