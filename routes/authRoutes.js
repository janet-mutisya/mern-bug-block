 const express =  require('express');
 const router = express.Router();
 const { registerUser, login} = require('../controllers/authController')

 //register user
 router.post('/signup', registerUser);

 // login user
 router.post('/login', login);

 module.exports = router;