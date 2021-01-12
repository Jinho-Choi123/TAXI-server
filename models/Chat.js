const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: { type: String },
    sender: { type: String },
    timestamp: { type: Date }
})

const chatSchema = new mongoose.Schema({
    roomId: { type: String },
    content: [messageSchema],
    members: { type: [String], required: true }
})

module.exports = mongoose.model('Chat', chatSchema);