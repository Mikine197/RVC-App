const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    userId: String,      // যে user কে notify করতে হবে
    type: String,        // like, comment, follow
    fromUserId: String,  // যিনি action নিলেন
    postId: String,      // optional, post related
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);
