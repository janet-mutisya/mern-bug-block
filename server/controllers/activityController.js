// controllers/activityController.js
const Activity = require("../models/Activity");

// Create a new activity log
const createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);

    // Emit event to clients
    const io = req.app.get("io");
    io.emit("activityUpdated", activity);

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an activity
const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);

    if (!activity) return res.status(404).json({ message: "Not found" });

    // Emit event to clients
    const io = req.app.get("io");
    io.emit("activityUpdated", { deletedId: activity._id });

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createActivity,
  deleteActivity,
};
