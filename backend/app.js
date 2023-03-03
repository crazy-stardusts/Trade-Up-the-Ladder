const express = require("express");
const api = require("./routes/api");
require("dotenv").config();
const mongoose = require("mongoose");
const { errorHandler } = require("./Global Error/errorHandler");
const rateLimit = require('express-rate-limit')
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean')
const hpp = require('hpp');
const morgan = require('morgan');


main();
async function main() {
    const uri = `mongodb+srv://tutlServer:${process.env.DATABASE_PASSWORD}@cluster0.qzscufs.mongodb.net/?retryWrites=true&w=majority`;
    console.log(uri);
    mongoose
        .connect(uri, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            console.log(err);
        });
    const app = express();
    // Security Features
    app.use(helmet());
    app.use(express.json({ limit: '10kb' }));
    app.use(morgan('dev'));
    const limiter = rateLimit({
        max : 100,
        windowMs : 1000 * 60 * 60,
        message : 'Too many requests from this IP, please try again in an hour!'
    });

    app.use('/api', limiter);

    app.use(mongoSanitize());
    app.use(xssClean());
    app.use(hpp());

    var PORT = process.env.PORT || 3123;

    app.use("/api", api);

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log("Server started on Port : " + PORT);
    });
}
