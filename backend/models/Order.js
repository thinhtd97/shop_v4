import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, require: true },
        slug: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      fullname: { type: String, required: true },
      district: { type: String, required: true },
      wards: { type: String, required: true },
      city: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: String, required: true },
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivery: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveryAt: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: '365d' },
    },
  },
  { timestamps: true },
)

const Order = mongoose.model('Order', orderSchema)

export default Order
