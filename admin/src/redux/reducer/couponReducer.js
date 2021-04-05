import * as couponConstant from '../constant/listCoupon.js'

export const createReducer = (state = {}, action) => {
  switch (action.type) {
    case couponConstant.COUPON_CREATE_REQUEST:
      return { loading: true }
    case couponConstant.COUPON_CREATE_SUCCESS:
      return { loading: false, success: true }
    case couponConstant.COUPON_CREATE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const listReducer = (state = { coupons: [] }, action) => {
  switch (action.type) {
    case couponConstant.COUPON_LIST_REQUEST:
      return { loading: true }
    case couponConstant.COUPON_LIST_SUCCESS:
      return { loading: false, coupons: action.payload }
    case couponConstant.COUPON_LIST_FAILED:
      return { loading: false, error: action.payload }
    case couponConstant.COUPON_REMOVE_USED_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case couponConstant.COUPON_REMOVE_USED_SUCCESS:
      let itemRemove = state.coupons.filter((item) => item.used !== true)
      return {
        ...state,
        loading: false,
        coupons: itemRemove,
      }
    case couponConstant.COUPON_REMOVE_USED_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
