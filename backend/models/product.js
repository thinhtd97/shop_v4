import mongoose from 'mongoose'



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
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    newLaunced: {
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
    variation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variation',
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
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
      type: Boolean,
      default: false,
    },
    brand: {
      type: String,
      enum: ['Gucci', 'Louis Vuitton', 'Chanel', 'Dior', 'Armani', 'Tiffany'],
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
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
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    userAddedToCart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true },
)

const Product = mongoose.model('Product', productSchema)
export default Product
