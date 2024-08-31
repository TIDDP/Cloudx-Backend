const StudentProfile = require('../models/StudentProfile');
const AlumniProfile = require('../models/AlumniProfile');
const User = require('../models/User');

// Create Student Profile
exports.createStudentProfile = async (req, res) => {
    try {
        const { userId, course, yearOfStudy } = req.body;

        const profile = new StudentProfile({ userId, course, yearOfStudy });
        await profile.save();

        res.status(201).json({ message: 'Student profile created successfully', profile });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

