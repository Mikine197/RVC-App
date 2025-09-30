const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Cloudinary config
cloudinary.config({
    cloud_name: 'YOUR_CLOUD_NAME',
    api_key: 'YOUR_API_KEY',
    api_secret: 'YOUR_API_SECRET'
});

// Multer setup
const upload = multer({ dest: 'uploads/' });

// Create post
router.post('/', upload.single('media'), async (req, res) => {
    const { userId, caption } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "rvc_posts"
    });
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

module.exports = router;
