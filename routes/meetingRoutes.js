const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

// Route to schedule a meeting
router.post('/schedule', meetingController.scheduleMeeting);
