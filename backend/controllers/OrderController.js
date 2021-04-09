import asyncHandler from 'express-async-handler'
import Order from '../models/Order.js'
import slugify from 'slugify'
import Cart from '../models/Cart.js'
import Stripe from 'stripe'
const stripe = new Stripe(`${process.env.SERECT_KEY_STRIPE}`)

export const create = asyncHandler(async (req, res) => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    orderId,
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

    const totalPrice = (itemsPrice + Number(shippingPrice)).toFixed(2)
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
      totalPrice,
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
  const { id, amount, orderId, shippingAddress } = req.body
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
    // const payment = await stripe.customers
    //   .create({
    //     name: shippingAddress.fullname,
    //     phone: shippingAddress.phone,
    //     source: stripeToken,
    //   })
    //   .then((customer) =>
    //     stripe.charges.create({
    //       amount,
    //       currency: 'USD',
    //       customer: customer.id,
    //     }),
    //   )
    //   .catch((err) => console.log(err))
    if (payment) {
      order.isPaid = true
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
