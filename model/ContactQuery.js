import mongoose from 'mongoose';

const contactQuerySchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
    category: String,
    price: String
}, { timestamps: true });


export default mongoose.model("ContactQuery", contactQuerySchema);
