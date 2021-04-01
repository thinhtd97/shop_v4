import * as cartConstant from '../constants/cartConstant'

//add to cart
export const addToCartAction = (
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
) => ({
  type: cartConstant.CART_ADD_REQUEST,
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
})
export const decrementQuantity = (item) => ({
  type: cartConstant.DECREMENT_QUANTITY,
  item
})
export const incrementQuantity = (item) => ({
  type: cartConstant.INCREMENT_QUANTITY,
  item
})
export const removeItem = (item) => ({
  type: cartConstant.REMOVE_ITEM,
  item
})
export const removeAllItem = () => ({
  type: cartConstant.REMOVE_ALL_CART,
})

