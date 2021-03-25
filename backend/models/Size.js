import mongoose from 'mongoose';

const sizeSchema = mongoose.Schema({
    size: {
        type: String,
        required: true,
        default: "S"
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    variation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variation'
    }
}, { timestamps: true })

const Size = mongoose.model('Size', sizeSchema);
export default Size;