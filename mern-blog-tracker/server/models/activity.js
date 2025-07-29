const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  bug: { type: mongoose.Schema.Types.ObjectId, ref: 'Bug', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, 
  message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
