import * as userConstants from '../constants/userConstants.js'

export const loginActionRequest = (email, password, addToast) => ({
  type: userConstants.USER_LOGIN_REQUEST,
  email,
  password,
  addToast,
})

export const registerActionRequest = (user, addToast) => ({
  type: userConstants.USER_REGISTER_REQUEST,
  user,
  addToast,
})

export const logoutAction = () => ({
  type: userConstants.LOGOUT_REQUEST,
})

export const sendMailAction = (email, addToast) => ({
  type: userConstants.USER_SENDMAIL_REQUEST,
  email,
  addToast,
})
export const newPasswordAction = (password, token, history, addToast) => ({
  type: userConstants.USER_NEWPW_REQUEST,
  password,
  addToast,
  token,
  history,
})

export const userProfileAction = (addToast) => ({
  type: userConstants.USER_PROFILE_REQUEST,
  addToast,
})

export const userProfileUpdateAction = (addToast, user) => ({
  type: userConstants.USER_UPDATE_PROFILE_REQUEST,
  addToast,
  user,
})

export const userChangePasswordAction = (addToast, password, oldPassword) => ({
  type: userConstants.USER_UPDATE_PW_REQUEST,
  addToast,
  password,
  oldPassword,
})

export const userReviewsAction = (slug, comment, rating) => ({
  type: userConstants.USER_REVIEWS_REQUEST,
  slug,
  comment,
  rating
})
export const replyComment = (slug, user, replyComment) => ({
  type: userConstants.USER_REPLY_REVIEWS_REQUEST,
  slug,
  user,
  replyComment
})