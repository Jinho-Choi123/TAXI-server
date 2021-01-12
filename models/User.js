const dotenv = require('dotenv');
dotenv.config({ path: '/home/ubuntu/LSM-server/.env' });
const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema);