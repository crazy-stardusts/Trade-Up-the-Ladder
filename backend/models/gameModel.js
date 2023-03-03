const { default: mongoose, Schema } = require("mongoose");

const gameSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Game name is required"],
        unique: [true, "This name is already taken"]
    },
    users : {
        type: [Schema.Types.ObjectId],
        ref : 'User'
    },
    startingMoney: {
        type: Number,
        required: [true, "Starting money is required"]
    },
    status: {
        type: String,
        enum : ['not started', 'started', 'ended']
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref : 'User'
    }
})

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;