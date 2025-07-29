const Activity = require('../models/activity');

// GET /api/activities/bug/:bugId
exports.getActivitiesForBug = async (req, res) => {
  try {
    const activities = await Activity.find({ bug: req.params.bugId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/activities
exports.addActivity = async (req, res) => {
  const { bug, action, message } = req.body;

  if (!bug || !action || !message) {
    return res.status(400).json({ message: 'Bug, action, and message are required.' });
  }

  try {
    const activity = new Activity({
      bug,
      user: req.user._id,
      action,
      message,
    });

    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/activities/:id
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    await Activity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Activity removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
