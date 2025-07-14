import express from 'express';
import Order from '../models/OrderModel.js';
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const saved = await newOrder.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: 'Order creation failed' });
    }
});

export default router;
