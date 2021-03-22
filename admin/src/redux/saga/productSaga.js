import { call, put, select, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import * as productConstant from '../constant/ProductConstant.js'
import { notification } from 'antd'

function* createProduct(action) {
  const { product } = action
  try {
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    const { data } = yield call(() =>
      axios.post(`${process.env.REACT_APP_API}/products`, product, config),
    )
    yield put({ type: productConstant.PRODUCT_CREATE_SUCCESS, payload: data })
    notification['success']({
      message: 'Product',
      description: `Created Success`,
    })
  } catch (error) {
    yield put({
      type: productConstant.PRODUCT_CREATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    notification['error']({
      message: 'Product',
      description: `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    })
  }
}

function* listProduct() {
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

function* detailProduct(action) {
  const { slug } = action
  try {
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/products/${slug}`, config),
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

function* updateProduct(action) {
  const { product, slug, history } = action
  try {
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    const { data } = yield call(() =>
      axios.put(
        `${process.env.REACT_APP_API}/products/${slug}`,
        product,
        config,
      ),
    )
    yield put({ type: productConstant.PRODUCT_UPDATE_SUCCESS, payload: data })
    yield put({ type: productConstant.PRODUCT_DETAIL_SUCCESS, payload: data })
    history.push('/product/list-products')
    notification['success']({
      message: 'Product',
      description: `Update Success`,
    })
  } catch (error) {
    yield put({
      type: productConstant.PRODUCT_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    notification['error']({
      message: 'Product',
      description: `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    })
  }
}

function* deleteProduct(action) {
  const { slug } = action
  try {
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    yield call(() =>
      axios.delete(`${process.env.REACT_APP_API}/products/${slug}`, config),
    )
    yield put({ type: productConstant.PRODUCT_DELETE_SUCCESS })
    yield put({ type: productConstant.PRODUCT_LIST_REQUEST })
    notification['success']({
      message: 'Product',
      description: `Delete Success`,
    })
  } catch (error) {
    yield put({
      type: productConstant.PRODUCT_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    notification['error']({
      message: 'Product',
      description: `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    })
  }
}

function* productSaga() {
  yield takeEvery(productConstant.PRODUCT_CREATE_REQUEST, createProduct)
  yield takeEvery(productConstant.PRODUCT_LIST_REQUEST, listProduct)
  yield takeEvery(productConstant.PRODUCT_DETAIL_REQUEST, detailProduct)
  yield takeEvery(productConstant.PRODUCT_UPDATE_REQUEST, updateProduct)
  yield takeEvery(productConstant.PRODUCT_DELETE_REQUEST, deleteProduct)
}
export default productSaga
