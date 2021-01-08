const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: { type: String },
    sender: { type: String },
    timestamp: { type: Date }
})

const chatSchema = new mongoose.Schema({
    roomId: { type: String },
    content: [messageSchema]
})

module.exports = mongoose.model('Chat', chatSchema)