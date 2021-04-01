import mongoose from 'mongoose'

const CartSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: Object },
    price: { type: String },
    description: { type: String },
    color: { type: String },
    stock: { type: Number },
    size: { type: String },
    qty: Number,
    orderdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

const Cart = mongoose.model('Cart', CartSchema)
export default Cart
