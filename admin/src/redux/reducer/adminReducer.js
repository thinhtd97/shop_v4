import * as userAdminConstant from '../constant/userAdminConstant.js'

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case userAdminConstant.ADMIN_LOGIN_REQUEST:
      return { loading: true }
    case userAdminConstant.ADMIN_LOGIN_SUCCESS:
      return { loading: false, adminInfo: action.payload }
    case userAdminConstant.ADMIN_LOGIN_FAILED:
      return { loading: false, error: action.payload }
    case userAdminConstant.LOGOUT_REQUEST:
      return { loading: true }
    case userAdminConstant.LOGOUT:
      return {}
    default:
      return state
  }
}
export const changePwReducer = (state = {}, action) => {
  switch (action.type) {
    case userAdminConstant.ADMIN_CHANGEPW_REQUEST:
      return { loading: true }
    case userAdminConstant.ADMIN_CHANGEPW_SUCCESS:
      return { loading: false, success: true }
    case userAdminConstant.ADMIN_CHANGEPW_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const getProfileAdmin = (state = {}, action) => {
  switch (action.type) {
    case userAdminConstant.ADMIN_PROFILE_REQUEST:
      return { loading: true }
    case userAdminConstant.ADMIN_PROFILE_SUCCESS:
      return { loading: false, admin: action.payload }
    case userAdminConstant.ADMIN_PROFILE_FAILED:
      return { loading: false, error: action.payload }
    case userAdminConstant.ADMIN_PROFILE_RESET:
      return {}
    default:
      return state
  }
}
export const updateAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case userAdminConstant.ADMIN_UPDATE_REQUEST:
      return { loading: true }
    case userAdminConstant.ADMIN_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case userAdminConstant.ADMIN_UPDATE_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
