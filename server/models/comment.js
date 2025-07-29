const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  bug: { type: mongoose.Schema.Types.ObjectId, ref: 'Bug', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
