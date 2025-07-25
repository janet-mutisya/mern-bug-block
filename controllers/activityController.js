const Activity = require('../models/activity');

// @desc Get activities for a specific bug
// @route GET /api/activities/bug/:bugId
// @access Private
exports.getActivitiesForBug = async (req, res) => {
  try {
    const activities = await Activity.find({ bug: req.params.bugId })
      .populate('user', 'name')
      .sort({ createdAt: -1 }); // most recent first

    res.json(activities);
  } catch (error) {
    console.error(error);c
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Add an activity
// @route POST /api/activities
// @access Private
exports.addActivity = async (req, res) => {
  const { bug, action, message } = req.body;

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

// @desc Delete an activity (optional)
// @route DELETE /api/activities/:id
// @access Admin (or modify as needed)
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    await activity.remove();
    res.json({ message: 'Activity removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
