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
  } = action
  try {
    const { userInfo } = yield select((state) => state.userLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    yield call(() =>
      axios.post(
        `${process.env.REACT_APP_API}/order`,
        { cartItems, shippingAddress, orderId, paymentMethod, shippingPrice },
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

function* OrderSaga() {
  yield takeEvery(orderConstant.ORDER_CREATE_REQUEST, createOrder)
}
export default OrderSaga
