const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

  // registering a user
exports.registerUser = async(req, res) => {
    try{
    const{name, email, password} =req.body;
   // validate required fields
   if(!name || !email|| !password) {
    return res.status(400).json({message: "Name email password are required"})
   }
    // check if user exist
    const existingUser = await User.findOne({email});
    if(existingUser) return
    res.status(400).send({message: "User already exist"});
    
    // create a new user
    const newUser = await User.create({
        name, 
        email,
        password
    });
    await newUser.save();
    res.status(201).json({message: "User created successfully"})
    }catch(error){console.error(error)}
};

//login
exports.login = async(req, res) => {
    try{
        const{email, password} = req.body;
        // validation
        if(!email, !password) {
            return res.status(401).json({message: "Email and password are required"});
           };

           // check if user does not exit
        const user = await findOne({email});
        if(!user){
            return res.status(400).json({message: "User not found"});
        };
        // validate password
        const isMatch = await User. bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({message:"Invalid credetials"});
        };
        const token = jwt.sign({userId: user._id}, 
            process.env.JWT_SECRET, 
            {expiresIn: "7d"});
            res.status(200).json({message: "login successful"})
        }catch(error){console.error(error)}
}