import * as sizeConstant from '../constant/sizeConstant.js';

export const createSizeReducer = (state = {}, action) => {
    switch(action.type) {
        case sizeConstant.SIZE_CREATE_REQUEST:
            return { loading: true }
        case sizeConstant.SIZE_CREATE_SUCCESS:
            return { loading: false, size: action.payload }
        case sizeConstant.SIZE_CREATE_FAILED:
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}
export const deleteSizeReducer = (state = {}, action) => {
    switch(action.type) {
        case sizeConstant.SIZE_DELETE_REQUEST:
            return { loading: true }
        case sizeConstant.SIZE_DELETE_SUCCESS:
            return { loading: false, success: true }
        case sizeConstant.SIZE_DELETE_FAILED:
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}
export const detailSizeReducer = (state = { size: {} }, action) => {
    switch(action.type) {
        case sizeConstant.SIZE_DETAIL_REQUEST:
            return { loading: true }
        case sizeConstant.SIZE_DETAIL_SUCCESS:
            return { loading: false, size: action.payload }
        case sizeConstant.SIZE_DETAIL_FAILED:
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}
export const updateSizeReducer = (state = {}, action) => {
    switch (action.type) {
      case sizeConstant.SIZE_UPDATE_REQUEST:
        return { loading: true }
      case sizeConstant.SIZE_UPDATE_SUCCESS:
        return { loading: false, success: true }
      case sizeConstant.SIZE_UPDATE_FAILED:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }