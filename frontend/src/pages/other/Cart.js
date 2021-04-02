import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { useDispatch, useSelector } from 'react-redux'
import {
  decrementQuantity,
  incrementQuantity,
  removeAllItem,
  removeItem,
} from '../../redux/actions/cartActions'
import emptyCart from '../../assets/empty-cart.png'
const Cart = ({ location }) => {
  const { addToast } = useToasts()
  const { pathname } = location
  const dispatch = useDispatch()

  const { cart } = useSelector((state) => state)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { cartItems: cartItemsUser } = useSelector((state) => state.listCart)
  const { cartItems } = cart
  const finalCartItems = userInfo ? cartItemsUser : cartItems
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
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Cart</title>
        <meta
          name="description"
          content="Cart page of flone react minimalist eCommerce template."
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
              <div className="row">
                <div className="col-12">
                  <div
                    className="table-content table-responsive cart-table-content"
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    {finalCartItems && finalCartItems.length > 0 ? (
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
                                  {item.color && item.color !== '' && <span>Color: {item.color}</span>}
                                  {item.size && item.size !== '' && <span>Size: {item.size}</span>}
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
                    ) : (
                      <img src={emptyCart} width="600" alt="" />
                    )}
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
                    <div className="cart-clear" onClick={clearCart}>
                      <button>Clear Shopping Cart</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="cart-tax">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gray">
                        Estimate Shipping And Tax
                      </h4>
                    </div>
                    <div className="tax-wrapper">
                      <p>Enter your destination to get a shipping estimate.</p>
                      <div className="tax-select-wrapper">
                        <div className="tax-select">
                          <label>* Country</label>
                          <select className="email s-email s-wid">
                            <option>Bangladesh</option>
                            <option>Albania</option>
                            <option>Åland Islands</option>
                            <option>Afghanistan</option>
                            <option>Belgium</option>
                          </select>
                        </div>
                        <div className="tax-select">
                          <label>* Region / State</label>
                          <select className="email s-email s-wid">
                            <option>Bangladesh</option>
                            <option>Albania</option>
                            <option>Åland Islands</option>
                            <option>Afghanistan</option>
                            <option>Belgium</option>
                          </select>
                        </div>
                        <div className="tax-select">
                          <label>* Zip/Postal Code</label>
                          <input type="text" />
                        </div>
                        <button className="cart-btn-2" type="submit">
                          Get A Quote
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="discount-code-wrapper">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gray">
                        Use Coupon Code
                      </h4>
                    </div>
                    <div className="discount-code">
                      <p>Enter your coupon code if you have one.</p>
                      <form>
                        <input type="text" required name="name" />
                        <button className="cart-btn-2" type="submit">
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
                      Total products <span>$20</span>
                    </h5>

                    <h4 className="grand-totall-title">
                      Grand Total <span>$20</span>
                    </h4>
                    <Link to={process.env.PUBLIC_URL + '/checkout'}>
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </Fragment>
            <div className="row">
              <div className="col-lg-12">
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon mb-30">
                    <i className="pe-7s-cart"></i>
                  </div>
                  <div className="item-empty-area__text">
                    No items found in cart <br />{' '}
                    <Link to={process.env.PUBLIC_URL + '/shop-grid-standard'}>
                      Shop Now
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

Cart.propTypes = {
  currency: PropTypes.object,
  decrementQty: PropTypes.func,
  location: PropTypes.object,
  removeAllFromCart: PropTypes.func,
  removeFromCart: PropTypes.func,
}

export default Cart
