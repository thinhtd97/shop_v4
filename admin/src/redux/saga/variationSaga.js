import { call, put, select, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import * as variationConstant from '../constant/variationConstant.js'
import * as productConstant from '../constant/ProductConstant.js'
import { message } from 'antd'

function* createVariation(action) {
  const { color, product, image, history } = action
  try {
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    const { data } = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_API}/variation`,
        { color, product, image },
        config,
      ),
    )
    yield put({
      type: variationConstant.VARIATION_CREATE_SUCCESS,
      payload: data,
    })
    history.push(`/variation/create-size/${data._id}`)
    message.success('Create Variation Success')
  } catch (error) {
    yield put({
      type: variationConstant.VARIATION_CREATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    message.error(
      `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    )
  }
}

function* listVariation() {
  try {
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/variation`),
    )
    yield put({ type: variationConstant.VARIATION_LIST_SUCCESS, payload: data })
  } catch (error) {
    yield put({
      type: variationConstant.VARIATION_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
function* detailVariation(action) {
  const { id } = action
  try {
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/variation/${id}`, config),
    )
    yield put({
      type: variationConstant.VARIATION_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    yield put({
      type: variationConstant.VARIATION_DETAIL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
function* updateVariation(action) {
  const { color, product, image, variation_id, currentProductId } = action
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
        `${process.env.REACT_APP_API}/variation/${variation_id}`,
        { color, product, image, currentProductId },
        config,
      ),
    )
    yield put({
      type: variationConstant.VARIATION_UPDATE_SUCCESS,
      payload: data,
    })
    yield put({
      type: variationConstant.VARIATION_DETAIL_SUCCESS,
      payload: data,
    })

    message.success('Update Variation Success')
  } catch (error) {
    yield put({
      type: variationConstant.VARIATION_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    message.error(
      `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    )
  }
}
function* deleteVariation(action) {
  const { variation_id, slug } = action
  try {
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_API}/variation/${variation_id}`,
        config,
      ),
    )
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/products/${slug}`),
    )
    yield put({
      type: variationConstant.VARIATION_DELETE_SUCCESS,
    })
    yield put({ type: productConstant.PRODUCT_DETAIL_SUCCESS, payload: data })
    message.success('Variation Delete Success')
  } catch (error) {
    yield put({
      type: variationConstant.VARIATION_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    message.error(
      `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    )
  }
}
function* createSize(action) {
  const { size, stock, variation_id } = action
  try {
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    yield call(() =>
      axios.post(
        `${process.env.REACT_APP_API}/variation/create-size/${variation_id}`,
        { size, stock },
        config,
      ),
    )
    yield put({
      type: variationConstant.SIZE_CREATE_SUCCESS,
    })
    message.success('Created Size Success')
  } catch (error) {
    yield put({
      type: variationConstant.SIZE_CREATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    message.error(
      `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    )
  }
}
function* deleteSize(action) {
  const { variation_id, size_id } = action
  try {
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    yield call(() =>
      axios.delete(
        `${process.env.REACT_APP_API}/variation/delete-size/${variation_id}/${size_id}`,
        config,
      ),
    )
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/variation/${variation_id}`, config),
    )
    yield put({
      type: variationConstant.SIZE_DELETE_SUCCESS,
    })
    yield put({ type: variationConstant.VARIATION_DETAIL_SUCCESS, payload: data })
    message.success('Variation Delete Success')
  } catch (error) {
    yield put({
      type: variationConstant.SIZE_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    message.error(
      `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    )
  }
}
function* variationSaga() {
  yield takeEvery(variationConstant.VARIATION_CREATE_REQUEST, createVariation)
  yield takeEvery(variationConstant.VARIATION_LIST_REQUEST, listVariation)
  yield takeEvery(variationConstant.VARIATION_DETAIL_REQUEST, detailVariation)
  yield takeEvery(variationConstant.VARIATION_UPDATE_REQUEST, updateVariation)
  yield takeEvery(variationConstant.VARIATION_DELETE_REQUEST, deleteVariation)
  yield takeEvery(variationConstant.SIZE_CREATE_REQUEST, createSize)
  yield takeEvery(variationConstant.SIZE_DELETE_REQUEST, deleteSize)
}
export default variationSaga
