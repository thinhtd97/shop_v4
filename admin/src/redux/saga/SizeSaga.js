import { call, put, select, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import * as sizeConstant from '../constant/sizeConstant.js'
import * as variationConstant from '../constant/variationConstant.js'
import { message } from 'antd'

function* createSize(action) {
  const { variationId, size, stock } = action
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
        `${process.env.REACT_APP_API}/size/${variationId}`,
        { size, stock },
        config,
      ),
    )
    yield put({
      type: sizeConstant.SIZE_CREATE_SUCCESS,
      payload: data,
    })
    message.success(`Create Size Success`)
  } catch (error) {
    yield put({
      type: sizeConstant.SIZE_CREATE_FAILED,
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
  const { variationId, sizeId } = action
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
        `${process.env.REACT_APP_API}/size/${variationId}/${sizeId}`,
        config,
      ),
    )
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/size/${sizeId}`, config),
    )
    yield put({ type: sizeConstant.SIZE_DELETE_SUCCESS })
    yield put({
      type: variationConstant.VARIATION_DETAIL_SUCCESS,
      payload: data,
    })
    message.success(`Delete Size Success`)
  } catch (error) {
    yield put({
      type: sizeConstant.SIZE_DELETE_FAILED,
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


function* detailSize(action) {
  const { sizeId } = action
  try {
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/size/${sizeId}`, config),
    )
    yield put({ type: sizeConstant.SIZE_DETAIL_SUCCESS, payload: data })
  } catch (error) {
    yield put({
      type: sizeConstant.SIZE_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
// router.delete('/size/:variationId/:sizeId', protect, admin, removeSize)
// router
//   .route('/size/:id')
//   .get(protect, admin, detailSize)
//   .put(protect, admin, updateSize)
// router.post('/size/:variationId', protect, admin, createSize)

function* updateSize(action) {
  const { sizeId, size, stock } = action
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
        `${process.env.REACT_APP_API}/size/${sizeId}`,
        { size, stock },
        config,
      ),
    )
    yield put({
      type: sizeConstant.SIZE_UPDATE_SUCCESS,
      payload: data,
    })

    yield put({
      type: sizeConstant.SIZE_DETAIL_SUCCESS,
      payload: data,
    })

    message.success('Update Variation Success')
  } catch (error) {
    yield put({
      type: sizeConstant.SIZE_UPDATE_FAILED,
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

function* sizeSaga() {
  yield takeEvery(sizeConstant.SIZE_CREATE_REQUEST, createSize)
  yield takeEvery(sizeConstant.SIZE_DELETE_REQUEST, deleteSize)
  yield takeEvery(sizeConstant.SIZE_DETAIL_REQUEST, detailSize)
  yield takeEvery(sizeConstant.SIZE_UPDATE_REQUEST, updateSize)
}
export default sizeSaga
