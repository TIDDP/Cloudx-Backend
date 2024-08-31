const mongoose = require('mongoose');

const grantSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Grant', grantSchema);
