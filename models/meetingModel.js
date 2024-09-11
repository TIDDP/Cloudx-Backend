const mongoose = require('mongoose');
const { Schema } = mongoose;

const meetingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  participants: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      hasJoined: { type: Boolean, default: false }
    }
  ],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
