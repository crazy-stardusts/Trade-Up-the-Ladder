exports.errorHandler = (err, req, res, next) => {
    console.log(err.message);
    // console.log(err)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    res.status(err.statusCode).json({
        status : err.status,
        message : err.message
    });
};