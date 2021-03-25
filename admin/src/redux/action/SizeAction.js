import * as sizeConstant from '../constant/sizeConstant.js';

export const sizeCreateAction = (variationId, size, stock) => ({
    type: sizeConstant.SIZE_CREATE_REQUEST,
    variationId,
    size,
    stock
})
export const sizeDeleteAction = (variationId, sizeId) => ({
    type: sizeConstant.SIZE_DELETE_REQUEST,
    variationId,
    sizeId,
})
export const sizeDetailAction = (sizeId) => ({
    type: sizeConstant.SIZE_DETAIL_REQUEST,
    sizeId,
})
export const sizeUpdateAction = (sizeId, size, stock) => ({
    type: sizeConstant.SIZE_UPDATE_REQUEST,
    sizeId,
    size,
    stock
})