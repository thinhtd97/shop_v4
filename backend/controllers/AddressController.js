import asyncHandler from 'express-async-handler'
import Address from '../models/Address.js'
import User from '../models/user.js'

export const create = asyncHandler(async (req, res) => {
  const {
    fullname,
    district,
    wards,
    city,
    address,
    company,
    phone,
    email,
    active,
    addressId
  } = req.body
  try {
    const user = await User.findById(req.user.id)

    const newAddress = new Address({
      fullname,
      district,
      wards,
      city,
      address,
      addressId,
      company,
      phone,
      email,
      active,
      user: req.user.id,
    })
    const created = await newAddress.save()

    if (created) {
      user.address.push(created._id)
      await user.save()
    }
    res.json(created)
  } catch (error) {
    console.log(error)
    res.status(400)
    throw new Error('Create Address Failed.')
  }
})
export const list = asyncHandler(async (req, res) => {
  try {
    const address = await Address.find({ user: req.user.id })
    if (!address) {
      res.status(404)
      throw new Error('Address Not Found.')
    }
    res.status(200).json(address)
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
})
export const update = asyncHandler(async (req, res) => {
  try {
    const updated = await Address.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    ).exec()
    if (!updated) {
      res.status(400)
      throw new Error('Address Update Failed.')
    }
    res.json(updated)
  } catch (error) {
    res.status(404)
    throw new Error(`${error}`)
  }
})
export const remove = asyncHandler(async (req, res) => {
  try {
    const deleted = await Address.findOneAndDelete({
      addressId: req.params.id,
    })
    res.json(deleted)
  } catch (error) {
    res.status(400)
    throw new Error('Address Delete failed.')
  }
})
export const read = asyncHandler(async (req, res) => {
  let address = await Address.findOne({ _id: req.params.id })
  res.json(address)
})
export const changeActive = asyncHandler(async (req, res) => {
  let address = await Address.find({ user: req.user.id })
  address.forEach((item) => {
    if (item._id === req.params.id) {
      item.active = true
    }
    item.active = false
    item.save()
  })
  res.json(address)
})
