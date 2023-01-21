const { default: mongoose } = require("mongoose");

const StockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name not found"],
        unique : [true, "Stock already exists"]
    },

    lastPrice: {
        type: Number,
        required: [true, "Last Price not found"]
    }
})

const Stock = mongoose.model("Stock", StockSchema);

module.exports = Stock;