const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const protect = require('../middleware/authMiddleware');

router.get('/bug/:bugId', protect, activityController.getActivitiesForBug);
router.post('/', protect, activityController.addActivity);
router.delete('/:id', protect, activityController.deleteActivity);

module.exports = router;
