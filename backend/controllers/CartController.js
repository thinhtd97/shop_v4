import Cart from '../models/Cart.js'
import Address from '../models/Address.js'
import asyncHandler from 'express-async-handler'
import slugify from 'slugify'

export const addToCart = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    size,
    price,
    qty,
    color,
    product,
    priceDiscount,
    stock,
  } = req.body
  const cartExist = await Cart.findOne({
    slug: req.params.slug,
    orderedBy: req.user.id,
  })
  if (cartExist) {
    await cartExist.remove()
  }
  const newCart = new Cart({
    name,
    slug: slugify(name).toLowerCase(),
    image,
    size,
    price: Number(price),
    priceDiscount,
    qty: Number(qty),
    color,
    stock: Number(stock),
    product,
    orderedBy: req.user.id,
  })
  await newCart.save()
  res.json(newCart)
})

export const listCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.find({ orderedBy: req.user.id }).populate(
      'shippingAddress',
    )
    if (cart) {
      res.json(cart)
    } else {
      res.status(404)
      throw new Error('Cart Not Found')
    }
  } catch (error) {
    res.status(400)
    throw new Error('Error: ' + error)
  }
})

export const updateQuantity = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    slug: req.params.slug,
    orderedBy: req.user.id,
  })
  if (cart) {
    cart.qty = req.params.qty
    await cart.save()
  }
  res.json(cart)
})

export const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    slug: req.params.slug,
    orderedBy: req.user.id,
  })
  if (cart) {
    await cart.remove()
  }
  res.json(cart)
})
export const removeAllCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.deleteMany({ orderedBy: req.user.id })
  if (cart) {
    res.json({
      message: 'Delete All Cart Success.',
    })
  }
  res.send('ok')
})
