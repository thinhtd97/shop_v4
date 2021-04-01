import { call, put, takeEvery, select, take, takeMaybe } from 'redux-saga/effects'
import * as cartConstants from '../constants/cartConstant.js'

function* addToCart(action) {
  const {
    product,
    cartId,
    slug,
    name,
    image,
    price,
    stock,
    qty,
    size,
    color,
    priceDiscount,
    addToast,
  } = action
  try {
    yield put({
      type: cartConstants.CART_ADD_ITEM,
      payload: {
        product,
        cartId,
        slug,
        name,
        image,
        price,
        stock,
        qty,
        size,
        color,
        priceDiscount,
        addToast,
      },
    })
    addToast('Added To Cart', { appearance: 'success', autoDismiss: true })
  } catch (error) {
    addToast(`${error}`, { appearance: 'error', autoDismiss: true })
  }
}
function* decrementQty(action) {
  const { cartItems } = yield select((state) => state.cart)
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

function* incrementQty(action) {
  const { cartItems } = yield select((state) => state.cart)
  localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

function* cartSaga() {
  yield takeEvery(cartConstants.CART_ADD_REQUEST, addToCart)
  yield takeMaybe(cartConstants.DECREMENT_QUANTITY, decrementQty)
  yield takeMaybe(cartConstants.INCREMENT_QUANTITY, incrementQty)
}

export default cartSaga
