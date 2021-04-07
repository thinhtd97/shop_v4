import * as addressConstant from '../constants/AddressConstant'

export const addressReducer = (
  state = { address: [], addressOne: {} },
  action,
) => {
  let address = action.address
  let addressId = action.addressId
  switch (action.type) {
    case addressConstant.ADDRESS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case addressConstant.ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        address: action.payload,
      }
    case addressConstant.ADDRESS_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case addressConstant.ADD_ADDRESS:
      let updateActive = []
      if (address.active === true) {
        updateActive = state.address.forEach((addres) => {
          if (address.addressId === addres.addressId) {
            addres.active = true
          }
          addres.active = false
        })
      }
      updateActive = address
      return {
        ...state,
        loading: false,
        address: [updateActive, ...state.address],
      }

    case addressConstant.REMOVE_ADDRESS:
      let removeAddress = state.address.filter(
        (addres) => addres.addressId !== address.addressId,
      )
      return {
        ...state,
        loading: false,
        address: removeAddress,
      }
    case addressConstant.DETAIL_ADDRESS:
      let detail = state.address.find(
        (addres) => addres.addressId === addressId,
      )
      return {
        ...state,
        loading: false,
        addressOne: detail,
      }
    case addressConstant.ADDRESS_LIST_RESET:
      return {
        ...state,
        addressOne: {},
        address: [],
      }
    default:
      return state
  }
}
