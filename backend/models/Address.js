import mongoose from 'mongoose'

const addressSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true
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
    email: {
      type: String,
      required: true,
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
