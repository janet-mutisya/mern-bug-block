const Bug = require('../models/bug');

// @desc Get all bugs
// @route GET /api/bugs
// @access Private
exports.getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().populate('createdBy', 'name').populate('assignedTo', 'name');
    res.json(bugs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get single bug by ID
// @route GET /api/bugs/:id
// @access Private
exports.getBugById = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id).populate('createdBy', 'name').populate('assignedTo', 'name');

    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    res.json(bug);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Create a new bug
// @route POST /api/bugs
// @access Private
exports.createBug = async (req, res) => {
  const { title, description, assignedTo } = req.body;

  try {
    const bug = new Bug({
      title,
      description,
      createdBy: req.user._id,
      assignedTo
    });

    await bug.save();
    res.status(201).json(bug);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Update bug
// @route PUT /api/bugs/:id
// @access Private
exports.updateBug = async (req, res) => {
  const { title, description, status, assignedTo } = req.body;

  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    bug.title = title || bug.title;
    bug.description = description || bug.description;
    bug.status = status || bug.status;
    bug.assignedTo = assignedTo || bug.assignedTo;

    await bug.save();

    res.json(bug);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Delete bug
// @route DELETE /api/bugs/:id
// @access Private
exports.deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      return res.status(404).json({ message: 'Bug not found' });
    }

    await bug.remove();
    res.json({ message: 'Bug removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
