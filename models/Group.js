const mongoose = require('mongoose');
const User = require('./User');

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
})


const groupSchema = new mongoose.Schema({
    groupId: { type: String, required: true, unique: true },
    startPoint: { type: pointSchema, required: true },
    endPoint: { type: pointSchema, required: true },
    time: { type: Date, required: true },
    members: [String], // array of userId
    creator: { type: String, required: true }
})

module.exports = mongoose.model('Group', groupSchema)