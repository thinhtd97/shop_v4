import { call, put, select, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import * as couponConstant from '../constant/listCoupon.js'
import { message } from 'antd'

function* createCoupon(action) {
  const { code, discount } = action
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
        `${process.env.REACT_APP_API}/coupon`,
        { code, discount },
        config,
      ),
    )
    yield put({
      type: couponConstant.COUPON_CREATE_SUCCESS,
    })
    message.success(`Create Coupon Success`)
  } catch (error) {
    yield put({
      type: couponConstant.COUPON_CREATE_FAILED,
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
function* listCoupon() {
  try {
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/coupon`, config),
    )
    yield put({
      type: couponConstant.COUPON_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    yield put({
      type: couponConstant.COUPON_LIST_FAILED,
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
function* removeCouponUsed() {
  try {
    const { adminInfo } = yield select((state) => state.adminLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminInfo.token}`,
      },
    }
    yield call(() =>
      axios.delete(`${process.env.REACT_APP_API}/coupon`, config),
    )
    yield put({
      type: couponConstant.COUPON_REMOVE_USED_SUCCESS,
    })
  } catch (error) {
    yield put({
      type: couponConstant.COUPON_REMOVE_USED_FAILED,
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
function* couponSaga() {
  yield takeEvery(couponConstant.COUPON_CREATE_REQUEST, createCoupon)
  yield takeEvery(couponConstant.COUPON_LIST_REQUEST, listCoupon)
  yield takeEvery(couponConstant.COUPON_REMOVE_USED_REQUEST, removeCouponUsed)
}
export default couponSaga
