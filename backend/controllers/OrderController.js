import asyncHandler from 'express-async-handler'
import Order from '../models/Order.js'
import Cart from '../models/Cart.js'

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
        district: shippingAddress.district,
        wards: shippingAddress.wards,
        address: shippingAddress.address,
        phone: shippingAddress.phone,
      },
      paymentMethod: paymentMethod,
      shippingPrice: shippingPrice.toFixed(2),
      itemsPrice: itemsPrice.toFixed(2),
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
