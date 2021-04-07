import * as addressConstant from '../constants/AddressConstant'

export const addressReducer = (
  state = { address: [], addressOne: {} },
  action,
) => {
  let address = action.address
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
      return {
        ...state,
        loading: false,
        address: [...state.address, address],
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
        (addres) => addres.addressId === address.addressId,
      )
      return {
        ...state,
        loading: false,
        addressOne: detail,
      }
    case addressConstant.ADDRESS_LIST_RESET:
      return {
        ...state,
        address: [],
      }
    default:
      return state
  }
}
