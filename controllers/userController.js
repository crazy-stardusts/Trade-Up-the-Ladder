const AppError = require("../Global Error/appError");
const catchAsync = require("../Global Error/catchAsync");
const User = require("../models/userModel");

const filterObj = (obj, ...fields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(fields.includes(el)) newObj[el] = obj[el];
    })
    return newObj;
}

exports.updateUser = catchAsync(async (req, res, next) => {
    if (req.body.password)
        return next(new AppError("Password cannot be changed", 400));

    const filteredBody = filterObj(req.body, 'name', 'email');
    const user = await User.findByIdAndUpdate(req.user._id, filteredBody, {
        new: true,
        runValidators: true,
    });

});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user._id, {isActive : false});

    res.status(204).json({
        status : "success"
    });
});