import * as variationConstant from '../constant/variationConstant.js'

export const createVariationReducer = (state = {}, action) => {
  switch (action.type) {
    case variationConstant.VARIATION_CREATE_REQUEST:
      return { loading: true }
    case variationConstant.VARIATION_CREATE_SUCCESS:
      return { loading: false, payload: action.payload }
    case variationConstant.VARIATION_CREATE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const listVariationReducer = (state = {}, action) => {
  switch (action.type) {
    case variationConstant.VARIATION_LIST_REQUEST:
      return { loading: true }
    case variationConstant.VARIATION_LIST_SUCCESS:
      return { loading: false, variations: action.payload }
    case variationConstant.VARIATION_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const detailVariationReducer = (state = {}, action) => {
  switch (action.type) {
    case variationConstant.VARIATION_DETAIL_REQUEST:
      return { loading: true }
    case variationConstant.VARIATION_DETAIL_SUCCESS:
      return { loading: false, variation: action.payload }
    case variationConstant.VARIATION_DETAIL_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const updateVariationReducer = (state = {}, action) => {
  switch (action.type) {
    case variationConstant.VARIATION_UPDATE_REQUEST:
      return { loading: true }
    case variationConstant.VARIATION_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case variationConstant.VARIATION_UPDATE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const deleteVariationReducer = (state = {}, action) => {
  switch (action.type) {
    case variationConstant.VARIATION_DELETE_REQUEST:
      return { loading: true }
    case variationConstant.VARIATION_DELETE_SUCCESS:
      return { loading: false, success: true }
    case variationConstant.VARIATION_DELETE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}