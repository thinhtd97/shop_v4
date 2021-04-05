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
  item,
})
export const incrementQuantity = (item) => ({
  type: cartConstant.INCREMENT_QUANTITY,
  item,
})
export const removeItem = (item, addToast) => ({
  type: cartConstant.REMOVE_ITEM,
  item,
  addToast,
})
export const removeAllItem = () => ({
  type: cartConstant.REMOVE_ALL_CART,
})
export const listCartAction = () => ({
  type: cartConstant.LIST_CART_REQUEST,
})
export const cartAddToDatabase = (
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
) => ({
  type: cartConstant.CART_ADD_DATABASE_REQUEST,
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
})
export const applyCouponAction = (code, addToast) => ({
  type: cartConstant.COUPON_APPLY_REQUEST,
  code,
  addToast
})
