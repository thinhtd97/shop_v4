import React, { Fragment, useState } from 'react'
import Axios from 'axios'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useToasts } from 'react-toast-notifications'
import { useDispatch, useSelector } from 'react-redux'
import * as orderConstant from '../../redux/constants/OrderConstant'
import * as cartConstant from '../../redux/constants/cartConstant'

const CheckoutForm = ({ totalPrice, shippingAddress, orderId }) => {
  const dispatch = useDispatch()
  const stripe = useStripe()
  const elements = useElements()
  const { addToast } = useToasts()

  const { userInfo } = useSelector((state) => state.userLogin)
  const { coupons } = useSelector((state) => state.coupons)

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
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      try {
        const ordered = await Axios.post(
          `${process.env.REACT_APP_API}/order/payments`,
          {
            id,
            amount: totalPrice * 100,
            shippingAddress,
            orderId,
            coupons
          },
          config,
        )
        if (ordered) {
          dispatch({
            type: cartConstant.COUPON_APPLY_RESET,
          })
        }
        const { data } = Axios.get(
          `${process.env.REACT_APP_API}/order/${orderId}`,
          config,
        )
        dispatch({
          type: orderConstant.ORDER_DETAIL_SUCCESS,
          payload: data,
        })

        addToast('Order Success!', { appearance: 'success', autoDismiss: true })

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
export default CheckoutForm
