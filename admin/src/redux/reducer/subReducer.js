import * as subConstant from '../constant/subConstant.js'

export const createSubReducer = (state = {}, action) => {
  switch (action.type) {
    case subConstant.SUB_CREATE_REQUEST:
      return { loading: true }
    case subConstant.SUB_CREATE_SUCCESS:
      return { loading: false, payload: action.payload }
    case subConstant.SUB_CREATE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const listSubReducer = (state = { subs: [] }, action) => {
  switch (action.type) {
    case subConstant.SUB_LIST_REQUEST:
      return { loading: true }
    case subConstant.SUB_LIST_SUCCESS:
      return { loading: false, subs: action.payload }
    case subConstant.SUB_LIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const detailSubReducer = (state = {}, action) => {
  switch (action.type) {
    case subConstant.SUB_DETAIL_REQUEST:
      return { loading: true }
    case subConstant.SUB_DETAIL_SUCCESS:
      return { loading: false, sub: action.payload }
    case subConstant.SUB_DETAIL_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const updateSubReducer = (state = {}, action) => {
  switch (action.type) {
    case subConstant.SUB_UPDATE_REQUEST:
      return { loading: true }
    case subConstant.SUB_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case subConstant.SUB_UPDATE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const deleteSubReducer = (state = {}, action) => {
  switch (action.type) {
    case subConstant.SUB_DELETE_REQUEST:
      return { loading: true }
    case subConstant.SUB_DELETE_SUCCESS:
      return { loading: false, success: true }
    case subConstant.SUB_DELETE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
