import asyncHandler from 'express-async-handler'
import Coupon from '../models/Coupon.js'

export const createCoupon = asyncHandler(async (req, res) => {
  const { code, discount } = req.body
  try {
    const newCoupon = new Coupon({
      code,
      discount: Number(discount),
    })
    const created = await newCoupon.save()
    if (!created) {
      res.status(400)
      throw new Error('Create Coupon Failed.')
    }
    res.json(created)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Create Coupon Failed.')
  }
})
export const applyCoupon = asyncHandler(async (req, res) => {
  const { code } = req.body
  const coupon = await Coupon.findOne({ code, used: false })
  try {
    if (!coupon) {
      res.status(401)
      throw new Error('Invalid Coupon Code.')
    }
    res.json(coupon)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Invalid Coupon Code.')
  }
})
export const removeCouponUsed = asyncHandler(async (req, res) => {
  try {
    const deleted = await Coupon.deleteMany({ used: true })
    res.json(deleted)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Remove Coupon Failed.')
  }
})
export const listCoupon = asyncHandler(async (req, res) => {
  try {
    const list = await Coupon.find({});
    res.json(list)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Coupon Not Found.')
  }
})
