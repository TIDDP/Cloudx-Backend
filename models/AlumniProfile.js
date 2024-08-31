const mongoose = require('mongoose');

const alumniProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    graduationYear: { type: String, required: true },
    currentOccupation: { type: String, required: true },
    company: { type: String, required: true }
});

module.exports = mongoose.model('AlumniProfile', alumniProfileSchema);
