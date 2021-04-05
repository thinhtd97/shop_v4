import { combineReducers } from 'redux'
import * as adminReducer from './adminReducer';
import * as cateReducer from './cateReducer.js';
import * as subReducer from './subReducer.js';
import * as productReducer from './productReducer.js';
import * as variationReducer from './variationReducer.js';
import * as sizeReducer from './sizeReducer.js';
import * as couponReducer from './couponReducer.js';

const rootReducer = combineReducers({
    adminLogin: adminReducer.loginReducer,
    adminProfile: adminReducer.getProfileAdmin,
    updateProfile: adminReducer.updateAdminReducer,
    cateCreate: cateReducer.createCateReducer,
    cateList: cateReducer.listCategoryReducer,
    cateDetail: cateReducer.detailCategoryReducer,
    cateDelete: cateReducer.deleteCategoryReducer,
    cateUpdate: cateReducer.updateCategoryReducer,
    listSubCate: cateReducer.listSubCategoryReducer,
    subUpdate: subReducer.updateSubReducer,
    subCreate: subReducer.createSubReducer,
    subList: subReducer.listSubReducer,
    subDetail: subReducer.detailSubReducer,
    subDelete: subReducer.deleteSubReducer,
    productList: productReducer.listProductReducer,
    productDetail: productReducer.detailProductReducer,
    productDelete: productReducer.deleteProductReducer,
    productCreate: productReducer.createProductReducer,
    productUpdate: productReducer.updateProductReducer,
    productCurrent: productReducer.currentProductReducer,
    variationList: variationReducer.listVariationReducer,
    variationDetail: variationReducer.detailVariationReducer,
    variationDelete: variationReducer.deleteVariationReducer,
    variationUpdate: variationReducer.updateVariationReducer,
    sizeCreate: sizeReducer.createSizeReducer,
    sizeDelete: sizeReducer.deleteSizeReducer,
    sizeDetail: sizeReducer.detailSizeReducer,
    sizeUpdate: sizeReducer.updateSizeReducer,
    couponList: couponReducer.listReducer,
    couponCreate: couponReducer.createReducer,
})

export default rootReducer
