const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type:String, unique:true },
    password: String,
    profilePic: String,
    followers: [String],
    following: [String]
});

module.exports = mongoose.model('User', UserSchema);
