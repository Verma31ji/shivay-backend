import express from 'express';
import contactQueryModel from '../Models/contactQueryModel.js';




const router = express.Router();

router.post('/contact', async (req, res) => {
    const { name, email, phone, message, category, price } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ success: false, msg: "All fields are required" });
    }

    try {
        await contactQueryModel.create({ name, email, phone, message, category, price });
        res.status(200).json({ success: true, msg: "Query saved" });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
});


router.get("/all", async (req, res) => {
    try {
        const queries = await contactQuery.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, queries });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await contactQuery.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, msg: "Query deleted" });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
});


export default router;
