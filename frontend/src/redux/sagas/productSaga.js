import { call, put, takeEvery } from 'redux-saga/effects'
import * as productConstant from '../constants/productConstant.js'
import axios from 'axios'

function* listNewProduct() {
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
function* detailProduct(action) {
  const { slug } = action
  try {
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/products/${slug}`),
    )
    yield put({ type: productConstant.PRODUCT_DETAIL_SUCCESS, payload: data })
  } catch (error) {
    yield put({
      type: productConstant.PRODUCT_DETAIL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
function* listProduct(action) {
  try {
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/products`),
    )
    yield put({ type: productConstant.PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    yield put({
      type: productConstant.PRODUCT_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
function* productSaga() {
  yield takeEvery(productConstant.PRODUCT_LIST_NEW_REQUEST, listNewProduct)
  yield takeEvery(productConstant.PRODUCT_DETAIL_REQUEST, detailProduct)
  yield takeEvery(productConstant.PRODUCT_LIST_REQUEST, listProduct)
}
export default productSaga
