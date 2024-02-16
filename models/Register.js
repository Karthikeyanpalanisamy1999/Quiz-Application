const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    user:String,
    mobile:String,
    password:String,
    confirmpassword:String
})

const RegisterModel = mongoose.model("register",registerSchema)

module.exports = RegisterModel