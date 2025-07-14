import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    paymentStatus: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
    paymentMethod: { type: String }, // e.g., 'card', 'UPI', 'netbanking'
    orderId: { type: String },
    paymentId: { type: String },
    razorpaySignature: { type: String },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Payment", PaymentSchema);
