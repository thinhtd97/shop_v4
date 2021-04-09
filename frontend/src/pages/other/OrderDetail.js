import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MetaTags from 'react-meta-tags'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { detailOrderAction } from '../../redux/actions/orderAction'
import NotFoundCompent from '../../components/NotFoundComponent'
const stripePromise = loadStripe(
  'pk_test_51IcTOcFCGbTef4Xnl90bc1mqeg85QhRRvBRH5Z7Uslmmcw8LuyZ3VBScxtUo3hhMcjoAV8tZQBrV6NEmJAL4qaJn00f6OuLWRC',
)

const CheckoutForm = ({ totalPrice }) => {
  const stripe = useStripe()
  const elements = useElements()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })

    setLoading(true)

    if (!error) {
      // console.log(paymentMethod)
      const { id } = paymentMethod
      try {
        const { data } = await Axios.post(
          'http://localhost:3001/api/checkout',
          {
            id,
            amount: totalPrice, //cents
          },
        )
        console.log(data)

        elements.getElement(CardElement).clear()
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
      setLoading(false)
    }
  }
  return (
    <Fragment>
      <div className="form-group">
        <CardElement />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!stripe}
        className="btn btn-info btn-block"
      >
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          'Buy'
        )}
      </button>
    </Fragment>
  )
}

const OrderDetail = ({ location, history, match }) => {
  const orderId = match.params.orderId
  const { userInfo } = useSelector((state) => state.userLogin)
  const { order } = useSelector((state) => state.orderDetail)
  const dispatch = useDispatch()
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
  useEffect(() => {
    if (!userInfo) {
      history.push('/login-register')
    } else {
      if (!order || !order.paymentMethod || order.orderId !== orderId) {
        dispatch(detailOrderAction(orderId))
      } else {
        setValues({
          shippingAddress: order.shippingAddress,
          itemPrice: Number(order.itemsPrice).toFixed(2),
          totalPrice: Number(order.totalPrice).toFixed(2),
          isPaid: order.isPaid,
          isDelivery: order.isDelivery,
          orderItems: order.orderItems,
          shippingPrice: order.shippingPrice,
          paymentMethod: order.paymentMethod,
        })
      }
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
              <Elements stripe={stripePromise}>
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
                                <img
                                  src={item.image}
                                  width={80}
                                  alt="Image Items"
                                />
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
                                <Link
                                  to={`/product/${item.slug}`}
                                  className="btn btn-outline-secondary btn-sm"
                                >
                                  Reviews
                                </Link>
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
                        Total products <span>${values.itemPrice}</span>
                      </h5>

                      <h4 className="grand-totall-title">
                        Grand Total
                        <span>${values.totalPrice}</span>
                      </h4>

                      <CheckoutForm totalPrice={values.totalPrice} />
                    </div>
                  </div>
                </div>
              </Elements>
            </div>
          </div>
        ) : (
          <NotFoundCompent />
        )}
      </LayoutOne>
    </Fragment>
  )
}

export default OrderDetail
