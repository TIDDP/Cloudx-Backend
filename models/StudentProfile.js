const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: String, required: true },
    yearOfStudy: { type: String, required: true }
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
