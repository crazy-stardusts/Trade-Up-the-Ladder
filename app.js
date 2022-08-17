const express = require("express");
const { getLastPrice } = require("./nseApi/getLastPrice");
const api = require("./routes/api");
require("dotenv").config();
const mongoose = require("mongoose");
const { errorHandler } = require("./Global Error/errorHandler");

main();
async function main() {
    const uri = `mongodb+srv://Admin:${process.env.DATABASE_PASSWORD}@tutl.uba8zdh.mongodb.net/?retryWrites=true&w=majority&ssl=true`;
    mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            console.log(err);
        });
    const app = express();
    app.use(express.json());
    var PORT = process.env.PORT || 3123;

    app.use("/api", api);

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log("Server started on Port : " + PORT);
    });
}
