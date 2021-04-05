import * as couponConstant from '../constant/listCoupon'

export const listCouponAction = () => ({
  type: couponConstant.COUPON_LIST_REQUEST,
})
export const createCouponAction = (code, discount) => ({
  type: couponConstant.COUPON_CREATE_REQUEST,
  code,
  discount
})
export const removeCouponUsedAction = () => ({
  type: couponConstant.COUPON_REMOVE_USED_REQUEST,
})
