import * as subConstant from '../constant/subConstant.js';

export const createSubAction = (name, parent) => ({
    type: subConstant.SUB_CREATE_REQUEST,
    name,
    parent
})
export const listSubAction = () => ({
    type: subConstant.SUB_LIST_REQUEST,
})

export const detailSubAction = (slug) => ({
    type: subConstant.SUB_DETAIL_REQUEST,
    slug
})
export const updateSubAction = (name, parent, slug, history) => ({
    type: subConstant.SUB_UPDATE_REQUEST,
    slug,
    name,
    parent, 
    history
})
export const deleteSubAction = (slug) => ({
    type: subConstant.SUB_DELETE_REQUEST,
    slug,
})