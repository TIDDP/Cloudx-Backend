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

// Join a meeting
exports.joinMeeting = async (req, res) => {
  const { meetingId, userId } = req.body;

  try {
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    const participant = meeting.participants.find(p => p.user.toString() === userId);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    if (participant.hasJoined) {
      return res.status(400).json({ message: 'Participant has already joined the meeting' });
    }

    participant.hasJoined = true;
    await meeting.save();

    res.status(200).json({ message: 'User joined the meeting', meeting });
  } catch (error) {
    res.status(500).json({ message: 'Error joining meeting', error });
  }
};