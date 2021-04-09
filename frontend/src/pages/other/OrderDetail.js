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
import { useSelector } from 'react-redux'
const stripePromise = loadStripe(
  'pk_test_51IcTOcFCGbTef4Xnl90bc1mqeg85QhRRvBRH5Z7Uslmmcw8LuyZ3VBScxtUo3hhMcjoAV8tZQBrV6NEmJAL4qaJn00f6OuLWRC',
)

const CheckoutForm = () => {
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
            amount: 10000, //cents
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

const OrderDetail = ({ location, history }) => {
  const { userInfo } = useSelector((state) => state.userLogin)
  useEffect(() => {
    if (!userInfo) {
      history.push('/login-register')
    }
  }, [userInfo, history])

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
        <div className="cart-main-area pt-30 pb-100">
          <div className="container">
            <Elements stripe={stripePromise}>
              <div
                className="row"
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <div className="col-lg-8 col-md-12">
                  <div className="discount-code-wrapper">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gray">
                        Order Items
                      </h4>
                    </div>
                    <div className="discount-code">
                      <div className="row">
                        <div className="col-sm-3">Hihi</div>
                        <div className="col-sm-6">Hihi</div>
                        <div className="col-sm-3">Hihi</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="grand-totall">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gary-cart">
                        Order Summary
                      </h4>
                    </div>
                    <h5>
                      Total products <span>$0</span>
                    </h5>

                    <h4 className="grand-totall-title">
                      Grand Total
                      <span>$0</span>
                    </h4>

                    <CheckoutForm />
                  </div>
                </div>
              </div>
            </Elements>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  )
}



export default OrderDetail
