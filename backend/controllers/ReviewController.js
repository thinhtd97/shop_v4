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
      product.reviews.push(created._id)
      await product.save()
    }
    res.json(review)
  }
})
export const reply = asyncHandle(async (req, res) => {
    const { replyComment } = req.body;
    const review = await Review.findById(req.params.id);
    
})