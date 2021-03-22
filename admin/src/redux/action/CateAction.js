import * as cateConstant from '../constant/categoryConstant.js';

export const createCateAction = (name) => ({
    type: cateConstant.CATEGORY_CREATE_REQUEST,
    name
})
export const listCateAction = () => ({
    type: cateConstant.CATEGORY_LIST_REQUEST,
})

export const detailCategoryAction = (slug) => ({
    type: cateConstant.CATEGORY_DETAIL_REQUEST,
    slug
})
export const updateCategoryAction = (name, slug, history) => ({
    type: cateConstant.CATEGORY_UPDATE_REQUEST,
    slug,
    name,
    history
})
export const deleteCategoryAction = (slug) => ({
    type: cateConstant.CATEGORY_DELETE_REQUEST,
    slug,
})