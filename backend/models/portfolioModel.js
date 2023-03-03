const { default: mongoose } = require("mongoose");

const stockQuantitySchema = new mongoose.Schema({
    stockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock",
    },
    quantity: {
        type: Number,
        min: [0, "Quantity cannot be negative"]
    }
});

const PortfolioSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
    },
    cashInHand: {
        type: Number,
        required: [true, "Cash in hand is required"],
        min: [0, "Cash in hand cannot be negative"]
    },
    stocks: {
        type: stockQuantitySchema,
        default: {}
    }
});


const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

export default Portfolio;