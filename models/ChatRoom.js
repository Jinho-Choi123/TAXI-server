const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomId: { type: String, unique: true, trim: true },
    members: { type: [String] },

})