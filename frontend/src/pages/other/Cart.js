import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import {
  applyCouponAction,
  decrementQuantity,
  incrementQuantity,
  removeAllItem,
  removeItem,
  addShippingAddressAction,
} from '../../redux/actions/cartActions'

const Cart = ({ location }) => {
  const { addToast } = useToasts()
  const { pathname } = location
  const dispatch = useDispatch()

  const [code, setCode] = useState()
  const { cart } = useSelector((state) => state)
  const { address } = useSelector((state) => state.listAddress)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { cartItems: cartItemsUser } = useSelector((state) => state.listCart)
  const { coupons } = useSelector((state) => state.coupons)
  const { cartItems } = cart
  const finalCartItems = userInfo ? cartItemsUser : cartItems
  const totalPrice = finalCartItems.reduce((acc, item) => {
    if (item.priceDiscount !== 0) {
      return acc + item.priceDiscount * item.qty
    }
    return acc + item.price * item.qty
  }, 0)
  const totalDiscountCoupon = coupons
    ? coupons.reduce((acc, item) => {
        return acc + item.discount
      }, 0)
    : 0

  const finalPrice = totalPrice - totalDiscountCoupon

  const totalProducts = finalCartItems.reduce((acc, item) => {
    return acc + item.qty
  }, 0)
  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item))
  }
  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item))
  }
  const removeCartItem = (item, addToast) => {
    dispatch(removeItem(item, addToast))
  }
  const clearCart = () => {
    dispatch(removeAllItem())
  }
  const applyCouponHandle = (e, code, addToast) => {
    e.preventDefault()
    dispatch(applyCouponAction(code, addToast))
  }

  const shippingAddress = address
    ? address.filter((addres) => addres.active === true)[0]
    : null
  useEffect(() => {
    dispatch(addShippingAddressAction(shippingAddress))
  }, [dispatch, shippingAddress])
  return (
    <Fragment>
      <MetaTags>
        <title>Shop | Cart</title>
        <meta
          name="description"
          content="Cart page of shop react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Cart
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            <Fragment>
              <h3 className="cart-page-title">Your cart items</h3>
              {finalCartItems && finalCartItems.length > 0 ? (
                <div className="row">
                  <div className="col-12">
                    <div
                      className="table-content table-responsive cart-table-content"
                      style={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {finalCartItems.map((item, index) => (
                            <tr key={index}>
                              <td className="product-thumbnail">
                                <Link
                                  to={
                                    process.env.PUBLIC_URL +
                                    '/product/' +
                                    item.slug
                                  }
                                >
                                  <img
                                    src={item.image}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </Link>
                              </td>

                              <td className="product-name">
                                <Link
                                  to={
                                    process.env.PUBLIC_URL +
                                    '/product/' +
                                    item.slug
                                  }
                                >
                                  {item.name}
                                </Link>

                                <div className="cart-item-variation">
                                  {item.color && item.color !== '' && (
                                    <span>Color: {item.color}</span>
                                  )}
                                  {item.size && item.size !== '' && (
                                    <span>Size: {item.size}</span>
                                  )}
                                </div>
                              </td>

                              <td className="product-price-cart">
                                {item.priceDiscount !== 0 ? (
                                  <Fragment>
                                    <span className="amount old">
                                      ${item.price.toFixed(2)}
                                    </span>
                                    <span className="amount">
                                      ${item.priceDiscount.toFixed(2)}
                                    </span>
                                  </Fragment>
                                ) : (
                                  <span className="amount">
                                    ${item.price.toFixed(2)}
                                  </span>
                                )}
                              </td>

                              <td className="product-quantity">
                                <div className="cart-plus-minus">
                                  <button
                                    className="dec qtybutton"
                                    disabled={item.qty === 1}
                                    onClick={(e) => handleDecrement(item)}
                                  >
                                    -
                                  </button>
                                  <input
                                    className="cart-plus-minus-box"
                                    value={item.qty}
                                    readOnly
                                  />
                                  <button
                                    className="inc qtybutton"
                                    disabled={item.qty === item.stock}
                                    onClick={(e) => handleIncrement(item)}
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="product-subtotal">
                                {item.priceDiscount
                                  ? `$${(item.priceDiscount * item.qty).toFixed(
                                      2,
                                    )}`
                                  : `$${(item.price * item.qty).toFixed(2)}`}
                              </td>

                              <td className="product-remove">
                                {userInfo ? (
                                  <button
                                    onClick={(e) =>
                                      removeCartItem(item, addToast)
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                ) : (
                                  <button
                                    onClick={(e) =>
                                      removeCartItem(item, addToast)
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="item-empty-area text-center">
                      <div className="item-empty-area__icon mb-30">
                        <i className="pe-7s-cart"></i>
                      </div>
                      <div className="item-empty-area__text">
                        No items found in cart <br />{' '}
                        <Link to={process.env.PUBLIC_URL + '/shop'}>
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-lg-12">
                  <div className="cart-shiping-update-wrapper">
                    <div className="cart-shiping-update">
                      <Link to={process.env.PUBLIC_URL + '/shop'}>
                        Continue Shopping
                      </Link>
                    </div>
                    <div className="cart-clear" onClick={clearCart}>
                      <button>Clear Shopping Cart</button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="row"
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                {userInfo && (
                  <div className="col-lg-4 col-md-8">
                    <div className="discount-code-wrapper">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Delivery Address
                        </h4>
                      </div>
                      <div className="discount-code">
                        <div className="form-group">
                          <Link to="/update-delivery" className="btn btn-dark">
                            Change
                          </Link>
                          <div style={{ marginTop: '16px' }}>
                            {shippingAddress ? (
                              <ul>
                                <li style={{ marginBottom: '10px' }}>
                                  {shippingAddress.fullname} |{' '}
                                  {shippingAddress.phone}
                                </li>
                                <li>
                                  Address: {shippingAddress.wards},{' '}
                                  {shippingAddress.district},{' '}
                                  {shippingAddress.city}
                                </li>
                              </ul>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={`${
                    userInfo ? 'col-lg-4 col-md-8' : 'col-lg-8 col-md-12'
                  }`}
                >
                  <div className="discount-code-wrapper">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gray">
                        Use Coupon Code
                      </h4>
                    </div>
                    <div className="discount-code">
                      <p>Enter your coupon code if you have one.</p>
                      <form>
                        <input
                          onChange={(e) => setCode(e.target.value)}
                          type="text"
                          required
                          name="code"
                        />
                        <button
                          onClick={(e) => applyCouponHandle(e, code, addToast)}
                          className="cart-btn-2"
                          type="submit"
                        >
                          Apply Coupon
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-12">
                  <div className="grand-totall">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gary-cart">
                        Cart Total
                      </h4>
                    </div>
                    <h5>
                      Total products <span>{totalProducts}</span>
                    </h5>
                    <ul style={{ display: 'flex', marginBottom: '20px' }}>
                      {coupons.map((coupon, key) => (
                        <li key={key}>
                          <span
                            style={{ margin: '8px', fontSize: '15px' }}
                            className="badge badge-success"
                          >
                            {coupon.code}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <h4 className="grand-totall-title">
                      Grand Total
                      <span>${finalPrice.toFixed(2)}</span>
                    </h4>
                    {userInfo ? (
                      <Link
                        to={shippingAddress ? '/checkout' : '/update-delivery'}
                      >
                        Proceed to Checkout
                      </Link>
                    ) : (
                      <Link
                        to={
                          process.env.PUBLIC_URL +
                          '/login-register?redirect=checkout'
                        }
                      >
                        Proceed to Checkout
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Fragment>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  )
}

Cart.propTypes = {
  currency: PropTypes.object,
  location: PropTypes.object,
  removeAllItem: PropTypes.func,
  removeItem: PropTypes.func,
}

export default Cart
