import PropTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { useDispatch, useSelector } from 'react-redux'
import { getDiscountPrice } from '../../helpers/product'

import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import {
  removeAllWishlistAction,
  removeWishlistItem,
} from '../../redux/actions/wishlistActions'

const Wishlist = ({
  location,
  currency,
  // wishlistItems,
  // removeFromWishlist,
  // removeAllFromWishlist
}) => {
  const history = useHistory()
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const { pathname } = location
  const { userInfo } = useSelector((state) => state.userLogin)
  const { wishlist } = useSelector((state) => state.wishListData)
  const { cartItems } = useSelector((state) => state.cart)
  const { cartItems: cartItemsDatabase } = useSelector(
    (state) => state.listCart,
  )
  const finalCartItems = userInfo ? cartItemsDatabase : cartItems
  const remove = (addToast, item) => {
    dispatch(removeWishlistItem(addToast, item))
  }
  const removeWishListAll = (addToast) => {
    dispatch(removeAllWishlistAction(addToast))
  }
  useEffect(() => {
    if (!userInfo) {
      history.push('/login-register')
    }
  }, [userInfo, history])
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Wishlist</title>
        <meta
          name="description"
          content="Wishlist page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Wishlist
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {wishlist && wishlist.length > 0 ? (
              <Fragment>
                <h3 className="cart-page-title">Your wishlist items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Unit Price</th>
                            <th>Add To Cart</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishlist &&
                            wishlist.map((item, key) => {
                              const discountedPrice =
                                item.discount !== 0 &&
                                getDiscountPrice(item.price, item.discount)
                              const cartItem = finalCartItems.filter(
                                (el) => el.product === item._id,
                              )[0]
                              return (
                                <tr key={key}>
                                  <td className="product-thumbnail">
                                    <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        '/product/' +
                                        item.slug
                                      }
                                    >
                                      <img
                                        className="img-fluid"
                                        src={item.image[0].url}
                                        alt=""
                                      />
                                    </Link>
                                  </td>

                                  <td className="product-name text-center">
                                    <Link
                                      to={`${process.env.PUBLIC_URL}/product/${item.slug}`}
                                    >
                                      {item.name}
                                    </Link>
                                  </td>

                                  <td className="product-price-cart">
                                    {item.discount !== 0 ? (
                                      <Fragment>
                                        <span className="amount old">
                                          ${item.price.toFixed(2)}
                                        </span>
                                        <span className="amount">
                                          ${discountedPrice.toFixed(2)}
                                        </span>
                                      </Fragment>
                                    ) : (
                                      <span className="amount">
                                        ${item.price.toFixed(2)}
                                      </span>
                                    )}
                                  </td>

                                  <td className="product-wishlist-cart">
                                    {item.variation &&
                                    item.variation.length > 0 ? (
                                      <Link
                                        to={`${process.env.PUBLIC_URL}/product/${item.slug}`}
                                      >
                                        Select option
                                      </Link>
                                    ) : (
                                      <Fragment>
                                        {cartItem ? (
                                          <button disabled>
                                            Added To Cart
                                          </button>
                                        ) : (
                                          <button title="Add to cart">
                                            Add to cart
                                          </button>
                                        )}
                                      </Fragment>
                                    )}

                                    {/* <button disabled className="active">
                       Out of stock
                     </button> */}
                                  </td>

                                  <td className="product-remove">
                                    <button
                                      onClick={() => remove(addToast, item)}
                                    >
                                      <i className="fa fa-times"></i>
                                    </button>
                                  </td>
                                </tr>
                              )
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={process.env.PUBLIC_URL + '/shop'}>
                          Continue Shopping
                        </Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => removeWishListAll(addToast)}>
                          Clear Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-like"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in wishlist <br />{' '}
                      <Link to={process.env.PUBLIC_URL + '/shop'}>
                        Add Items
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  )
}

Wishlist.propTypes = {
  currency: PropTypes.object,
  location: PropTypes.object,
}

export default Wishlist
