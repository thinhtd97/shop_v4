import asyncHandler from 'express-async-handler'
import generateToken from '../middleware/generateToken.js'
import User from '../models/user.js'
import nodemailer from 'nodemailer'
import sendGridTransport from 'nodemailer-sendgrid-transport'
import crypto from 'crypto'
import Product from '../models/product.js'

const transport = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key:
        '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',
    },
  }),
)

export const resetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
    }
    const token = buffer.toString('hex')
    User.findOne({ email }).then((user) => {
      if (!user) {
        res.status(404)
        throw new Error("User don't exists with that email.")
      }
      user.resetToken = token
      user.expireToken = Date.now() + 3600000
      user.save().then((result) => {
        transport.sendMail({
          to: user.email,
          from: 'thinhtd2109@gmail.com',
          subject: 'Password Reset',
          html: `<p>You requested for password reset</p>
                    <h5>Click in this <a href="http://localhost:3000/reset/${token}">Link</a> to reset password</h5>`,
        })
        res.json({
          message: 'Check your email.',
        })
      })
    })
  })
})

export const NewPassword = asyncHandler(async (req, res) => {
  const newPassword = req.body.password
  const sentToken = req.body.token
  User.findOne({
    resetToken: sentToken,
    expireToken: { $gt: Date.now() },
  }).then((user) => {
    if (!user) {
      res.status(404)
      throw new Error('Try again session expired.')
    }
    user.password = newPassword
    user.resetToken = undefined
    user.expireToken = undefined
    user.save().then((saveUser) => {
      res.json({ message: 'Password updated success.' })
    })
  })
})

export const changePassword = asyncHandler(async (req, res) => {
  let { password, oldPassword } = req.body
  const user = await User.findById(req.user.id)
  const passwordUser = await user.matchPassword(oldPassword)
  if (passwordUser) {
    user.password = password
    await user.save()
    res.status(200).json({
      message: 'Change password success.',
    })
  } else {
    res.status(404)
    throw new Error("Old password did't not match")
  }
})

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).populate('wishlist')
  if (
    user &&
    (await user.matchPassword(password)) &&
    user.role === 'subscriber'
  ) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      wishlist: user.wishlist,
      cart: user.cart,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid email or password')
  }
})
export const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password)) && user.role === 'admin') {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      cart: user.cart,
      wishlist: user.wishlist,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid email or password')
  }
})
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate('wishlist')
  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      wishlist: user.wishlist,
      role: user.role,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

export const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    username,
    password,
    address,
    phone,
  } = req.body
  const user = await User.findOne({ email, username }).populate('wishlist')

  if (user) {
    res.status(400)
    throw new Error('Email already exists')
  } else {
    const userCreated = await User.create({
      firstName,
      lastName,
      email,
      password,
      address,
      phone,
    })
    if (userCreated) {
      res.json({
        _id: userCreated._id,
        firstName: userCreated.firstName,
        lastName: userCreated.lastName,
        email: userCreated.email,
        phone: userCreated.phone,
        address: userCreated.address,
        wishlist: userCreated.wishlist,
        role: userCreated.role,
        token: generateToken(userCreated._id),
      })
    } else {
      res.status(400)
      throw new Error('Ivalid data')
    }
  }
})
export const updateProfileUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    user.address = req.body.address || user.address
    user.phone = req.body.phone || user.phone
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      address: updatedUser.address,
      phone: updatedUser.phone,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(400)
    throw new Error('Update failed!')
  }
})

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  if (!users) {
    res.status(404)
    throw new Error('User not found')
  } else {
    res.json(users)
  }
})
export const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})
export const deleteUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: 'Remove Successfully' })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})
export const updateUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.role = req.body.role || user.role

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})
export const addWishlist = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slugProduct })
  const user = await User.findById(req.user.id)
  if (!product) {
    res.status(404)
    throw new Error('Product Not Found')
  }
  user.wishlist.push(product._id)
  await user.save()
  res.json({
    message: 'Add Wishlist Success.',
  })
})
export const removeWishlist = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slugProduct })
    const updated = await User.updateOne(
      { _id: req.user.id },
      { $pull: { wishlist: { $in: `${product._id}` } } },
    )
    if (updated) {
      res.json({
        message: 'Remove wishlist success',
      })
    }
  } catch (error) {
    console.log(error);
    res.status(404)
    throw new Error('Remove wishlist failed.')
  }
})
