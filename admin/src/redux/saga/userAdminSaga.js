import { call, put, select, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import * as userAdminConstant from '../constant/userAdminConstant.js'
import { notification } from 'antd'

function* login(action) {
  const { email, password } = action
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_API}/user/login-admin`,
        { email, password },
        config,
      ),
    )
    yield put({ type: userAdminConstant.ADMIN_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('adminInfo', JSON.stringify(data))
  } catch (error) {
    yield put({
      type: userAdminConstant.ADMIN_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    notification['error']({
      message: 'Login',
      description: `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    })
  }
}
function* logout() {
  try {
    localStorage.removeItem('adminInfo')
    yield put({ type: userAdminConstant.LOGOUT })
    yield put({ type: userAdminConstant.ADMIN_PROFILE_RESET })
  } catch (error) {
    yield put({
      type: userAdminConstant.ADMIN_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    notification['error']({
      message: 'Login',
      description: `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    })
  }
}
function* changePassword(action) {
  try {
    const { password, oldPassword } = action
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    yield call(() =>
      axios.put(
        `${process.env.REACT_APP_API}/user/change-password`,
        { password, oldPassword },
        config,
      ),
    )
    yield put({
      type: userAdminConstant.ADMIN_CHANGEPW_SUCCESS,
    })
    notification['success']({
      message: 'Change Password',
      description: `Change password success`,
    })
  } catch (error) {
    yield put({
      type: userAdminConstant.ADMIN_CHANGEPW_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    notification['error']({
      message: 'Change Password',
      description: `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    })
  }
}

function* getProfile() {
  try {
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/user/profile`, config),
    )
    yield put({ type: userAdminConstant.ADMIN_PROFILE_SUCCESS, payload: data })
  } catch (error) {
    yield put({
      type: userAdminConstant.ADMIN_PROFILE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    notification['error']({
      message: 'Profile',
      description: `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    })
  }
}

function* updateAdminProfile(action) {
  try {
    const { admin } = action
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    const { data } = yield call(() =>
      axios.put(`${process.env.REACT_APP_API}/user/profile`, admin, config),
    )
    yield put({ type: userAdminConstant.ADMIN_UPDATE_SUCCESS })
    notification['success']({
      message: 'Profile',
      description: `Update Success`,
    })
    yield put({ type: userAdminConstant.ADMIN_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('adminInfo', JSON.stringify(data));

  } catch (error) {
    yield put({
      type: userAdminConstant.ADMIN_UPDATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
    notification['error']({
      message: 'Profile',
      description: `${
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      }`,
    })
  }
}

function* userAdminSaga() {
  yield takeEvery(userAdminConstant.ADMIN_LOGIN_REQUEST, login)
  yield takeEvery(userAdminConstant.LOGOUT_REQUEST, logout)
  yield takeEvery(userAdminConstant.ADMIN_CHANGEPW_REQUEST, changePassword)
  yield takeEvery(userAdminConstant.ADMIN_PROFILE_REQUEST, getProfile)
  yield takeEvery(userAdminConstant.ADMIN_UPDATE_REQUEST, updateAdminProfile)
}

export default userAdminSaga
