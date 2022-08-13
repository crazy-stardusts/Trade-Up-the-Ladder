const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
     name : {
        type : String, 
        required : [true, "Name not found"]
     },
     email : {
        type : String, 
        required : [true, "Email not found"],
        unique : true,
        lowercase : true,
        validate : [validator.isEmail, 'Incorrect Email']
     },
     password : {
        type : String,
        required : [true, "Password not found"],
        minlength : 8
     }
});

const User = mongoose.model('User', userSchema);

module.exports = User;