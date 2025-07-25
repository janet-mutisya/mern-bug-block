 const express =  require('express');
 const router = express.Router();
 const { registerUser, login} = require('../controllers/authController')

 //register user
 router.post('/auth/signup', registerUser);

 // login user
 router.post('/auth/login', login);

 module.exports = router;