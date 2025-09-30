const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get all posts
router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

// Add new post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
});

module.exports = router;
