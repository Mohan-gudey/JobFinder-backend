const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  urlStatus: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  crawlingStatus: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'failed'],
    default: 'pending'
  },
  lastCrawledAt: {
    type: Date
  },
  notes: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('URL', URLSchema);