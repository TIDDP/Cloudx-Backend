const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

// Route to schedule a meeting
router.post('/schedule', meetingController.scheduleMeeting);
// Route to join a meeting by user ID
router.post('/join', meetingController.joinMeeting);

// Route to get all participants who joined a meeting
router.get('/:meetingId/joined', meetingController.getJoinedParticipants);
