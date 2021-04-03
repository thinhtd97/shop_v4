import * as cartConstant from '../constants/cartConstant.js'

const cartReducer = (state = { cartItems: [] }, action) => {
  let product = action.item
  switch (action.type) {
    case cartConstant.CART_ADD_REQUEST:
      return { ...state, loading: true }
    case cartConstant.CART_ADD_ITEM:
      let item = action.payload
      if (state.cartItems === undefined) {
        state.cartItems = []
      }
      const existItem = state.cartItems.find((p) => p.product === item.product)
      if (existItem) {
        item.qty += existItem.qty
        return {
          ...state,
          loading: false,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x,
          ),
        }
      } else {
        return {
          ...state,
          loading: false,
          cartItems: [...state.cartItems, item],
        }
      }
    case cartConstant.DECREMENT_QUANTITY:
      if (product.qty === 1) {
        let item = state.cartItems.filter(
          (cartItem) => cartItem.product !== product.product,
        )
        return {
          ...state,
          loading: false,
          cartItems: item,
        }
      } else {
        let itemDecrement = state.cartItems.map((item) =>
          item.product === product.product
            ? { ...item, qty: item.qty - 1 }
            : item,
        )
        return {
          ...state,
          loading: false,
          cartItems: itemDecrement,
        }
      }
    case cartConstant.INCREMENT_QUANTITY:
      let itemIncrement = state.cartItems.map((item) =>
        item.product === product.product
          ? { ...item, qty: item.qty + 1 }
          : item,
      )
      return {
        ...state,
        cartItems: itemIncrement,
      }
    case cartConstant.REMOVE_ITEM:
      let itemRemove = state.cartItems.filter((item) => {
        return item.product !== product.product
      })
      return {
        ...state,
        cartItems: itemRemove,
      }
    case cartConstant.REMOVE_ALL_CART:
      return {
        ...state,
        cartItems: [],
      }

    default:
      return state
  }
}

export const listCart = (state = { cartItems: [] }, action) => {
  let product = action.item
  switch (action.type) {
    case cartConstant.LIST_CART_REQUEST:
      return { loading: true }
    case cartConstant.LIST_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      }
    case cartConstant.LIST_CART_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case cartConstant.LIST_CART_RESET:
      return {
        loading: false,
        cartItems: [],
      }
    case cartConstant.DECREMENT_QUANTITY:
      if (product.qty === 1) {
        let item = state.cartItems.filter(
          (cartItem) => cartItem.product !== product.product,
        )
        return {
          ...state,
          loading: false,
          cartItems: item,
        }
      } else {
        let itemDecrement = state.cartItems.map((item) =>
          item.product === product.product
            ? { ...item, qty: item.qty - 1 }
            : item,
        )
        return {
          ...state,
          loading: false,
          cartItems: itemDecrement,
        }
      }
    case cartConstant.INCREMENT_QUANTITY:
      let itemIncrement = state.cartItems.map((item) =>
        item.product === product.product
          ? { ...item, qty: item.qty + 1 }
          : item,
      )
      return {
        ...state,
        cartItems: itemIncrement,
      }
    case cartConstant.REMOVE_ITEM:
      let itemRemove = state.cartItems.filter((item) => {
        return item.product !== product.product
      })
      return {
        ...state,
        cartItems: itemRemove,
      }
    case cartConstant.REMOVE_ALL_CART:
      return {
        ...state,
        cartItems: [],
      }
    default:
      return state
  }
}



export default cartReducer
