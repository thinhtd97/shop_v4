import mongoose from 'mongoose'

const SizeStockSchema = mongoose.Schema(
  {
    size: { type: String },
    stock: { type: Number },
  },
  {
    timestamps: true,
  },
)

const VariationSchema = mongoose.Schema(
  {
    color: String,
    image: Object,
    size: [SizeStockSchema],
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }
  },
  { timestamps: true },
)

const Variation = mongoose.model('variation', VariationSchema)
export default Variation
