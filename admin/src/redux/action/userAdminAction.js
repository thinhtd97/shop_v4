import * as adminUserConstants from '../constant/userAdminConstant.js';

export const loginAdminAction = (email, password) => ({
    type: adminUserConstants.ADMIN_LOGIN_REQUEST,
    email,
    password
})

export const logoutAdminAction = () => ({
    type: adminUserConstants.LOGOUT_REQUEST,
})
export const changePasswordAction = (password, oldPassword) => ({
    type: adminUserConstants.ADMIN_CHANGEPW_REQUEST,
    oldPassword,
    password
})

export const getProfileAction = () => ({
    type: adminUserConstants.ADMIN_PROFILE_REQUEST,
})

export const updateAdminAction = (admin) => ({
    type: adminUserConstants.ADMIN_UPDATE_REQUEST,
    admin
})