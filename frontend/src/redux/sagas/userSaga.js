import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'
import * as userConstant from '../constants/userConstants'
import * as cartConstant from '../constants/cartConstant'

function* login(action) {
  const { email, password, addToast } = action
  const { cart } = yield select((state) => ({ ...state }))
  const { cartItems } = cart
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_API}/user/login`,
        { email, password },
        config,
      ),
    )

    const configListCart = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.token}`,
      },
    }

    if (cartItems.length >= 1) {
      cartItems.map(
        async (item) =>
          await axios.post(
            `${process.env.REACT_APP_API}/cart/${item.slug}`,
            {
              name: item.name,
              image: item.image,
              size: item.size,
              price: item.price,
              qty: item.qty,
              color: item.color,
              stock: item.stock,
              product: item.product,
              priceDiscount: item.priceDiscount,
            },
            configListCart,
          ),
      )
      const { data: dataCart } = yield call(() =>
        axios.get(`${process.env.REACT_APP_API}/cart`, configListCart),
      )
      yield put({ type: cartConstant.LIST_CART_SUCCESS, payload: dataCart })
    }

    yield put({ type: userConstant.USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    yield put({
      type: userConstant.USER_LOGIN_FAILED,
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
function* register(action) {
  const { user, addToast } = action
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = yield call(() =>
      axios.post(`${process.env.REACT_APP_API}/user/register`, user, config),
    )
    yield put({ type: userConstant.USER_REGISTER_SUCCESS })

    yield put({ type: userConstant.USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))

    addToast('Signup successfully!', {
      appearance: 'success',
      autoDismiss: true,
      autoDismissTimeout: 1000,
    })
  } catch (error) {
    yield put({
      type: userConstant.USER_REGISTER_FAILED,
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
function* logout() {
  yield put({ type: userConstant.LOGOUT_SUCCESS })
  yield put({ type: userConstant.USER_PROFILE_RESET })
  yield put({ type: cartConstant.LIST_CART_RESET })
}
function* sendMail(action) {
  const { email, addToast } = action
  try {
    yield call(() =>
      axios.post(`${process.env.REACT_APP_API}/user/reset-password`, { email }),
    )
    yield put({ type: userConstant.USER_SENDMAIL_SUCCESS })
    addToast('We sent an email to verify your account', {
      appearance: 'success',
      autoDismiss: true,
      autoDismissTimeout: 3000,
    })
  } catch (error) {
    yield put({
      type: userConstant.USER_SENDMAIL_FAILED,
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

function* newPassword(action) {
  const { addToast, password, token, history } = action
  try {
    yield call(() =>
      axios.post(`${process.env.REACT_APP_API}/user/new-password`, {
        password,
        token,
      }),
    )
    yield put({ type: userConstant.USER_NEWPW_SUCCESS })
    addToast('Change password successfully.', {
      appearance: 'success',
      autoDismiss: true,
      autoDismissTimeout: 3000,
    })
    history.push('/login-register')
  } catch (error) {
    yield put({
      type: userConstant.USER_NEWPW_FAILED,
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

function* userProfile(action) {
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
      axios.get(`${process.env.REACT_APP_API}/user/profile`, config),
    )
    yield put({ type: userConstant.USER_PROFILE_SUCCESS, payload: data })
  } catch (error) {
    yield put({
      type: userConstant.USER_PROFILE_FAILED,
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

function* updateProfile(action) {
  const { addToast, user } = action
  try {
    const { userInfo } = yield select((state) => state.userLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = yield call(() =>
      axios.put(`${process.env.REACT_APP_API}/user/profile`, user, config),
    )
    yield put({ type: userConstant.USER_UPDATE_PROFILE_SUCCESS })

    yield put({ type: userConstant.USER_LOGIN_SUCCESS, payload: data })

    yield put({ type: userConstant.USER_PROFILE_SUCCESS, payload: data })

    addToast('Update Profile successfully.', {
      appearance: 'success',
      autoDismiss: true,
      autoDismissTimeout: 3000,
    })
  } catch (error) {
    yield put({
      type: userConstant.USER_UPDATE_PROFILE_FAILED,
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
function* updatePasswordProfile(action) {
  const { addToast, password, oldPassword } = action
  try {
    const { userInfo } = yield select((state) => state.userLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
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
      type: userConstant.USER_UPDATE_PW_SUCCESS,
    })
    addToast('Update Password Successfully!', {
      appearance: 'success',
      autoDismiss: true,
      autoDismissTimeout: 3000,
    })
  } catch (error) {
    yield put({
      type: userConstant.USER_UPDATE_PW_FAILED,
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

function* userSaga() {
  yield takeEvery(userConstant.USER_LOGIN_REQUEST, login)
  yield takeEvery(userConstant.USER_REGISTER_REQUEST, register)
  yield takeEvery(userConstant.USER_SENDMAIL_REQUEST, sendMail)
  yield takeEvery(userConstant.USER_NEWPW_REQUEST, newPassword)
  yield takeEvery(userConstant.USER_PROFILE_REQUEST, userProfile)
  yield takeEvery(userConstant.USER_UPDATE_PROFILE_REQUEST, updateProfile)
  yield takeEvery(userConstant.USER_UPDATE_PW_REQUEST, updatePasswordProfile)
  yield takeEvery(userConstant.LOGOUT_REQUEST, logout)
}

export default userSaga
