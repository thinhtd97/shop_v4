import * as userConstants from '../constants/userConstants.js';

export const loginActionRequest = (email, password, addToast) => ({
    type: userConstants.USER_LOGIN_REQUEST,
    email,
    password,
    addToast
})

export const registerActionRequest = (user, addToast) => ({
    type: userConstants.USER_REGISTER_REQUEST,
    user,
    addToast
})

export const logoutAction = () => ({
    type: userConstants.LOGOUT,
})