import * as product from '../constants/productConstant.js'

export const listNewProductAction = () => ({
  type: product.PRODUCT_LIST_NEW_REQUEST,
})
export const detailProductAction = (slug) => ({
  type: product.PRODUCT_DETAIL_REQUEST,
  slug
})
export const listProductAction = () => ({
  type: product.PRODUCT_LIST_REQUEST,
})