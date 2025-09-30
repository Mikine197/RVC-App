const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Like a post
router.post('/:postId/like', async (req, res) => {
    const { userId } = req.body;
    const post = await Post.findById(req.params.postId);
    if(!post.likes.includes(userId)) {
        post.likes.push(userId);
        await post.save();
    }
    res.json(post);
});

// Comment on a post
router.post('/:postId/comment', async (req, res) => {
    const { userId, text } = req.body;
    const post = await Post.findById(req.params.postId);
    post.comments.push({ userId, text });
    await post.save();
    res.json(post);
});

module.exports = router;
