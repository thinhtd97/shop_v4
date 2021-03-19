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

export const sendMailAction = (email, addToast) => ({
    type: userConstants.USER_SENDMAIL_REQUEST,
    email,
    addToast
})
export const newPasswordAction = (password, token, history, addToast) => ({
    type: userConstants.USER_NEWPW_REQUEST,
    password,
    addToast,
    token,
    history
})