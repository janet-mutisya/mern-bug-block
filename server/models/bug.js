const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['open', 'in progress', 'resolved'], default: 'open' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: String, required:true },
}, { timestamps: true });

module.exports = mongoose.model('Bug', bugSchema);
