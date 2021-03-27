import { call, put, takeEvery, select } from 'redux-saga/effects'
import * as cateConstants from '../constants/categoryConstant.js'
import axios from 'axios'

function* listCategory() {
  try {
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/category`),
    )
    yield put({ type: cateConstants.CATEGORY_LIST_SUCCESS, payload: data })
  } catch (error) {
    yield put({
      type: cateConstants.CATEGORY_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
function* cateSaga() {
    yield takeEvery(cateConstants.CATEGORY_LIST_REQUEST, listCategory);
}

export default cateSaga;