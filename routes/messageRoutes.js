const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');


const router = express.Router();

// Send a message
router.post('/sendmessage', sendMessage);

// Get messages between two users
router.get('/getmessages/:receiverId', getMessages);

module.exports = router;
