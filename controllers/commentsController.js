const Comment = require('../models/comment');

// @desc Get comments for a specific bug
// @route GET /api/comments/bug/:bugId
// @access Private
exports.getCommentsForBug = async (req, res) => {
  try {
    const comments = await Comment.find({ bug: req.params.bugId })
      .populate('user', 'name')
      .sort({ createdAt: -1 }); // most recent first

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Add a comment
// @route POST /api/comments
// @access Private
exports.addComment = async (req, res) => {
  const { bug, message } = req.body;

  try {
    const comment = new Comment({
      bug,
      user: req.user._id,
      message,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Delete a comment
// @route DELETE /api/comments/:id
// @access Private (or Admin)
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Optional: Check if req.user._id matches comment.user to allow deletion by owner only

    await comment.remove();
    res.json({ message: 'Comment removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
