import mongoose from 'mongoose';

const bannerSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required.",
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    image: {
        type: Object,
        required: true
    }
}, { timestamps: true })

const BannerSlider = mongoose.model('Banner', bannerSchema);
export default BannerSlider;