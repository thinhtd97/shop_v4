import axios from 'axios'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import * as wishlistConstant from '../constants/wishlistConstant.js'

function* addToWishlist(action) {
  const { addToast, slug } = action
  const { userInfo } = yield select((state) => state.userLogin)
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    
    yield call(() =>
      axios.post(
        `${process.env.REACT_APP_API}/user/wishlist/${slug}`,
        {},
        config,
      ),
    )
    addToast('Added To Wishlist', { appearance: 'success', autoDismiss: true })
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/user/wishlist`, config),
    )

    yield put({
      type: wishlistConstant.ADD_WISHLIST_SUCCESS,
    })

    yield put({
      type: wishlistConstant.LIST_WISHLIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    yield put({
      type: wishlistConstant.ADD_WISHLIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

    addToast(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
      {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 1000,
      },
    )
  }
}
function* removeItem(action) {
  const { item, addToast } = action
  const { userInfo } = yield select((state) => state.userLogin)
  addToast('Removed Item', { appearance: 'success', autoDismiss: true })
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  yield call(() =>
    axios.delete(
      `${process.env.REACT_APP_API}/user/wishlist/${item.slug}`,
      config,
    ),
  )
}
function* listWishlist(action) {
  const { addToast } = action
  try {
    const { userInfo } = yield select((state) => state.userLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/user/wishlist`, config),
    )
    yield put({
      type: wishlistConstant.LIST_WISHLIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    yield put({
      type: wishlistConstant.LIST_WISHLIST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

    addToast(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
      {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 1000,
      },
    )
  }
}

function* removeAllWishlist(action) {
  const { addToast } = action
  addToast('Removed All Item', { appearance: 'success', autoDismiss: true })
  const { userInfo } = yield select((state) => state.userLogin)
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  yield call(() =>
    axios.delete(`${process.env.REACT_APP_API}/user/wishlist`, config),
  )
}

function* wishlistSaga() {
  yield takeEvery(wishlistConstant.ADD_WISHLIST_REQUEST, addToWishlist)
  yield takeEvery(wishlistConstant.REMOVE_WISHLIST, removeItem)
  yield takeEvery(wishlistConstant.LIST_WISHLIST_REQUEST, listWishlist)
  yield takeEvery(wishlistConstant.REMOVE_WISHLIST_ALL, removeAllWishlist)
}
export default wishlistSaga
