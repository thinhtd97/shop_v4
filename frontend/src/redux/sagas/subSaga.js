import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import * as subConstant from '../constants/subConstant.js'

function* listSubs() {
    try {
      const { data } = yield call(() =>
        axios.get(`${process.env.REACT_APP_API}/subs`),
      )
      yield put({ type: subConstant.SUB_LIST_SUCCESS, payload: data })
    } catch (error) {
      yield put({
        type: subConstant.SUB_LIST_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
function* subSaga() {
    yield takeEvery(subConstant.SUB_LIST_REQUEST, listSubs)
}

export default subSaga;