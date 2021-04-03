import mongoose from 'mongoose'

const reply = mongoose.Schema(
  {
    name: { type: String, required: true },
    replyComment: { type: String },
  },
  {
    timestamps: true,
  },
)

const reviewsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    reply: [reply],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
  },
  {
    timestamps: true,
  },
)

const Review = mongoose.model('Review', reviewsSchema)
export default Review
