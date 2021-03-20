import { all } from 'redux-saga/effects'
import cateSaga from './cateSaga'
import userAdminSaga from './userAdminSaga'

export function* rootSaga() {
  yield all([
    userAdminSaga(),
    cateSaga(),
  ])
}
