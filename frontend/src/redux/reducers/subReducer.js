import * as subConstant from '../constants/subConstant';

export const listSubs = (state = {}, action) => {
    switch(action.type) {
        case subConstant.SUB_LIST_REQUEST:
            return { loading: true }
        case subConstant.SUB_LIST_SUCCESS:
            return { loading: false, subs: action.payload }
        case subConstant.SUB_LIST_FAILED:
            return { loading: false, error: action.payload }
        default: 
            return state;
    }
}