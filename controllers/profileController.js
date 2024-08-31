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

// Create Alumni Profile
exports.createAlumniProfile = async (req, res) => {
    try {
        const { userId, graduationYear, currentOccupation, company } = req.body;

        const profile = new AlumniProfile({ userId, graduationYear, currentOccupation, company });
        await profile.save();

        res.status(201).json({ message: 'Alumni profile created successfully', profile });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assume userId is available from JWT
        let profile;

        if (req.user.userType === 'student') {
            profile = await StudentProfile.findOne({ userId }).populate('userId');
        } else {
            profile = await AlumniProfile.findOne({ userId }).populate('userId');
        }

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assume userId is available from JWT
        let profile;

        if (req.user.userType === 'student') {
            profile = await StudentProfile.findOneAndUpdate({ userId }, req.body, { new: true });
        } else {
            profile = await AlumniProfile.findOneAndUpdate({ userId }, req.body, { new: true });
        }

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', profile });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete Profile
exports.deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assume userId is available from JWT
        let profile;

        if (req.user.userType === 'student') {
            profile = await StudentProfile.findOneAndDelete({ userId });
        } else {
            profile = await AlumniProfile.findOneAndDelete({ userId });
        }

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};