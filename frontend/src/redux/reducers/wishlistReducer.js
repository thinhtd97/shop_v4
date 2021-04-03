import * as wishlistConstant from '../constants/wishlistConstant'

export const listWishlistReducer = (state = { wishlist: [] }, action) => {
  let item = action.item
  switch (action.type) {
    case wishlistConstant.LIST_WISHLIST_REQUEST:
      return { loading: true }
    case wishlistConstant.LIST_WISHLIST_SUCCESS:
      return { loading: false, wishlist: action.payload }
    case wishlistConstant.LIST_WISHLIST_FAILED:
      return { loading: false, error: action.payload }
    case wishlistConstant.REMOVE_WISHLIST:
      const removeItem = state.wishlist.filter((el) => el._id !== item._id)
      return {
        ...state,
        wishlist: removeItem,
      }
    case wishlistConstant.REMOVE_WISHLIST_ALL:
      return {
        ...state,
        wishlist: [],
      }
    default:
      return state
  }
}
export const addWishlistReducer = (state = {}, action) => {
  switch (action.type) {
    case wishlistConstant.ADD_WISHLIST_REQUEST:
      return { loading: true }
    case wishlistConstant.ADD_WISHLIST_SUCCESS:
      return { loading: false, success: true }
    case wishlistConstant.ADD_WISHLIST_FAILED:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
