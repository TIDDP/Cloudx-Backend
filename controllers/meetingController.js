const Meeting = require('../models/meetingModel');
const User = require('../models/User');

// Schedule a new meeting
exports.scheduleMeeting = async (req, res) => {
  const { title, description, startTime, endTime, participants, createdBy } = req.body;

  try {
    const users = await User.find({ _id: { $in: participants } });
    if (users.length !== participants.length) {
      return res.status(404).json({ message: 'One or more participants not found' });
    }

    const meeting = new Meeting({
      title,
      description,
      startTime,
      endTime,
      participants: participants.map(userId => ({ user: userId })),
      createdBy
    });

    await meeting.save();
    res.status(201).json({ message: 'Meeting scheduled successfully', meeting });
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling meeting', error });
  }
};