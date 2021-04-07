import mongoose from 'mongoose'

const addressSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    addressId: {
      type: String,
    },
    wards: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      maxLength: 10,
    },
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
)

const Address = mongoose.model('Address', addressSchema)
export default Address
