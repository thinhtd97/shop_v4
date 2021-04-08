import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaTags from 'react-meta-tags'
import { useSelector } from 'react-redux'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'

const Checkout = ({ location }) => {
  const { pathname } = location
  const { userInfo } = useSelector((state) => state.userLogin)
  const { cartItems } = useSelector((state) => state.cart)

  const { cartItems: cartItemsDatabase, shippingAddress } = useSelector(
    (state) => state.listCart,
  )
  const finalCartItems = userInfo ? cartItemsDatabase : cartItems
  const cartTotalPrice = finalCartItems.reduce((acc, item) => {
    if (item.priceDiscount !== 0) {
      return acc + item.priceDiscount * item.qty
    }
    return acc + item.price * item.qty
  }, 0)
  const { coupons } = useSelector((state) => state.coupons)
  const totalDiscountCoupon = coupons
    ? coupons.reduce((acc, item) => {
        return acc + item.discount
      }, 0)
    : 0

  const shippingPrice = cartTotalPrice >= 100 ? 0 : cartTotalPrice * (30 / 100)
  const finalPrice = cartTotalPrice + shippingPrice - totalDiscountCoupon
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Checkout</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {finalCartItems && finalCartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="discount-code-wrapper">
                          <div className="title-wrap">
                            <h4 className="cart-bottom-title section-bg-gray">
                              Select Payment Method
                            </h4>
                          </div>
                          <div className="discount-code">
                            <div className="form-group">
                              <select className="form-control">
                                <option>Paypal</option>
                                <option>Stripe</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-lg-12 col-md-12"
                        style={{ marginTop: '16px' }}
                      >
                        <div className="discount-code-wrapper">
                          <div className="title-wrap">
                            <h4 className="cart-bottom-title section-bg-gray">
                              Order Items
                            </h4>
                          </div>
                          {finalCartItems.map((item, key) => (
                            <div
                              className="row mt-3"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                              key={key}
                            >
                              <div className="col-lg-2">
                                <img
                                  src={item.image}
                                  alt=""
                                  style={{ width: 'inherit' }}
                                />
                              </div>
                              <div
                                className="col-lg-6 col-sm-12"
                                style={{
                                  fontSize: '18px',
                                }}
                              >
                                {item.name}
                              </div>
                              <div className="col-lg-4 col-sm-12">
                                {item.priceDiscount !== 0
                                  ? item.priceDiscount
                                  : item.price}{' '}
                                * {item.qty} = ${' '}
                                {item.priceDiscount !== 0
                                  ? `$${(item.priceDiscount * item.qty).toFixed(
                                      2,
                                    )}`
                                  : `$${(item.price * item.qty).toFixed(2)}`}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="your-order-area">
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul style={{ borderBottom: '1px solid lightgray' }}>
                            <li>
                              <h3>Delivery Address</h3>
                            </li>
                            <li>
                              <Link
                                to="/update-delivery"
                                className="btn btn-outline-secondary btn-sm"
                              >
                                Change
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div
                          className="your-order-bottom"
                          style={{ marginTop: '14px' }}
                        >
                          <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                            {shippingAddress.fullname}
                          </p>
                        </div>
                        <div
                          className="your-order-bottom"
                          style={{ marginTop: '14px' }}
                        >
                          <p>
                            Address: {shippingAddress.address}{' '}
                            {shippingAddress.wards}, {shippingAddress.district},{' '}
                            {shippingAddress.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="your-order-area"
                    style={{ marginTop: '20px' }}
                  >
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Shipping</li>
                            <li>
                              {shippingPrice !== 0
                                ? `$${shippingPrice.toFixed(2)}`
                                : `Free Shipping`}
                            </li>
                          </ul>
                        </div>
                        <hr />
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Provisional</li>
                            <li>${finalPrice.toFixed(2)}</li>
                          </ul>
                        </div>

                        {coupons.length > 0 ? (
                          <Fragment>
                            <hr />
                            <div className="your-order-bottom">
                              <ul>
                                <li>Coupons</li>
                                {coupons.map((coupon, key) => (
                                  <li key={key}>
                                    <span
                                      style={{
                                        margin: '8px',
                                        fontSize: '15px',
                                      }}
                                      className="badge badge-success"
                                    >
                                      {coupon.code}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </Fragment>
                        ) : (
                          ''
                        )}
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>${finalPrice.toFixed(2)}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button className="btn-hover">Place Order</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{' '}
                      <Link to={process.env.PUBLIC_URL + '/shop'}>
                        Shop Now
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

Checkout.propTypes = {
  cartItems: PropTypes.array,
}

export default Checkout
