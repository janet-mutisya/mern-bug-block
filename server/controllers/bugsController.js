const Bug = require("../models/bug");
const Activity = require("../models/activity");

// Create bug
exports.createBug = async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req.body;

    const bug = await Bug.create({
      title,
      description,
      status,
      createdBy: req.user._id,
      assignedTo: assignedTo || null,
    });

    await Activity.create({
      bug: bug._id,
      user: req.user._id,
      action: "created a bug",
      message: `Created "${title}"`,
    });

    res.status(201).json(bug);
  } catch (err) {
    console.error("Bug creation failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all bugs
exports.getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find()
      .populate("createdBy", "name")
      .populate("assignedTo", "name")
      .sort({ createdAt: -1 });

    res.json(bugs);
  } catch (err) {
    console.error("Fetching bugs failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single bug
exports.getBugById = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id)
      .populate("createdBy", "name")
      .populate("assignedTo", "name");

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    res.json(bug);
  } catch (err) {
    console.error("Fetching bug failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update bug
exports.updateBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    const { title, description, status, assignedTo } = req.body;

    const oldTitle = bug.title;

    bug.title = title;
    bug.description = description;
    bug.status = status;
    bug.assignedTo = assignedTo || null;

    await bug.save();

    await Activity.create({
      bug: bug._id,
      user: req.user._id,
      action: "updated the bug",
      message: `Updated "${oldTitle}" to "${title}", status: ${status}`,
    });

    res.json(bug);
  } catch (err) {
    console.error("Updating bug failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete bug
exports.deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    await Activity.create({
      bug: bug._id,
      user: req.user._id,
      action: "deleted the bug",
      message: `Deleted bug "${bug.title}"`,
    });

    await bug.remove();
    res.json({ message: "Bug deleted" });
  } catch (err) {
    console.error("Deleting bug failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};
