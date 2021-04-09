import asyncHandler from 'express-async-handler'
import Order from '../models/Order.js'
import slugify from 'slugify'
import Cart from '../models/Cart.js'
import Coupon from '../models/Coupon.js'
import Stripe from 'stripe'

const stripe = new Stripe(`${process.env.SERECT_KEY_STRIPE}`)

export const create = asyncHandler(async (req, res) => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    orderId,
    finalPrice,
  } = req.body
  try {
    const orderItems = cartItems.map((item) => {
      return {
        name: item.name,
        slug: slugify(item.name).toLowerCase(),
        qty: item.qty,
        image: item.image,
        size: item.size,
        color: item.color,
        price: item.priceDiscount !== 0 ? item.priceDiscount : item.price,
        product: item.product,
      }
    })

    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + Number(item.price),
      0,
    )

    const newOrder = new Order({
      orderItems,
      shippingAddress: {
        fullname: shippingAddress.fullname,
        district: shippingAddress.district,
        wards: shippingAddress.wards,
        city: shippingAddress.city,
        address: shippingAddress.address,
        phone: shippingAddress.phone,
      },
      paymentMethod: paymentMethod,
      shippingPrice,
      itemsPrice,
      totalPrice: finalPrice.toFixed(2),
      orderId,
      user: req.user.id,
    })

    const created = await newOrder.save()
    if (created) {
      await Cart.deleteMany({ orderedBy: req.user.id })
    }
    res.status(200).json(created)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error(error)
  }
})
export const read = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id })
    if (!order) {
      res.status(404)
      throw new Error('Order Not Found')
    }
    res.status(200).json(order)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error(error)
  }
})
export const payments = asyncHandler(async (req, res) => {
  const { id, amount, orderId, shippingAddress, coupons } = req.body
  try {
    const order = await Order.findOne({ orderId })
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: `#${orderId}`,
      payment_method: id,
      confirm: true,
      shipping: {
        address: {
          city: shippingAddress.city,
          line1: `${shippingAddress.address} ${shippingAddress.wards}`,
          state: shippingAddress.district,
        },
        name: shippingAddress.fullname,
        phone: shippingAddress.phone,
      },
    })
    if (payment) {
      coupons?.forEach(async (item) => {
        await Coupon.updateOne({ _id: item._id }, { $set: { used: true } })
      })
      order.isPaid = true
      order.status = 'Succeed'
      await order.save()
    }
    console.log(payment)
    res.json(payment)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error(error)
  }
})
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { paymentResult, orderId, coupons } = req.body
  try {
    const order = await Order.findOne({ orderId })

    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: paymentResult.id,
        status: paymentResult.status,
        update_time: paymentResult.update_time,
        email_address: paymentResult.payer.email_address,
      }
      coupons?.forEach(async (item) => {
        await Coupon.updateOne({ _id: item._id }, { $set: { used: true } })
      })
      order.status = 'Succeed'
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order Not found')
    }
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Order Failed!!')
  }
})
export const list = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user.id }).limit(10)
  res.json(order)
})
