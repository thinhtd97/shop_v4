import { call, put, takeEvery, select } from 'redux-saga/effects'
import * as cartConstants from '../constants/cartConstant.js'
import axios from 'axios'

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
    const { userInfo } = yield select((state) => state.userLogin)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
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

//name
//image
//size
//price
//qty
//color
//stock
//product
//priceDiscount
function* addCartDatabase(action) {
  const {
    product,
    slug,
    name,
    image,
    price,
    countInStock,
    quantity,
    size,
    color,
    discountedPrice,
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
        `${process.env.REACT_APP_API}/cart/${slug}`,
        {
          name,
          slug,
          image,
          size,
          price: Number(price),
          qty: Number(quantity),
          color,
          product,
          priceDiscount: Number(discountedPrice),
          stock: Number(countInStock),
        },
        config,
      ),
    )

    yield put({
      type: cartConstants.CART_ADD_DATABASE_SUCCESS,
    })
    const { data } = yield call(() =>
      axios.get(`${process.env.REACT_APP_API}/cart`, config),
    )
    yield put({
      type: cartConstants.LIST_CART_SUCCESS,
      payload: data,
    })

    addToast('Added To Cart', { appearance: 'success', autoDismiss: true })
  } catch (error) {
    yield put({
      type: cartConstants.CART_ADD_DATABASE_FAILED,
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

function* handleDecrementQuantity(action) {
  const { item } = action
  const { userInfo } = yield select((state) => state.userLogin)

  if (userInfo) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    yield call(() =>
      axios.put(
        `${process.env.REACT_APP_API}/cart/${item.slug}/${item.qty - 1}`,
        {},
        config,
      ),
    )
  }
}
function* handleDIncrementQuantity(action) {
  const { item } = action
  const { userInfo } = yield select((state) => state.userLogin)
  if (userInfo) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    yield call(() =>
      axios.put(
        `${process.env.REACT_APP_API}/cart/${item.slug}/${item.qty + 1}`,
        {},
        config,
      ),
    )
  }
}
function* deleteItems(action) {
  const { item, addToast } = action
  const { userInfo } = yield select((state) => state.userLogin)
  if (userInfo) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    addToast('Removed Item', { appearance: 'success', autoDismiss: true })
    yield call(() =>
      axios.delete(`${process.env.REACT_APP_API}/cart/${item.slug}`, config),
    )
  }
}
function* deleteAllItems() {
  const { userInfo } = yield select((state) => state.userLogin)
  if (userInfo) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    yield call(() => axios.delete(`${process.env.REACT_APP_API}/cart`, config))
  }
}

function* cartSaga() {
  yield takeEvery(cartConstants.CART_ADD_REQUEST, addToCart)
  yield takeEvery(cartConstants.CART_ADD_DATABASE_REQUEST, addCartDatabase)
  yield takeEvery(cartConstants.DECREMENT_QUANTITY, handleDecrementQuantity)
  yield takeEvery(cartConstants.INCREMENT_QUANTITY, handleDIncrementQuantity)
  yield takeEvery(cartConstants.REMOVE_ITEM, deleteItems)
  yield takeEvery(cartConstants.REMOVE_ALL_CART, deleteAllItems)
}

export default cartSaga
