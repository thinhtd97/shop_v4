import currencyReducer from './currencyReducer'
import cartReducer, { cartAddDatabaseReducer, listCart } from './cartReducer'
import * as productReducer from './productReducer'
import * as categoryReducer from './categoryReducer'
import * as subReducer from './subReducer'
import wishlistReducer from './wishlistReducer'
import compareReducer from './compareReducer'
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
} from './userReducer'

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: 'en' }),
  currencyData: currencyReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
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
  addCartDatabase: cartAddDatabaseReducer,
})

export default rootReducer
