import * as wishlistConstant from '../constants/wishlistConstant'

export const addWishlistAction = (addToast, slug) => ({
  type: wishlistConstant.ADD_WISHLIST_REQUEST,
  addToast,
  slug,
})

export const removeWishlistItem = (addToast, item) => ({
  type: wishlistConstant.REMOVE_WISHLIST,
  addToast,
  item,
})

export const removeAllWishlistAction = (addToast) => ({
  type: wishlistConstant.REMOVE_WISHLIST_ALL,
  addToast,
})

export const listWishlist = (addToast, item) => ({
  type: wishlistConstant.LIST_WISHLIST_REQUEST,
  item,
  addToast,
})
