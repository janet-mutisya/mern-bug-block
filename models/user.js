const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username:{type:String, require:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:String, default:'user'}
},{timeStamps:true});

// hashing password
userSchema.pre("save", async function( next) {
    if(!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
});
 //compare password
 userSchema.methods.matchPassword = function (enteredPassword){
   return bcrypt.compare(enteredPassword, this.password);
 };

module.exports =mongoose.model('User', userSchema);