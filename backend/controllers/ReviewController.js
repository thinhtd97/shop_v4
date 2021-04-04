import asyncHandle from 'express-async-handler'
import Product from '../models/product.js'
import Review from '../models/Reviews.js'
import User from '../models/user.js'

export const createReview = asyncHandle(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findOne({ slug: req.params.slugProduct })
  const user = await User.findById(req.user.id)
  const alreadyReview = await Review.findOne({
    user: req.user.id,
    product: product._id,
  })
  if (alreadyReview) {
    res.status(400)
    throw new Error('Review already!!')
  } else {
    const review = new Review({
      name: `${user.firstName} ${user.lastName}`,
      rating: Number(rating),
      comment,
      user: req.user.id,
      product: product._id,
    })
    if (review) {
      const created = await review.save()
      const reviews = await Review.find({ product: product._id })
      if (created) {
        product.reviews.push(created._id)
        product.rating = (
          Number(reviews.reduce((acc, i) => acc + i.rating, 0)) / reviews.length
        ).toFixed(2)
        product.numReviews += 1
        console.log(product.rating)
        await product.save()
      }
      res.json(review)
    }
  }
})
export const reply = asyncHandle(async (req, res) => {
  const { replyComment } = req.body
  const product = await Product.findOne({ slug: req.params.slugProduct })
  const user = await User.findById(req.user.id)
  const review = await Review.findOne({
    user: req.params.user,
    product: product._id,
  })
  const reviewContent = {
    name: `${user.firstName} ${user.lastName}`,
    replyComment,
  }
  if (review) {
    review.reply.push(reviewContent)
    await review.save()
  }
  res.json({
    message: 'Reply Success!!!',
  })
})
export const resetReviews = asyncHandle(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slugProduct })
  await Review.deleteMany()
  product.numReviews = 0
  product.reviews = []
  product.rating = 0
  await product.save()
  res.json('OK')
})
