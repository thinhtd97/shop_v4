import mongoose from 'mongoose';

const reviewsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

const variation = mongoose.Schema(
  {
    color: String,
    image: String,
    size: String,
    stock: Number,
  },
  {
    timestamps: true,
  },
)

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required.',
      maxLength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    variation: [variation],
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    new: {
      type: Boolean,
      default: true,
    },
    saleCount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
      maxLength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 32,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    subs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sub',
      },
    ],
    sold: {
      type: Number,
      default: 0,
    },
    image: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ['Yes', 'No'],
    },
    color: {
      type: String,
      enum: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    },
    brand: {
      type: String,
      enum: ['Apple', 'Samsung', 'Microsoft', 'DELL', 'ASUS'],
    },
    reviews: [reviewsSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: [
      {
        star: Number,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  { timestamps: true },
)

const Product = mongoose.model('Product', productSchema)
export default Product
