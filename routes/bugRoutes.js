const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bugsController');
const protect = require('../middleware/authMiddleware');

// Routes
router.get('/', protect, bugController.getAllBugs);
router.get('/:id', protect, bugController.getBugById);
router.post('/', protect, bugController.createBug);
router.put('/:id', protect, bugController.updateBug);
router.delete('/:id', protect, bugController.deleteBug);

module.exports = router;

