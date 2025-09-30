const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// Multer setup for file uploads
const upload = multer({ dest:'uploads/' });

// Create post
router.post('/', upload.single('media'), async (req,res)=>{
    const { userId, caption } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path, { folder:"rvc_posts" });
    fs.unlinkSync(req.file.path);

    const newPost = new Post({
        userId,
        mediaUrl: result.secure_url,
        caption,
        likes: [],
        comments: []
    });
    await newPost.save();
    res.json(newPost);
});

// Get posts with pagination
router.get('/', async (req,res)=>{
    const { page=1, limit=5 } = req.query;
    const posts = await Post.find()
        .sort({ createdAt:-1 })
        .skip((page-1)*limit)
        .limit(Number(limit));
    res.json(posts);
});

// Like a post
router.post('/:postId/like', async (req,res)=>{
    const { userId } = req.body;
    const post = await Post.findById(req.params.postId);
    if(!post.likes.includes(userId)){
        post.likes.push(userId);
        await post.save();
    }
    res.json(post);
});

// Comment on a post
router.post('/:postId/comment', async (req,res)=>{
    const { userId, text } = req.body;
    const post = await Post.findById(req.params.postId);
    post.comments.push({ userId, text });
    await post.save();
    res.json(post);
});

module.exports = router;
