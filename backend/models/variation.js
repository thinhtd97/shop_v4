import mongoose from 'mongoose'

const size = mongoose.Schema(
  {
    name: String,
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
)

const variation = mongoose.Schema(
  {
    color: String,
    image: String,
    size: [size],
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const variation = mongoose.model('Variation', subSchema)
export default variation
