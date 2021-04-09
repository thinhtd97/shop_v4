import * as orderConstant from '../constants/OrderConstant'

export const createOrderAction = (
  cartItems,
  shippingAddress,
  paymentMethod,
  shippingPrice,
  orderId,
  addToast,
  finalPrice,
  history,
) => ({
  type: orderConstant.ORDER_CREATE_REQUEST,
  cartItems,
  shippingAddress,
  paymentMethod,
  shippingPrice,
  orderId,
  addToast,
  finalPrice,
  history,
})
export const detailOrderAction = (orderId) => ({
  type: orderConstant.ORDER_DETAIL_REQUEST,
  orderId,
})
