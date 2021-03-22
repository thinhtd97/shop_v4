import * as productConstant from '../constant/ProductConstant.js'

export const createProductAction = (product) => ({
  type: productConstant.PRODUCT_CREATE_REQUEST,
  product,
})
export const listProductAction = () => ({
  type: productConstant.PRODUCT_LIST_REQUEST,
})

export const detailProductAction = (slug) => ({
  type: productConstant.PRODUCT_DETAIL_REQUEST,
  slug,
})
export const updateProductAction = (product, slug, history) => ({
  type: productConstant.PRODUCT_UPDATE_REQUEST,
  product,
  slug,
  history
})
export const deleteProductAction = (slug) => ({
  type: productConstant.PRODUCT_DELETE_REQUEST,
  slug,
})
