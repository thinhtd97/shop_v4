import * as addressConstant from '../constants/AddressConstant'

export const addAddressAction = (address, addToast) => ({
  type: addressConstant.ADD_ADDRESS,
  address,
  addToast,
})
export const removeAddressAction = (address, addToast) => ({
  type: addressConstant.REMOVE_ADDRESS,
  address,
  addToast,
})

export const listAddressAction = () => ({
  type: addressConstant.ADDRESS_LIST_REQUEST,
})
export const detailAddressAction = (addressId) => ({
  type: addressConstant.DETAIL_ADDRESS,
  addressId,
})
export const updateAddressAction = (address) => ({
  type: addressConstant.UPDATE_ADDRESS,
  address,
})
