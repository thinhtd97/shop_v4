import { call, put, select, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import * as subConstant from '../constant/subConstant.js'
import { notification } from 'antd'

function* createSub(action) {
  const { name, parent } = action
  try {
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    const { data } = yield call(() =>
      axios.post(`${process.env.REACT_APP_API}/subs`, { name, parent }, config),
    )
    yield put({ type: subConstant.SUB_CREATE_SUCCESS, payload: data })
    notification['success']({
      message: 'Sub Category',
      description: `Created Success`,
    })
  } catch (error) {
    yield put({
      type: subConstant.SUB_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    notification['error']({
      message: 'Sub Category',
      description: `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    })
  }
}

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

function* detailSubs(action) {
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
      axios.get(`${process.env.REACT_APP_API}/subs/${slug}`, config),
    )
    yield put({ type: subConstant.SUB_DETAIL_SUCCESS, payload: data })
  } catch (error) {
    yield put({
      type: subConstant.SUB_DETAIL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

function* updateSub(action) {
  const { name, parent, slug, history } = action
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
        `${process.env.REACT_APP_API}/subs/${slug}`,
        { name, parent },
        config,
      ),
    )
    yield put({ type: subConstant.SUB_UPDATE_SUCCESS, payload: data })
    yield put({ type: subConstant.SUB_DETAIL_SUCCESS, payload: data })
    notification['success']({
      message: 'Sub Category',
      description: `Update Success`,
    })
    history.push('/sub-category/list-sub-catgories');
  } catch (error) {
    yield put({
      type: subConstant.SUB_DETAIL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    notification['error']({
      message: 'Sub Category',
      description: `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    })
  }
}

function* deleteSub(action) {
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
      axios.delete(`${process.env.REACT_APP_API}/subs/${slug}`, config),
    )
    yield put({ type: subConstant.SUB_DELETE_SUCCESS })
    yield put({ type: subConstant.SUB_LIST_REQUEST })
    notification['success']({
      message: 'Sub Category',
      description: `Delete Success`,
    })
  } catch (error) {
    yield put({
      type: subConstant.SUB_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    notification['error']({
      message: 'Category Category',
      description: `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    })
  }
}

function* subSaga() {
  yield takeEvery(subConstant.SUB_CREATE_REQUEST, createSub)
  yield takeEvery(subConstant.SUB_LIST_REQUEST, listSubs)
  yield takeEvery(subConstant.SUB_DETAIL_REQUEST, detailSubs)
  yield takeEvery(subConstant.SUB_UPDATE_REQUEST, updateSub)
  yield takeEvery(subConstant.SUB_DELETE_REQUEST, deleteSub)
}

export default subSaga
