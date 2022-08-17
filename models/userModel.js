const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcrypt")

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
        minlength : 8,
        select : false
     },
     passwordChangedAt : Date,
     currentGames : {
      type : [mongoose.Schema.Types.ObjectId],
      ref : 'Game'
     }
});

userSchema.pre('save', async function(next) {
   if(!this.isModified('password')) return next();

   this.password = await bcrypt.hash(this.password, 12);
   next();
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
   return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changePasswordAfter = function(JWTTimestamp){
   if(!this.passwordChangedAt) return false;
   const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
   return JWTTimestamp <= changedTimestamp;
}

const User = mongoose.model('User', userSchema);

module.exports = User;