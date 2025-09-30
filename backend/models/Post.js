const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: String,
    mediaUrl: String,
    caption: String,
    likes: [String],
    comments: [{ userId:String, text:String }]
}, { timestamps:true });

module.exports = mongoose.model('Post', PostSchema);
