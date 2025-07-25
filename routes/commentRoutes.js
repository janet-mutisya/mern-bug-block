const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentsController');
const protect = require('../middleware/authMiddleware');

router.get('/bug/:bugId', protect, commentController.getCommentsForBug);
router.post('/', protect, commentController.addComment);
router.delete('/:id', protect, commentController.deleteComment);

module.exports = router;
