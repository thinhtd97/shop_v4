import currencyReducer from "./currencyReducer";
import cartReducer from "./cartReducer";
import * as productReducer from './productReducer';
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import { 
  loginReducer, 
  registerReducer, 
  sendMailReducer, 
  newPasswordReducer, 
  userProfileReducer, 
  userUpdateProfileReducer,
  userUpdatePasswordReducer } from "./userReducer";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  userLogin: loginReducer,
  userRegister: registerReducer,
  sendEmail: sendMailReducer,
  newPassword: newPasswordReducer,
  userProfile: userProfileReducer,
  updateProfileReducer: userUpdateProfileReducer,
  updatePasswordReducer: userUpdatePasswordReducer,
  listProduct: productReducer.listNewProductReducer
});

export default rootReducer;
