const Bug = require("../models/bug");
const Activity = require("../models/activity");

// Get all bugs
exports.getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find()
      .populate("createdBy", "name")
      .populate("assignedTo", "name");

    res.json(bugs);
  } catch (err) {
    console.error("Error fetching all bugs:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single bug by ID
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
    console.error("Error fetching bug by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new bug
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
      action: "created",
      message: `Created bug "${title}"`,
    });

    const io = req.app.get("io");
    io.emit("bugCreated", bug);

    res.status(201).json(bug);
  } catch (err) {
    console.error("Error creating bug:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update existing bug
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
      action: "updated",
      message: `Updated "${oldTitle}" → "${title}", status: ${status}`,
    });

    const io = req.app.get("io");
    io.emit("bugUpdated", bug);

    res.json(bug);
  } catch (err) {
    console.error("Error updating bug:", err);
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

    await Bug.deleteOne({ _id: req.params.id });

    await Activity.create({
      bug: bug._id,
      user: req.user._id,
      action: "deleted",
      message: `Deleted "${bug.title}"`,
    });

    const io = req.app.get("io");
    io.emit("bugDeleted", { bugId: req.params.id });

    res.json({ message: "Bug deleted successfully" });
  } catch (err) {
    console.error("Error deleting bug:", err);
    res.status(500).json({ message: "Server error" });
  }
};
