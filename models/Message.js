const mongoose = require('mongoose');
const encryptionService = require('../services/encryptionService');

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true,
        set: value => encryptionService.encryptMessage(value), // Encrypt message before saving
        get: value => encryptionService.decryptMessage(value)  // Decrypt message when retrieving
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { getters: true }, // Ensure getters are used when converting to JSON
    toObject: { getters: true }
});

module.exports = mongoose.model('Message', messageSchema);
