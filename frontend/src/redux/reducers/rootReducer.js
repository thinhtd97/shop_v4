import currencyReducer from './currencyReducer'
import cartReducer, { couponReducer, listCart } from './cartReducer'
import * as productReducer from './productReducer'
import * as categoryReducer from './categoryReducer'
import * as subReducer from './subReducer'
import { combineReducers } from 'redux'
import { createMultilanguageReducer } from 'redux-multilanguage'
import {
  loginReducer,
  registerReducer,
  sendMailReducer,
  newPasswordReducer,
  userProfileReducer,
  userUpdateProfileReducer,
  userUpdatePasswordReducer,
  userReviewReducer,
} from './userReducer'
import { addWishlistReducer, listWishlistReducer } from './wishlistReducer'
import { addressReducer } from './AddressReducer'

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: 'en' }),
  currencyData: currencyReducer,
  wishListData: listWishlistReducer,
  userLogin: loginReducer,
  userRegister: registerReducer,
  sendEmail: sendMailReducer,
  newPassword: newPasswordReducer,
  userProfile: userProfileReducer,
  updateProfileReducer: userUpdateProfileReducer,
  updatePasswordReducer: userUpdatePasswordReducer,
  listNewProduct: productReducer.listNewProductReducer,
  detailProduct: productReducer.detailProductReducer,
  listProduct: productReducer.listProductReducer,
  listCategories: categoryReducer.listCategories,
  listSub: subReducer.listSubs,
  cart: cartReducer,
  listCart: listCart,
  addToWishList: addWishlistReducer,
  userReview: userReviewReducer,
  coupons: couponReducer,
  listAddress: addressReducer,
})

export default rootReducer
