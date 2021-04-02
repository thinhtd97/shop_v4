import mongoose from 'mongoose'

const CartSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: String,
    image: { type: Object },
    price: { type: Number },
    priceDiscount: { type: Number },
    color: { type: String },
    size: { type: String },
    qty: Number,
    stock: Number,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

const Cart = mongoose.model('Cart', CartSchema)
export default Cart
