import * as product from '../constants/productConstant'

export const listNewProductReducer = (state = {}, action) => {
  switch (action.type) {
    case product.PRODUCT_LIST_NEW_REQUEST:
      return { loading: true }
    case product.PRODUCT_LIST_NEW_SUCCESS:
      return { loading: false, products: action.payload }
    case product.PRODUCT_LIST_NEW_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const detailProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case product.PRODUCT_DETAIL_REQUEST:
      return { loading: true }
    case product.PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload }
    case product.PRODUCT_DETAIL_SUCCESS:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const listProductReducer = (state = { products: {} }, action) => {
  switch (action.type) {
    case product.PRODUCT_LIST_REQUEST:
      return { loading: true }
    case product.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case product.PRODUCT_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
