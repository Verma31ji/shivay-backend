import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shootId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    shootTitle: String,
    shootImage: String,
    shootCategory: String,
    shootDate: Date,
    note: String,
    paymentStatus: { type: String, default: 'pending' },

}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);
