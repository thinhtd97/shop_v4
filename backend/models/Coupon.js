import mongoose from 'mongoose'

const couponSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    used: {
        type: Boolean,
        required: true,
        default: false
    }
  },
  { timestamps: true },
)

const Coupon = mongoose.model('Coupon', couponSchema)
export default Coupon
