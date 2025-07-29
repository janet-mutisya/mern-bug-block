const express = require('express');
const router = express.Router();
const User = require('../models/user');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware'); 
const userController = require('../controllers/userController')

//routes
router.get('/', protect, admin, userController.getAllUsers);
router.get('/:id', protect, admin, userController.getUserById);
router.put('/:id', protect, admin, userController.updateUser);
router.delete('/:id', protect, admin, userController.deleteUser);

module.exports = router;
