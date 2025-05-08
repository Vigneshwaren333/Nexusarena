const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tournament title is required'],
    trim: true
  },
  game: {
    type: String,
    required: [true, 'Game is required'],
    trim: true
  },
  prize: {
    type: String,
    default: 'TBD'
  },
  entryFee: {
    type: String,
    default: 'Free'
  },
  date: {
    type: Date,
    required: [true, 'Tournament date is required']
  },
  startTime: {
    type: String
  },
  endTime: {
    type: String
  },
  registrationDeadline: {
    type: Date
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  registrationStatus: {
    type: String,
    enum: ['Open', 'Closed', 'Invitation'],
    default: 'Open'
  },
  maxParticipants: {
    type: Number,
    required: [true, 'Maximum participants is required'],
    min: 2
  },
  participants: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    required: [true, 'Tournament description is required']
  },
  rules: {
    type: String
  },
  imageUrl: {
    type: String,
    default: 'https://picsum.photos/800/450?random=99'
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tournament', TournamentSchema); 