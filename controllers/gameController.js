const catchAsync = require("../Global Error/catchAsync");
const Game = require("../models/gameModel");
const User = require("../models/userModel");

exports.createGame = catchAsync(async (req, res, next) => {
    const game = await Game.create({
        name: req.body.name,
        users: [req.user._id],
    });

    const user = await User.findByIdAndUpdate(req.user._id, {
        $push: { currentGames: game._id },
    });

    res.status(201).json({
        status: "Success",
        data: game,
    });
});

getGame = async (gameId) => {
    console.log(gameId);
    return 0;
    // return await Game.findById(gameId);
};
exports.getAllGames = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    console.log(user);
    // const games = user.currentGames;
    // for(let i = 0; i < games.length; i++) {
    //     this.getGame(games[i]._id);
    // }
    res.status(200).json({
        status: "Success",
        // data : gameNames
    });
});

exports.getGame = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
});
