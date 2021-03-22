import { combineReducers } from 'redux'
import * as adminReducer from './adminReducer';
import * as cateReducer from './cateReducer.js';
import * as subReducer from './subReducer.js';

const rootReducer = combineReducers({
    adminLogin: adminReducer.loginReducer,
    adminProfile: adminReducer.getProfileAdmin,
    updateProfile: adminReducer.updateAdminReducer,
    cateCreate: cateReducer.createCateReducer,
    cateList: cateReducer.listCategoryReducer,
    cateDetail: cateReducer.detailCategoryReducer,
    cateDelete: cateReducer.deleteCategoryReducer,
    subCreate: subReducer.createSubReducer,
    subList: subReducer.listSubReducer,
    subDetail: subReducer.detailSubReducer,
    subDelete: subReducer.deleteSubReducer
})

export default rootReducer
