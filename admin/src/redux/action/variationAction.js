import * as variationConstant from '../constant/variationConstant.js'

export const createVariationAction = (color, product, image, history) => ({
  type: variationConstant.VARIATION_CREATE_REQUEST,
  color,
  product,
  image,
  history
})
export const listVariationAction = () => ({
  type: variationConstant.VARIATION_LIST_REQUEST,
})

export const detailVariationAction = (id) => ({
  type: variationConstant.VARIATION_DETAIL_REQUEST,
  id,
})
export const updateVariationAction = (
  color,
  product,
  image,
  variation_id,
  currentProductId
) => ({
  type: variationConstant.VARIATION_UPDATE_REQUEST,
  color,
  product,
  image,
  variation_id,
  currentProductId
})
export const deleteVariationAction = (variation_id, slug) => ({
  type: variationConstant.VARIATION_DELETE_REQUEST,
  variation_id,
  slug
})
export const createSizeAction = (size, stock, variation_id) => ({
  type: variationConstant.SIZE_CREATE_REQUEST,
  variation_id,
  size,
  stock
})
export const deleteSizeAction = (variation_id, size_id) => ({
  type: variationConstant.SIZE_DELETE_REQUEST,
  variation_id,
  size_id
})