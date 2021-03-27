import * as categoryConstant from '../constants/categoryConstant';

export const listCategories = (state = {}, action) => {
    switch(action.type) {
        case categoryConstant.CATEGORY_LIST_REQUEST:
            return { loading: true }
        case categoryConstant.CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload }
        case categoryConstant.CATEGORY_LIST_FAILED:
            return { loading: false, error: action.payload }
        default: 
            return state;
    }
}