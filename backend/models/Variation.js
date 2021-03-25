import mongoose from 'mongoose'

const VariationSchema = mongoose.Schema(
  {
    color: String,
    image: Object,
    size: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Size'
    }],
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
  },
  { timestamps: true },
)

const Variation = mongoose.model('Variation', VariationSchema)
export default Variation
