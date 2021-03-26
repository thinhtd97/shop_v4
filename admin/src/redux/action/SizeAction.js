import * as sizeConstant from '../constant/sizeConstant.js';

export const sizeCreateAction = (variationId, size, stock, slug) => ({
    type: sizeConstant.SIZE_CREATE_REQUEST,
    variationId,
    size,
    stock,
    slug
})
export const sizeDeleteAction = (variationId, sizeId, slug) => ({
    type: sizeConstant.SIZE_DELETE_REQUEST,
    variationId,
    sizeId,
    slug
})
export const sizeDetailAction = (sizeId) => ({
    type: sizeConstant.SIZE_DETAIL_REQUEST,
    sizeId,
})
export const sizeUpdateAction = (sizeId, size, stock, slug) => ({
    type: sizeConstant.SIZE_UPDATE_REQUEST,
    sizeId,
    size,
    stock, 
    slug
})