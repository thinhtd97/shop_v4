import * as productConstants from '../constant/ProductConstant.js'

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case productConstants.PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case productConstants.PRODUCT_CREATE_SUCCESS:
      return { loading: false, payload: action.payload }
    case productConstants.PRODUCT_CREATE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const listProductReducer = (state = {}, action) => {
  switch (action.type) {
    case productConstants.PRODUCT_LIST_REQUEST:
      return { loading: true }
    case productConstants.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case productConstants.PRODUCT_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const detailProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productConstants.PRODUCT_DETAIL_REQUEST:
      return { loading: true }
    case productConstants.PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload }
    case productConstants.PRODUCT_DETAIL_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case productConstants.PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case productConstants.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case productConstants.PRODUCT_UPDATE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case productConstants.PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case productConstants.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case productConstants.PRODUCT_DELETE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const currentProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case productConstants.PRODUCT_CURRENT_REQUEST:
      return { loading: true }
    case productConstants.PRODUCT_CURRENT_SUCCESS:
      return { loading: false, product: action.payload }
    case productConstants.PRODUCT_CURRENT_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}