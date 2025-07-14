import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Date, required: true },
    clickBy: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String, enum: ['Pre-Wedding', 'Wedding', 'Song', 'Event', 'Baby Shoot', 'Portfolio'], required: true
    },
    price: { type: Number, required: true }


}, { timestamps: true })

const Post = mongoose.model("Post", PostSchema)

export default Post
