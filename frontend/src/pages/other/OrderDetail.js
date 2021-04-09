import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { useDispatch, useSelector } from 'react-redux'
import {
  detailOrderAction,
  orderPaypalAction,
} from '../../redux/actions/orderAction'

import CheckoutForm from './CheckoutForm'
import { useToasts } from 'react-toast-notifications'
const stripePromise = loadStripe(
  'pk_test_51IcTOcFCGbTef4Xnl90bc1mqeg85QhRRvBRH5Z7Uslmmcw8LuyZ3VBScxtUo3hhMcjoAV8tZQBrV6NEmJAL4qaJn00f6OuLWRC',
)

const OrderDetail = ({ location, history, match }) => {
  const orderId = match.params.orderId
  const { userInfo } = useSelector((state) => state.userLogin)
  const { order } = useSelector((state) => state.orderDetail)
  const { addToast } = useToasts()
  const dispatch = useDispatch()
  const { coupons } = useSelector((state) => state.coupons)
  const [values, setValues] = useState({
    shippingPrice: '',
    itemPrice: '',
    totalPrice: '',
    isPaid: '',
    isDelivery: '',
    orderItems: [],
    shippingAddress: {},
    paymentMethod: '',
  })
  // const orderHandler = (paymentResult) => {
  //   dispatch(orderPaypalAction(paymentResult, addToast, orderId, coupons))
  // }
  useEffect(() => {
    // const addScriptPaypal = async () => {
    //   const { data: clientId } = await axios.get(
    //     `${process.env.REACT_APP_API}/config/paypal`,
    //   )
    //   const script = document.createElement('script')
    //   script.type = 'text/javascript'
    //   script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    //   script.async = true
    //   script.onload = () => {
    //     setSdkReady(true)
    //   }
    //   document.body.appendChild(script)
    // }
    if (!userInfo.role === 'subscriber') {
      history.push('/login-register')
    } else {
      if (!order || !order.paymentMethod || order.orderId !== orderId) {
        dispatch(detailOrderAction(orderId))
      } else {
        setValues({
          shippingAddress: order.shippingAddress,
          itemPrice: Number(order.itemsPrice),
          totalPrice: Number(order.totalPrice),
          isPaid: order.isPaid,
          isDelivery: order.isDelivery,
          orderItems: order.orderItems,
          shippingPrice: order.shippingPrice,
          paymentMethod: order.paymentMethod,
        })
      }
      // addScriptPaypal()
    }
  }, [userInfo, history, order, orderId, dispatch])

  const { pathname } = location
  return (
    <Fragment>
      <MetaTags>
        <title>Shop | Order Detail</title>
        <meta
          name="description"
          content="Cart page of shop react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Order Detail
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        {order ? (
          <div className="cart-main-area pt-30 pb-100">
            <div className="container">
              <span
                className="mb-30"
                style={{ fontSize: '20px', display: 'block' }}
              >
                Order Detail: #{orderId}
              </span>
              <div className="row">
                <div className="col-lg-8 col-md-12">
                  <div className="row mb-20">
                    <div className="col-lg-6 col-md-12">
                      {' '}
                      <div className="grand-totall">
                        <div className="title-wrap">
                          <h4 className="cart-bottom-title section-bg-gary-cart">
                            Payment Method
                          </h4>
                        </div>
                        <br />
                        <span style={{ fontWeight: 'bolder' }}>
                          Payment by {values.paymentMethod}
                        </span>
                        <br />
                        <hr />
                        {values.isPaid ? (
                          <span
                            className="alert alert-success mt-20"
                            style={{ display: 'block', color: 'green' }}
                          >
                            <i className="fa fa-check"></i> Paid
                          </span>
                        ) : (
                          <span style={{ display: 'block', color: 'red' }}>
                            <i className="fa fa-times"></i> Not Paid
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      {' '}
                      <div className="grand-totall">
                        <div className="title-wrap">
                          <h4 className="cart-bottom-title section-bg-gary-cart">
                            Delivery Method
                          </h4>
                        </div>
                        <br />
                        <span style={{ fontWeight: 'bolder' }}>
                          {values.shippingPrice === 0 ? 'Free Shipping' : ''}
                        </span>
                        <br />

                        <span>Delivered on Saturday, March 6</span>
                      </div>
                    </div>
                  </div>
                  <div className="discount-code-wrapper">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gray">
                        Order Items
                      </h4>
                    </div>
                    <div className="discount-code">
                      {values.orderItems.map((item, key) => (
                        <Fragment key={key}>
                          <div
                            className="row"
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <div className="col-sm-3">
                              <img src={item.image} width={80} alt="" />
                            </div>
                            <div className="col-sm-6">
                              ${item.price.toFixed(2)} x {item.qty} = $
                              {(item.price * item.qty).toFixed(2)}
                            </div>
                            <div className="col-sm-3">{item.name}</div>
                            <div
                              className="col-sm-12"
                              style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                              }}
                            >
                              {values.isDelivery ? (
                                <Link
                                  to={`/product/${item.slug}`}
                                  className="btn btn-outline-secondary btn-sm"
                                >
                                  Reviews
                                </Link>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                          <hr />
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="grand-totall">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gary-cart">
                        Shipping
                      </h4>
                    </div>
                    <span
                      className="mt-10"
                      style={{ fontWeight: 'bolder', display: 'block' }}
                    >
                      {values.shippingAddress.fullname}
                    </span>
                    <span>
                      Address: {values.shippingAddress.address},{' '}
                      {values.shippingAddress.wards},{' '}
                      {values.shippingAddress.district},{' '}
                      {values.shippingAddress.city}
                    </span>
                    <br />
                    <span style={{ marginTop: '10px', display: 'block' }}>
                      Phone: {values.shippingAddress.phone}
                    </span>
                  </div>
                  <div className="grand-totall mt-20 mb-20">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gary-cart">
                        Order Summary
                      </h4>
                    </div>
                    <h5>
                      Total products{' '}
                      <span>${Number(values.itemPrice).toFixed(2)}</span>
                    </h5>

                    <h4 className="grand-totall-title">
                      Grand Total
                      <span>${Number(values.totalPrice).toFixed(2)}</span>
                    </h4>

                    {values.isPaid ? (
                      <Fragment></Fragment>
                    ) : (
                      <Fragment>
                        {values.paymentMethod === 'stripe' ? (
                          <Fragment>
                            {userInfo._id === order.user.toString() && (
                              <Elements stripe={stripePromise}>
                                <CheckoutForm
                                  totalPrice={values.totalPrice}
                                  shippingAddress={values.shippingAddress}
                                  orderId={orderId}
                                />
                              </Elements>
                            )}
                          </Fragment>
                        ) : (
                          <Fragment>
                            {userInfo._id === order.user.toString() && (
                              <Fragment>
                                {/* {!sdkReady ? (
                                  <p>Loading...</p>
                                ) : userInfo._id.toString() ===
                                  order.user.toString() ? (
                                  <PayPalButton
                                    amount={order.totalPrice}
                                    onSuccess={orderHandler}
                                  />
                                ) : (
                                  <></>
                                )} */}
                              </Fragment>
                            )}
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </LayoutOne>
    </Fragment>
  )
}

export default OrderDetail
