import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { connect } from 'react-redux'
import { getDiscountPrice } from '../../helpers/product'

import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'

const Wishlist = ({
  location,
  cartItems,
  currency,
  // wishlistItems,
  // removeFromWishlist,
  // removeAllFromWishlist
}) => {
  const { addToast } = useToasts()
  const { pathname } = location

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
            <Fragment>
              <h3 className="cart-page-title">Your wishlist items</h3>
              <div className="row">
                <div className="col-12">
                  <div className="table-content table-responsive cart-table-content">
                    <table>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Unit Price</th>
                          <th>Add To Cart</th>
                          <th>action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="product-thumbnail">
                            <Link to={process.env.PUBLIC_URL + '/product/'}>
                              <img
                                className="img-fluid"
                                src="https://res.cloudinary.com/ducthinh2109/image/upload/v1616726836/cjjbymkqdroeo37xv4lc.jpg"
                                alt=""
                              />
                            </Link>
                          </td>

                          <td className="product-name text-center">
                            <Link to="#">Dummy TExt</Link>
                          </td>

                          <td className="product-price-cart">
                            <Fragment>
                              <span className="amount old">$10</span>
                              <span className="amount">$10</span>
                            </Fragment>
                          </td>

                          <td className="product-wishlist-cart">
                            {/* <Link to={`${process.env.PUBLIC_URL}/product/`}>
                              Select option
                            </Link> */}
                            <button title="Add to cart">Add to cart</button>
                            {/* <button disabled className="active">
                              Out of stock
                            </button> */}
                          </td>

                          <td className="product-remove">
                            <button>
                              <i className="fa fa-times"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="cart-shiping-update-wrapper">
                    <div className="cart-shiping-update">
                      <Link to={process.env.PUBLIC_URL + '/shop-grid-standard'}>
                        Continue Shopping
                      </Link>
                    </div>
                    <div className="cart-clear">
                      <button>Clear Wishlist</button>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
            <div className="row">
              <div className="col-lg-12">
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon mb-30">
                    <i className="pe-7s-like"></i>
                  </div>
                  <div className="item-empty-area__text">
                    No items found in wishlist <br />{' '}
                    <Link to={process.env.PUBLIC_URL + '/shop-grid-standard'}>
                      Add Items
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
