import * as orderConstant from '../constants/OrderConstant'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstant.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case orderConstant.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case orderConstant.ORDER_CREATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
export const orderDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstant.ORDER_DETAIL_REQUEST:
      return {
        loading: true,
      }
    case orderConstant.ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case orderConstant.ORDER_DETAIL_FAILED:
      return {
        loading: false,
        error: action.payload,
      }
    case orderConstant.ORDER_DETAIL_RESET:
      return {}
    default:
      return state
  }
}
export const orderPaypalReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstant.ORDER_PAYPAL_REQUEST:
      return {
        loading: true,
      }
    case orderConstant.ORDER_PAYPAL_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case orderConstant.ORDER_PAYPAL_FAILED:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
export const orderListReducer = (state = {}, action) => {
  switch (action.type) {
    case orderConstant.ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case orderConstant.ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case orderConstant.ORDER_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      }
    case orderConstant.ORDER_LIST_RESET:
      return {}
    default:
      return state
  }
}
