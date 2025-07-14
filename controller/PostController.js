import express from 'express';
import Post from '../model/WorkPost.model.js';
import { body, validationResult } from "express-validator";

const router = express.Router();

// ✅ Create Post 
router.post('/CreatePost', [
    body('name').notEmpty().withMessage("Name is required"),
    body('title').notEmpty().withMessage("Title is required"),
    body('location').notEmpty().withMessage("Location is required"),
    body('image').notEmpty().withMessage("Image is required"),
    body('date').notEmpty().withMessage("Date is required"),
    body('clickBy').notEmpty().withMessage("Click By is required"),
    body('description').notEmpty().withMessage("Description is required"),
    body('category').notEmpty().withMessage("Category is required"),
    body('price').notEmpty().withMessage("Price is required"),
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success: false, error: result.array() });
    }

    try {
        const newPost = new Post({
            name: req.body.name,
            title: req.body.title,
            location: req.body.location,
            image: req.body.image,
            date: req.body.date,
            clickBy: req.body.clickBy,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
        });

        await newPost.save();
        res.status(200).json({ success: true, msg: "New Post has been created" });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
});

// ✅ Get All Posts
router.get("/GetAllPost", async (req, res) => {
    try {
        const workPosts = await Post.find();
        res.status(200).json({ success: true, WorkPost: workPosts });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
});

// ✅ Get Post By ID
router.get('/GetById/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const workPost = await Post.findById(postId);
        res.status(200).json({ success: true, post: workPost });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
});

// ✅ Update Post
router.put("/Update/:id", [
    body('name').notEmpty(),
    body('title').notEmpty(),
    body('location').notEmpty(),
    body('image').notEmpty(),
    body('date').notEmpty(),
    body('clickBy').notEmpty(),
    body('description').notEmpty(),
    body('category').notEmpty(),
    body('price').notEmpty()
], async (req, res) => {
    const postId = req.params.id;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success: false, error: result.array() });
    }

    try {
        const updatedData = {
            name: req.body.name,
            title: req.body.title,
            location: req.body.location,
            image: req.body.image,
            date: req.body.date,
            clickBy: req.body.clickBy,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
        };

        const updatedPost = await Post.findByIdAndUpdate(postId, { $set: updatedData }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ success: false, msg: "Post not found" });
        }

        res.status(200).json({ success: true, msg: "Post updated successfully", WorkPost: updatedPost });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
});

// ✅ Delete Post
router.delete("/Delete/:id", async (req, res) => {
    const postId = req.params.id;
    try {
        const deleted = await Post.findByIdAndDelete(postId);
        if (!deleted) {
            return res.status(404).json({ success: false, msg: "Post not found!" });
        }

        return res.status(200).json({ success: true, msg: "Post has been deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ success: false, msg: error.message });
    }
});

export default router;
