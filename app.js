const express = require("express");
const { getLastPrice } = require("./nseApi/getLastPrice");
const { api } = require("./routes/api");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const { errorHandler } = require("./Global Error/errorHandler");

const uri = `mongodb+srv://Admin:${process.env.DATABASE_PASSWORD}@tutl.uba8zdh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
    const collection = client.db("Database").collection("devices");
    console.log(err);
    client.close();
});


const app = express();

var PORT = process.env.PORT || 3123;

app.use("/api", api);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server started on Port : " + PORT);
});
