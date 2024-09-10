const mongoose = require('mongoose');
const encryptionServices = require('../services/encryptionServices');

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
        set: value => encryptionServices.encryptMessage(value), // Encrypt message before saving
        get: value => encryptionServices.decryptMessage(value)  // Decrypt message when retrieving
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
