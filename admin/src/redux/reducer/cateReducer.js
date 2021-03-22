import * as cateConstant from '../constant/categoryConstant.js'

export const createCateReducer = (state = {}, action) => {
  switch (action.type) {
    case cateConstant.CATEGORY_CREATE_REQUEST:
      return { loading: true }
    case cateConstant.CATEGORY_CREATE_SUCCESS:
      return { loading: false, payload: action.payload }
    case cateConstant.CATEGORY_CREATE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const listCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case cateConstant.CATEGORY_LIST_REQUEST:
      return { loading: true }
    case cateConstant.CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload }
    case cateConstant.CATEGORY_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const detailCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case cateConstant.CATEGORY_DETAIL_REQUEST:
      return { loading: true }
    case cateConstant.CATEGORY_DETAIL_SUCCESS:
      return { loading: false, category: action.payload }
    case cateConstant.CATEGORY_DETAIL_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case cateConstant.CATEGORY_UPDATE_REQUEST:
      return { loading: true }
    case cateConstant.CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case cateConstant.CATEGORY_UPDATE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case cateConstant.CATEGORY_DELETE_REQUEST:
      return { loading: true }
    case cateConstant.CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true }
    case cateConstant.CATEGORY_DELETE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const listSubCategoryReducer = (state = { subCate: [] }, action) => {
  switch (action.type) {
    case cateConstant.SUB_CATEGORY_REQUEST:
      return { loading: true }
    case cateConstant.SUB_CATEGORY_SUCCESS:
      return { loading: false, success: true, subCate: action.payload }
    case cateConstant.SUB_CATEGORY_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
