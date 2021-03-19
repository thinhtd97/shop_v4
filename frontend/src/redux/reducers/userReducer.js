import * as userConstants from '../constants/userConstants.js';

export const loginReducer = (state = {}, action) => {
    switch(action.type) {
        case userConstants.USER_LOGIN_REQUEST:
            return { loading: true }
        case userConstants.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case userConstants.USER_LOGIN_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case userConstants.LOGOUT_REQUEST: 
            return { loading: true }
        case userConstants.LOGOUT_SUCCESS:
            return {};
        default: 
            return state;
    } 
}
export const registerReducer = (state = {}, action) => {
    switch(action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            return { loading: true }
        case userConstants.USER_REGISTER_SUCCESS:
            return { loading: false, success: true }
        case userConstants.USER_REGISTER_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        default: 
            return state;
    } 
}
export const sendMailReducer = (state = {}, action) => {
    switch(action.type) {
        case userConstants.USER_SENDMAIL_REQUEST:
            return { loading: true }
        case userConstants.USER_SENDMAIL_SUCCESS:
            return { loading: false, success: true }
        case userConstants.USER_SENDMAIL_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        default: 
            return state;
    } 
}
export const newPasswordReducer = (state = {}, action) => {
    switch(action.type) {
        case userConstants.USER_NEWPW_REQUEST:
            return { loading: true }
        case userConstants.USER_NEWPW_SUCCESS:
            return { loading: false, success: true }
        case userConstants.USER_NEWPW_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        default: 
            return state;
    } 
}
export const userProfileReducer = (state = {}, action) => {
    switch(action.type) {
        case userConstants.USER_PROFILE_REQUEST:
            return { loading: true }
        case userConstants.USER_PROFILE_SUCCESS:
            return { loading: false, user: action.payload }
        case userConstants.USER_PROFILE_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case userConstants.USER_PROFILE_RESET: 
            return {}
        default: 
            return state;
    } 
}
export const userUpdateProfileReducer = (state = {}, action) => {
    switch(action.type) {
        case userConstants.USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case userConstants.USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true }
        case userConstants.USER_UPDATE_PROFILE_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        default: 
            return state;
    } 
}
export const userUpdatePasswordReducer = (state = {}, action) => {
    switch(action.type) {
        case userConstants.USER_UPDATE_PW_REQUEST:
            return { loading: true }
        case userConstants.USER_UPDATE_PW_SUCCESS:
            return { loading: false, success: true }
        case userConstants.USER_UPDATE_PW_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        default: 
            return state;
    } 
}