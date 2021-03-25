import { call, put, select, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import * as cateConstant from '../constant/categoryConstant.js'
import { message } from 'antd'

function* createCate(action) {
  const { name } = action
  try {
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    const { data } = yield call(() =>
      axios.post(`${process.env.REACT_APP_API}/category`, { name }, config),
    )
    yield put({ type: cateConstant.CATEGORY_CREATE_SUCCESS, payload: data })
    message.success(`Create Category Success`)
  } catch (error) {
    yield put({
      type: cateConstant.CATEGORY_CREATE_FAILED,
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

function* listCategory() {
  try {
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/category`),
    )
    yield put({ type: cateConstant.CATEGORY_LIST_SUCCESS, payload: data })
  } catch (error) {
    yield put({
      type: cateConstant.CATEGORY_LIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

function* detailCategory(action) {
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
      axios.get(`${process.env.REACT_APP_API}/category/${slug}`, config),
    )
    yield put({ type: cateConstant.CATEGORY_DETAIL_SUCCESS, payload: data })
  } catch (error) {
    yield put({
      type: cateConstant.CATEGORY_DETAIL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

function* updateCate(action) {
  const { name, slug, history } = action
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
        `${process.env.REACT_APP_API}/category/${slug}`,
        { name },
        config,
      ),
    )
    yield put({ type: cateConstant.CATEGORY_UPDATE_SUCCESS, payload: data })
    yield put({ type: cateConstant.CATEGORY_DETAIL_SUCCESS, payload: data })
    history.push('/category/list-categories')
    message.success(`Update Category Success`)
  } catch (error) {
    yield put({
      type: cateConstant.CATEGORY_UPDATE_FAILED,
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

function* deleteCate(action) {
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
      axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, config),
    )
    yield put({ type: cateConstant.CATEGORY_DELETE_SUCCESS })
    yield put({ type: cateConstant.CATEGORY_LIST_REQUEST })
    message.success(`Delete Category Success`)
  } catch (error) {
    yield put({
      type: cateConstant.CATEGORY_DELETE_FAILED,
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

function* listSubCate(action) {
  const { id } = action
  try {
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/category/subs/${id}`),
    )
    yield put({ type: cateConstant.SUB_CATEGORY_SUCCESS, payload: data })
  } catch (error) {
    yield put({
      type: cateConstant.SUB_CATEGORY_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

function* cateSaga() {
  yield takeEvery(cateConstant.CATEGORY_CREATE_REQUEST, createCate)
  yield takeEvery(cateConstant.CATEGORY_LIST_REQUEST, listCategory)
  yield takeEvery(cateConstant.CATEGORY_DETAIL_REQUEST, detailCategory)
  yield takeEvery(cateConstant.CATEGORY_UPDATE_REQUEST, updateCate)
  yield takeEvery(cateConstant.CATEGORY_DELETE_REQUEST, deleteCate)
  yield takeEvery(cateConstant.SUB_CATEGORY_REQUEST, listSubCate)
}

export default cateSaga
