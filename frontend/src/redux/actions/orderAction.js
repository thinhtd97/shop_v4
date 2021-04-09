import * as orderConstant from '../constants/OrderConstant'

export const createOrderAction = (
  cartItems,
  shippingAddress,
  paymentMethod,
  shippingPrice,
  orderId,
  addToast,
  history
) => ({
  type: orderConstant.ORDER_CREATE_REQUEST,
  cartItems,
  shippingAddress,
  paymentMethod,
  shippingPrice,
  orderId,
  addToast,
  history
})
