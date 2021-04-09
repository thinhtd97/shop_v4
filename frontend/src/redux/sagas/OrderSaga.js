import { call, put, takeEvery, select } from 'redux-saga/effects'
import * as orderConstant from '../constants/OrderConstant.js'
import * as cartConstant from '../constants/cartConstant.js'
import axios from 'axios'

function* createOrder(action) {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    orderId,
    addToast,
    finalPrice,
    history,
  } = action
  try {
    const { userInfo } = yield select((state) => state.userLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data: dataOrder } = yield call(() =>
      axios.post(
        `${process.env.REACT_APP_API}/order`,
        {
          cartItems,
          shippingAddress,
          orderId,
          paymentMethod,
          shippingPrice,
          finalPrice,
        },
        config,
      ),
    )
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/cart`, config),
    )
    yield put({
      type: cartConstant.LIST_CART_SUCCESS,
      payload: data,
    })
    yield put({
      type: orderConstant.ORDER_CREATE_SUCCESS,
    })

    history.push(`/order/${dataOrder.orderId}`)
  } catch (error) {
    yield put({
      type: orderConstant.ORDER_CREATE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })

    addToast(`${error}`, { appearance: 'error', autoDismiss: true })
  }
}

function* detailOrder(action) {
  const { orderId } = action
  try {
    const { userInfo } = yield select((state) => state.userLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/order/${orderId}`, config),
    )
    yield put({
      type: orderConstant.ORDER_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    yield put({
      type: orderConstant.ORDER_DETAIL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

function* OrderSaga() {
  yield takeEvery(orderConstant.ORDER_CREATE_REQUEST, createOrder)
  yield takeEvery(orderConstant.ORDER_DETAIL_REQUEST, detailOrder)
}
export default OrderSaga
