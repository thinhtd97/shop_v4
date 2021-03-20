import * as cateConstant from '../constant/categoryConstant.js';

export const createCateAction = (state = {}, action) => {
    switch(action.type) {
        case cateConstant.CATEGORY_CREATE_REQUEST:
            return { loading: true }
        case cateConstant.CATEGORY_CREATE_SUCCESS:
            return { loading: false, payload: action.payload }
        case cateConstant.CATEGORY_CREATE_FAILED:
            return { loading: false, error: action.payload }
        default: 
            return state;
    }
}