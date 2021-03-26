import { call, put, takeEvery, select } from 'redux-saga/effects'
import * as productConstant from '../constants/productConstant.js'
import axios from 'axios'

function* listProduct() {
  try {
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/products/new`),
    )
    yield put({ type: productConstant.PRODUCT_LIST_NEW_SUCCESS, payload: data })
  } catch (error) {
    yield put({
      type: productConstant.PRODUCT_LIST_NEW_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
function* productSaga() {
  yield takeEvery(productConstant.PRODUCT_LIST_NEW_REQUEST, listProduct)
}
export default productSaga
