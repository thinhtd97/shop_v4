import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required.",
        minLength: [3, 'Too short'],
        maxLength: [32, 'Too long']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema);
export default Category;