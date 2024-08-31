const express = require('express');
const { createStudentProfile, createAlumniProfile, getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');

const router = express.Router();

// Routes
router.post('/students/profile', createStudentProfile);
router.post('/alumni/profile', createAlumniProfile);
router.get('/getprofile', getProfile);
router.put('/updateprofile', updateProfile);
router.delete('/deleteprofile', deleteProfile);

module.exports = router;
