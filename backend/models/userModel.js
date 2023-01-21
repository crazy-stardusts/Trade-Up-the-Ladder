const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name not found"],
    },
    email: {
        type: String,
        required: [true, "Email not found"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Incorrect Email"],
    },
    password: {
        type: String,
        required: [true, "Password not found"],
        minlength: 8,
        select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken : String,
    passwordResetTokenExpires : Date,
    currentGames: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Game",
    },
    isActive : {
      type : Boolean,
      default : true,
      select : false
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordChangedAt = Date.now() - (10 * 1000);
    next();
});

userSchema.pre(/^find/, function(next) {
   this.find({isActive : {$ne : false}});
   next();
})

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
    if (!this.passwordChangedAt) return false;
    const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
    );
    return JWTTimestamp <= changedTimestamp;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

   this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

   this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
   
   return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
