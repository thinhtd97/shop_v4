import * as variationConstant from '../constant/variationConstant.js'

export const createVariationAction = (color, product, image) => ({
  type: variationConstant.VARIATION_CREATE_REQUEST,
  color,
  product,
  image,
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
) => ({
  type: variationConstant.VARIATION_UPDATE_REQUEST,
  color,
  product,
  image,
  variation_id,
})
export const deleteVariationAction = (variation_id) => ({
  type: variationConstant.VARIATION_DELETE_REQUEST,
  variation_id,
})